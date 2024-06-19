import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken)=> {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject)=> {
  if(newObject.title === ""){
    return { error: 'No title' };
  };

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const edit = async (blogData)=> {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, config);
  return response.data;
};

const remove = async (blogId)=> {
  console.log('BlogId blogs.js: ',blogId);

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, create, edit, remove, setToken };