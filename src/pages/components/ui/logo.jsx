/** @format */

import { Link } from 'react-router-dom';
import React from 'react';

export default function Logo() {
	return (
		<Link
			to='/'
			className='flex flex-1 items-center no-underline hover:no-underline focus:no-underline active:no-underline logo-link'
			aria-label='Logo'>
			<svg width='50' height='50' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<g id='SVGRepo_bgCarrier' stroke-width='0'></g>
				<g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
				<g id='SVGRepo_iconCarrier'>
					{' '}
					<path d='M17.75 3C19.5449 3 21 4.45507 21 6.25V7H3V6.25C3 4.45507 4.45507 3 6.25 3H17.75Z' fill='#6EC207'></path>{' '}
					<path
						d='M21 8.5V12.0218C19.9897 11.375 18.7886 11 17.5 11C13.9101 11 11 13.9101 11 17.5C11 18.7886 11.375 19.9897 12.0218 21H6.25C4.45507 21 3 19.5449 3 17.75V8.5H21Z'
						fill='#6EC207'></path>{' '}
					<path
						d='M23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 14.4624 14.4624 12 17.5 12C20.5376 12 23 14.4624 23 17.5ZM19.8536 15.6464C19.6583 15.4512 19.3417 15.4512 19.1464 15.6464L16.5 18.2929L15.6036 17.3964C15.4083 17.2012 15.0917 17.2012 14.8964 17.3964C14.7012 17.5917 14.7012 17.9083 14.8964 18.1036L16.1464 19.3536C16.3417 19.5488 16.6583 19.5488 16.8536 19.3536L19.8536 16.3536C20.0488 16.1583 20.0488 15.8417 19.8536 15.6464Z'
						fill='#6EC207'></path>{' '}
				</g>
			</svg>
			<h1 className='ml-3 font-bold text-3xl textcolor1'>SizlandERP</h1>
		</Link>
	);
}
