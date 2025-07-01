import { Link } from 'react-router-dom';
import React from 'react';
import Logo from './logo';

export default function Header() {
    return (
        <div className="fixed top-2 z-30 w-full md:top-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                <div>
                <Logo />
                </div>
                    
                    {/* Desktop sign in links */}
                    <ul className="flex flex-1 items-center justify-end gap-3">
                        <li>
                            <Link
                                to="/login"
                                className="btn-sm  textcolor1  hover:bg-gray-50 custom-btn-md"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sign-up"
                                className="btn-sm text-white shadow-sm  custom-btn-md-rounded bgcolor1 font-bold"
                            >
                                Start 14-day Free Trial
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
