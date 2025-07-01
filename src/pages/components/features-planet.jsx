'use client';

import React from 'react';
import {
    AppstoreOutlined,
    SafetyOutlined,
    DollarOutlined,
    FundOutlined,
    ApiOutlined,
    DashboardOutlined,
} from '@ant-design/icons';

export default function FeaturesPlanet() {
    return (
        <section className="relative before:absolute before:inset-0 before:-z-20 bgcolor2 ">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
                        <h2 className="text-3xl font-bold textcolor1 md:text-4xl">
                            Intergrated Blockchain and
                            Feature-packed Platform! Explore & Get Started
                        </h2>
                    </div>
                    {/* Planet */}
                    <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
                        <div className="text-center">
                            <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-linear-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,var(--color-blue-500),transparent)]">
                                <img
                                    className="rounded-full bgcolor1 "
                                    src="/images/planet.svg"
                                    width={400}
                                    height={400}
                                    alt="Planet"
                                />
                                <div
                                    className="pointer-events-none"
                                    aria-hidden="true"
                                >
                                    <img
                                        className="absolute -right-64 -top-20 z-10 max-w-none"
                                        src="/images/planet-overlay.svg"
                                        width={789}
                                        height={755}
                                        alt="Planet decoration"
                                    />
                                    <div>
                                        <img
                                            className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500"
                                            src="/images/planet-tag-01.svg"
                                            width={253}
                                            height={56}
                                            alt="Tag 01"
                                        />
                                        <img
                                            className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500"
                                            src="/images/planet-tag-02.svg"
                                            width={241}
                                            height={56}
                                            alt="Tag 02"
                                        />
                                        <img
                                            className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500"
                                            src="/images/planet-tag-03.svg"
                                            width={243}
                                            height={56}
                                            alt="Tag 03"
                                        />
                                        <img
                                            className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500"
                                            src="/images/planet-tag-04.svg"
                                            width={251}
                                            height={56}
                                            alt="Tag 04"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Grid */}
                    <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <AppstoreOutlined className="text-blue-500 text-lg" />
                                <span>All-in-One Dashboard </span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            Simplify your operations with a single source of truth.
                            Our clean, intuitive dashboard centralizes project creation, employee tracking, client management, and financial overviews. From HR to task management, everything lives in one powerful hub — saving time and cutting chaos.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <SafetyOutlined className="text-blue-500 text-lg" />
                                <span> Task Automation With Tokens</span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            Assign. Automate. Reward — in real time.
                            Create tasks and attach token incentives. Once a task is completed and approved, the system automatically transfers tokens to the assignee’s wallet. No manual payouts, no delays — just seamless work-to-earn mechanics powered by blockchain.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <DollarOutlined className="text-blue-500 text-lg" />
                                <span>Check-In & Timesheets</span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            Check-In, Track time. Manage availability. Stay compliant.
                            Employees can request leave, log hours, and submit timesheets directly from their profile. Approvals and rejections are tracked in real time. Admins get full visibility, reducing paperwork and boosting team accountability.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <FundOutlined className="text-blue-500 text-lg" />
                                <span>Kanban Taskboard</span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            A visual taskboard that keeps your team flowing.
                            Organize tasks across custom statuses like To-do, In Progress, Waiting Review, and Completed. Drag-and-drop cards, add attachments, assign deadlines — everything you need to keep projects moving fast and transparently.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <ApiOutlined className="text-blue-500 text-lg" />
                                <span>Smart Task Reassignment</span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            Keep momentum — even when someone drops the ball.
                            If a task isn’t picked up within a set time, the system triggers auto-reassignment to the next available team member. This smart fallback reduces project delays and ensures task continuity without micromanagement.
                            </p>
                        </article>
                        <article>
                            <h3 className="mb-2 flex items-center space-x-2 font-bold text-lg textcolor1">
                                <DashboardOutlined className="text-blue-500 text-lg" />
                                <span>Blockchain-Backed Integrity</span>
                            </h3>
                            <p className="text-[15px] textcolor1">
                            Transparent. Trustless. Tamper-proof.
                            Every token transaction is stored on-chain, giving you a verifiable, immutable record of task payouts. Say goodbye to disputes and hello to transparency. Backed by smart contracts, your operations are secure and automated.
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
