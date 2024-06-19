import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Toggable from './components/Toggable';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import BlogInfo from './components/BlogInfo';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({ username, password, });
      window.localStorage.setItem('userLogged', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception){
      setErrorMessage('Wrong credentials');
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000);
    }
  };

  const addBlog = async (event)=> {
    event.preventDefault();

    const blogToAdd = {
      title: title,
      author: user.username,
      url: 'none',
      likes: 0,
      user: user.username
    };

    const response = await blogService.create(blogToAdd);
    if(response.error){
      setErrorMessage(response.error);
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000);
      return
    };

    blogToAdd.id = response.id;
    const blogAdded = blogs.concat(blogToAdd);
    setBlogs(blogAdded);
    setTitle('');
    setNotification(`${title} successfully added.`)
    setTimeout(()=> {
      setNotification(null)
    }, 5000);
    return response;
  };

  const editBlog = async (blog, mode)=> {
    try{
      const blogData = {
        id: blog.id,
        title: blog.title,
        likes: Number(blog.likes) + 1,
        author: blog.author,
        url: blog.url,
        user: blog.user.id,
        mode: mode
      };
  
      const response = await blogService.edit(blogData);
      
      const blogsUpdated = blogs.map(obj => {
        if(obj.id === blog.id){
          return { ...obj, likes: blogData.likes };
        }
        return obj;
      });
      setBlogs(blogsUpdated);

    } catch (exception){
      console.log('Exception: ', exception);
    }
  };

  const deleteBlog = async (blogId)=> {
    try {
      const response = await blogService.remove(blogId);
      const blogsUpdated = blogs.filter(obj => {
        if(obj.id !== blogId){
          return obj
        }
      });
      setBlogs(blogsUpdated);

    } catch (excep){
      console.log(excep);
    }
  };

  const handleSignOut = ()=> {
    setUser(null);
    window.localStorage.removeItem('userLogged');
  };

  const loginForm = ()=> (
    <LoginForm onSubmit={handleLogin} username={username} password={password} handleUsername={({ target })=> setUsername(target.value)} 
                handlePassword={({ target })=> setPassword(target.value)} errorMessage={errorMessage}/>
  );

  const blogForm = ()=> (
    <>
      <Toggable buttonLabel="New blog" username={user.username} notification={notification} handleSignOut={handleSignOut}>
        <AddBlogForm onSubmit={addBlog} title={title} handleTitle={({ target })=> setTitle(target.value)} />
      </Toggable>
    </>
  );

  const blogList = ()=> (
    <>
      {
        blogs.map(blog =>
          <Blog key={blog.id} title={blog.title} author={blog.author} user={user.username} handleDelete={()=> deleteBlog(blog.id)}>
            <BlogInfo blog={blog} handleAddLike={()=> editBlog(blog, 'like')}/>
          </Blog>
        )
      }
    </>
  );

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, []);

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('userLogged');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);

    }
  }, []);

  return (
    <div>
      { user === null?
        loginForm() :
        blogForm()
      }
      { user === null?
        true :
        blogList()
      }
    </div>
  )
}

export default App;