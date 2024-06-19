import { useState } from "react";

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

  const hiddeWhenVisible = { display: visible === false ? 'none' : '' };

  const style = {
    margin: "5px",
    padding: "5px",
    border: "1px solid gray"
  }

  return (
    <div style={style}>
      <p>{props.title} <button onClick={()=> setVisible(!visible)}>View</button></p>
      <div style={hiddeWhenVisible}>
        {props.children}
      </div>
      { props.user === props.author? <button onClick={props.handleDelete}>Delete</button> : null }
    </div>  
  )
};

export default Blog;