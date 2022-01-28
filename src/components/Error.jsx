import React from 'react';

const Error = ( { children } ) => {
  return (
    <div>
        <div className='text-center my-4 bg-red-600 text-white font-bold uppercase p-3'>
                                    {children}
                                </div>
    </div>);
};

export default Error;
