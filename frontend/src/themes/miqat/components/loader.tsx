import React from 'react';
import Pattern from './pattern';

export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-96">
      <span className=' animate-spin duration-4000 opacity-50'>
        <Pattern width={100} color="#c6a789" />
      </span>
    </div>
  );
};

export default Loader;