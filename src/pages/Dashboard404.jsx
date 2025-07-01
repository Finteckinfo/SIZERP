import { Link } from 'react-router-dom';

const Dashboard404Page = () => {
    return (
        <div className="settingpage flex h-[80vh] flex-col w-full overflow-hidden">
            <div className="w-full h-full flex mx-auto bg-white dark:bg-gray-300 items-center justify-center mt-20 overflow-hidden ">
                <div className="flex flex-col bg-white dark:bg-gray-300 mx-auto rounded-md">
                    <div className="flex flex-col items-center justify-center h-full w-[70%] mx-auto text-center">
                        <img src='/images/exca.png' className="h-[200px] mb-10" />
                        <h1 className="text-4xl font-bold text-black my-4">Sorry - Page Under Construction</h1>
                        <p className="text-lg text-gray-600 my-6">
                        This page is currently being worked on. It might have been moved or is not ready yet. Please check back later!
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard404Page;
