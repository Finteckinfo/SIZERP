import { Collapse } from 'antd';
import { useState } from 'react';

const panels = [
    {
        key: '1',
        label: 'What is Sizland ERP about?',
        children: (
            <p>
                This is an all-in-one SaaS ERP system designed to simplify how businesses manage their operations. From assigning tasks, tracking progress, and handling HR requests to processing payroll and rewarding work through token incentives — everything happens on a centralized dashboard. It's built for modern teams who want clarity, automation, and results.
            </p>
        ),
    },
    {
        key: '2',
        label: 'How does the token-based task system work?',
        children: (
            <p>
                Tasks can be assigned token values (e.g., 1 token = $10). Once a task is completed and approved by a project manager or admin, tokens are automatically credited to the user’s internal wallet. This encourages responsibility and fast turnaround — think of it as work-to-earn. You can also set milestone bonuses, automate payouts, or transfer tokens to local currency depending on your company’s policy.
            </p>
        ),
    },
    {
        key: '3',
        label: 'Can tasks be reassigned if someone is inactive?',
        children: (
            <p>
                Yes. The platform has a built-in timer that tracks how long a task has remained unaccepted or inactive. If the set threshold is exceeded, the task becomes available again or is auto-assigned to the next best-fit team member. This ensures tasks never go cold and projects keep moving even when someone’s offline or unavailable.
            </p>
        ),
    },
    {
        key: '4',
        label: 'Does the platform support leave and timesheet management?',
        children: (
            <p>
                Absolutely. Team members can log their hours, track project-specific time blocks, and submit leave requests with custom reasons and durations. Managers and HR teams can approve or decline requests, view timesheet summaries, and generate reports for payroll or compliance purposes — all inside the platform.
            </p>
        ),
    },
    {
        key: '5',
        label: 'Can we use this for client and role management too?',
        children: (
            <p>
                Yes. You can onboard clients, create roles (e.g., Admin, HR, Developer, Designer, Accountant), and assign different access levels to each. This makes it easy to protect sensitive data, delegate responsibility, and scale your team without worrying about permissions chaos.
            </p>
        ),
    },
    {
        key: '6',
        label: 'Is it possible to integrate this with other tools?',
        children: (
            <p>
                Definitely. We're rolling out RESTful API support and native integrations with tools like Slack, Trello, Notion, Google Calendar, and GitHub. Whether it’s syncing tasks or pulling in external data, the goal is to make your workflow smoother and less fragmented.
            </p>
        ),
    },
    {
        key: '7',
        label: 'What industries is this best suited for?',
        children: (
            <p>
                This ERP system is perfect for remote teams, digital agencies, freelancers, DAOs, HR departments, and project-driven companies that need flexibility, transparency, and intelligent workflow management. It’s designed to adapt to your structure — not the other way around.
            </p>
        ),
    },
    {
        key: '8',
        label: 'Is there a free trial or demo?',
        children: (
            <p>
                Yes. We offer a no-obligation free trial so you can explore the full range of features — from assigning tasks with tokens, to creating a kanban taskboard, logging timesheets, and approving leave. It's the best way to see how the platform fits your business before committing.
            </p>
        ),
    },
];

const FAQ = () => {
    const [activeKey, setActiveKey] = useState(['1']);

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="w-3/4 mx-auto">
                    <Collapse
                        items={panels}
                        defaultActiveKey={['1']}
                        activeKey={activeKey}
                        onChange={(key) => setActiveKey(key)}
                        expandIconPosition="end"
                        className="faq-accordion"
                    />
                </div>
            </div>
        </section>
    );
};

export default FAQ;
