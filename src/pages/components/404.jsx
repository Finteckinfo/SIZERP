'use client';

import React from 'react';
import { Link } from 'react-router-dom';

export default function D404() {
    return (
        <div className="flex min-h-full flex-col w-full">
        <div className="w-full mx-auto bg-white py-4 items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0">
            <div className="flex flex-col w-full p-[2%] bg-white mx-auto min-h-[50vh] mt-26">
                <div className="flex flex-col items-center justify-center h-full">
                    <img src='./images/404.png' className='mb-15' style={{ height: "250px" }} />
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-3xl text-gray-800 my-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-md text-gray-600 mb-8">
                        Sorry! We couldn't find what you are looking for
                    </p>
                    <Link
                        to="/"
                        className="rounded-full px-6 py-3 text-white focus:outline-none bgcolor2"
                    >
                        Go Back To Homepage
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}
