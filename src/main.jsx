/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import App from './App';
import './index.css';
import { StrictMode } from 'react';
import { message } from 'antd';

message.config({
  top: 80,
  duration: 3,
  maxCount: 5,
  rtl: false,      
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
