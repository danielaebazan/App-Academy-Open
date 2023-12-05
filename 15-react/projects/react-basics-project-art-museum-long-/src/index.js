import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, createBrowserRouter,
  RouterProvider} from 'react-router-dom'
import ErrorPage from "./error-page";

const Root = () =>
  { return(
    <BrowserRouter>
    <App />
  </BrowserRouter>
  )
  }



// Create a root.
const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
     <Root />   
  </React.StrictMode>
);