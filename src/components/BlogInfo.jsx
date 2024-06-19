import React from 'react';

export default function BlogInfo({ blog, handleAddLike}) {
    return (
        <>
            <p>{blog.url}</p>
            <p>{blog.likes} <button onClick={handleAddLike}>Like</button></p>
            <p>{blog.author}</p>
        </>
    );
};
