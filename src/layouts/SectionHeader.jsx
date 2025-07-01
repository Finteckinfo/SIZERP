import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const SectionHeader = ({ title, subtext, style, actionButton }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const showUpgradeButton = ['/dashboard', '/'].includes(currentPath);

  return (
    <div
      className={`flex flex-row w-full items-center justify-between border-b border-gray-300 pt-5 text-left text-gray-900 dark:bg-gray-900 dark:text-white ${style}`}
    >
      <div className='ml-1'>
        <h4 className='text-2xl font-bold mb-2'>{title}</h4>
        <p className='my-2'>{subtext}</p>
        <Breadcrumbs />
      </div>

      <div className='flex items-center mt-2'>
        {showUpgradeButton && (
          <div className='flex flex-row items-center gap-2'>
            <span className='text-sm text-gray-500'>Working?</span>
            {actionButton && <div>{actionButton}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
