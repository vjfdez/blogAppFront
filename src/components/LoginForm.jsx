import React from 'react';

const errorStyle = {
  width: '10%',
  border: '1px solid red',
  color: 'red',
  fontSize: 20 
};

export default function LoginForm({ onSubmit, username, password, handleUsername, handlePassword, errorMessage }) {
  return (
    <>  
      { errorMessage !== "" && <p style={errorStyle}>{ errorMessage }</p>}
      <form onSubmit={onSubmit}>
          <h2>Log in to application.</h2>
          <input type="text"  name='username' value={username} onChange={handleUsername}/>
          <br />
          <input type="password" name="password" value={password} onChange={handlePassword}/>
          <br />
          <button type="submit">Login</button>
      </form>  
    </>
  );
};
