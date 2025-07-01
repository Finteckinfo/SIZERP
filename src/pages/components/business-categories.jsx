import React from 'react';

export default function BusinessCategories() {
    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex w-full items-center justify-center mb-10">
                    <h1 className="text-3xl font-bold my-4 textcolor1 text-center">
                       
                        Make your <span className='textcolor2'>Workspace & Teams </span> workflow <br></br> seemless and 100% efficient!
                    </h1>
                </div>
                <div className="pb-12 md:pb-20">
                    {/* Tab panels */}
                    <div className="relative flex h-[324px] items-center justify-center">
                        {/* Small blue dots */}
                     
                        {/* Blue glow */}
                        <div className="absolute -z-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={432}
                                height={160}
                                viewBox="0 0 432 160"
                                fill="none"
                            >
                                <g
                                    opacity="0.6"
                                    filter="url(#filter0_f_2044_9)"
                                >
                                    <path
                                        className="fill-green-200"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_f_2044_9"
                                        x={0}
                                        y={0}
                                        width={432}
                                        height={160}
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood
                                            floodOpacity={0}
                                            result="BackgroundimgFix"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundimgFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation={32}
                                            result="effect1_foregroundBlur_2044_9"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        {/* Horizontal lines */}
                        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-x-[200px] top-1/2 -z-10 h-px bg-linear-to-r from-transparent to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-[82px] bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_both] before:bg-linear-to-r before:"></div>
                        <div className="absolute inset-x-0 top-1/2 -z-10 h-px translate-y-[82px] bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_5s_both] before:bg-linear-to-r before:"></div>
                        {/* Diagonal lines */}
                        <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px rotate-[20deg] bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px -rotate-[20deg] bg-linear-to-r from-transparent via-green-200 to-transparent mix-blend-multiply"></div>
                        {/* Vertical lines */}
                        <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-[216px] bg-linear-to-b from-gray-200 to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-y-0 left-1/2 -z-10 w-px translate-x-[216px] bg-linear-to-t from-gray-200 to-transparent mix-blend-multiply"></div>
                        {/* Logos */}
                        <div className="absolute before:absolute before:-inset-3 before:animate-[spin_3s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] before:[background:conic-gradient(from_180deg,transparent,var(--color-blue-500))_border-box]">
                            <div className="animate-[breath_8s_ease-in-out_infinite_both]">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                    <img
                                        className="relative textcolor2"
                                        src="/images/teams.png"
                                        width={42}
                                        height={42}
                                        alt="Logo 01"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col">
                            <article className="flex h-full w-full items-center justify-center focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-300">
                                <div className="absolute -translate-x-[136px]">
                                    <div className="animate-[breath_7s_ease-in-out_3s_infinite_both]">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 02"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute translate-x-[136px]">
                                    <div className="animate-[breath_7s_ease-in-out_3.5s_infinite_both]">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 03"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -translate-x-[216px] -translate-y-[82px]">
                                    <div className="animate-[breath_6s_ease-in-out_3.5s_infinite_both]">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 04"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -translate-y-[82px] translate-x-[216px]">
                                    <div className="animate-[breath_6s_ease-in-out_1.5s_infinite_both]">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 05"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute translate-x-[216px] translate-y-[82px]">
                                    <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 06"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -translate-x-[216px] translate-y-[82px]">
                                    <div className="animate-[breath_6s_ease-in-out_2.5s_infinite_both]">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 ">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 07"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -translate-x-[292px] opacity-40">
                                    <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 shadow-lg">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 08"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute translate-x-[292px] opacity-40">
                                    <div className="animate-[breath_6s_ease-in-out_4s_infinite_both]">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 shadow-lg">
                                            <img
                                                className="relative rounded-full"
                                                src="/images/user.png"
                                                width={35}
                                                height={35}
                                                alt="Logo 09"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
}
