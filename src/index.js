import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(<App/>, document.getElementById('root'));

const container = document.getElementById('root');
const root = ReactDOM.unstable_createRoot(container);
root.render(<App/>);