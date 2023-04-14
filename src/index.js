import React from 'react';
//import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import App from './App';
import AppRoutes from './routes';
import Root from './routes';



const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

//ReactDOM.render(<App />, document.getElementById('root'));