import React from 'react';
import ReactLoading from 'react-loading';
const Loading = ({ type, color }) => {
    return (
        <div data-theme="dark" className='flex itmes-center justify-center min-h-screen pt-48 '>
            <ReactLoading type={type} color={color} height={300} width={200} />
        </div>
    );
};

export default Loading;