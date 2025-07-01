'use client';

import React from 'react';
import { useState } from 'react';

export default function Banner() {
    const [bannerOpen, setBannerOpen] = useState(true);
    const toggleBanner = () => {
        setBannerOpen((prev) => !prev);
    };
    return (
        <>
            {bannerOpen && (
                <div className="fixed bottom-0 right-0 z-50 w-full md:bottom-8 md:right-12 md:w-auto">
                    <div className="flex justify-between bgcolor2 p-3 text-sm textcolor1 shadow-lg md:rounded-sm">
                        <div className="inline-flex textcolor1">
                            <p className="font-medium textcolor1">
                                Need help?
                            </p>{' '}
                            <a
                                className="font-medium textcolor1 hover:underline ml-1"
                                href=""
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contact Us
                            </a>
                        </div>
                        <button
                            className="ml-3 border-l border-gray-700 pl-2 textcolor10 hover:text-slate-400"
                            onClick={toggleBanner}
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-4 w-4 shrink-0 fill-current"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
