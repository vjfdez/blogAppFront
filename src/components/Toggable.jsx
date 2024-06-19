import { useState } from 'react';

const alertStyle = {
    width: '10%',
    color: 'green',
    fontSize: 20,
    border: '1px solid green'
};

export default function Toggable(props) {
    const [blogFormVisible, setBlogFormVisible] = useState(false);

    const showWhenVisible = { display: blogFormVisible? '' : 'none' };
    const hiddeWhenVisible = { display: blogFormVisible? 'none' : '' };

    const toggleVisibility = ()=> {
        setBlogFormVisible(!blogFormVisible);
    };

    return (
        <>  
            <p>{props.username} logged in <button onClick={props.handleSignOut}>Sign out</button></p>
            { props.notification !== "" && <p style={alertStyle}>{ props.notification }</p>}

            <div style={hiddeWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>

        </>
    );
};
