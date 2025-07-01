import PageIllustration from './page-illustration';
import React from 'react';

export default function HeroHome() {
    return (
        <>
            <section className="pt-8 lg:pt-32 bggradient bg-center bg-cover">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
                    <div className="border p-1 w-60 mx-auto rounded-full flex items-center justify-between mb-4 bg-border">
                        <span className="font-inter text-xs font-medium textcolor2 ml-3">
                            Explore how to use SizlandERP.
                        </span>
                        <a
                            href="#howitworks"
                            className="w-8 h-8 rounded-full flex justify-center items-center bgcolor2"
                        >
                            <svg
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                                    stroke="white"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>
                    <h1 className="max-w-3xl mx-auto text-center font-manrope font-bold text-4xl textcolor1 mb-5 md:text-5xl leading-[50px]">
                        Revolutionize How You Manage Projects, Teams & Tasks
                        with
                        <span className="textcolor2 ml-1">Sizland ERP </span>
                    </h1>
                    <p className="max-w-md mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
                        Powered by Blockchain, Sizland-ERP is an All-in-one ERP built for modern
                        businesses. Assign tasks, pay with tokens, track time,
                        manage employees — all from a sleek dashboard.
                    </p>
                    <a
                        href="javascript:;"
                        className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bgcolor2 shadow-xs hover:bgcolor2 transition-all duration-500"
                    >
                       Start 14-day Free Trial
                        <svg
                            className="ml-2"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                    <div className="flex justify-center">
                        <img
                            src="https://io/asset/uploads/1691054543.png"
                            alt="Dashboard image"
                        />
                    </div>
                </div>
            </section>

            <section className="relative">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Hero content */}
                    <div className="pb-12 pt-32 md:pb-20 md:pt-50">
                        {/* Section header */}
                        <div className="pb-12 text-center md:pb-20">

                            <div className="mx-auto max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 textcolor1">
                                            How <span className='textcolor2'>Sizland ERP</span> Works
                                        </h2>
                                <p
                                    className="mb-8 text-lg text-gray-700"
                                    data-aos="zoom-y-out"
                                    data-aos-delay={300}
                                >
                                    Getting started is simple — just log
                                            in or create your workspace, then
                                            invite your team and assign roles
                                            with customizable permissions. From
                                            there, you can create tasks, attach
                                            token-based rewards, and manage
                                            everything from leave requests to
                                            project timelines — all from a
                                            single intuitive dashboard. Watch
                                            the video below to learn more!
                                </p>

                            </div>
                        </div>
                        {/* Hero img */}
                        <div
                            className="mx-auto max-w-3xl"
                            id="howitworks"
                            data-aos="zoom-y-out"
                            data-aos-delay={600}
                        >
                            <div className="relative aspect-video rounded-2xl bgcolor2 p-2 shadow-xl before:pointer-events-none before:absolute before:-inset-5   after:absolute after:-inset-5 after:-z-10 ">
                                <div className="flex rounded-md  max-w-5xl h-full">
                                    <div className="flex flex-col mx-auto text-center w-full h-full p-3">
                                        <h2 className="text-xl md:text-2xl font-bold pb-3">
                                            Watch Demo
                                        </h2>


                                        <div
                                            className="flex relative w-full h-full"
                                            style={{
                                                padding:
                                                    '30px 0px' /* 16:9 Aspect Ratio */,
                                            }}
                                        >
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                                title="How It Works"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
