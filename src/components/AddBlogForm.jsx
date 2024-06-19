import React from 'react';

export default function AddBlogForm({ onSubmit, title, handleTitle }) {

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={onSubmit}>
          <input type="text" name='title' value={title} onChange={handleTitle}/>
          <br />
          <button type="submit">Create</button>
      </form>
    </>
  );
};