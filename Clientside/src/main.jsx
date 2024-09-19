
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Redux_store from "./Store/ReduxStore.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <Provider store={Redux_store}>
    <App />
    <ToastContainer />
  </Provider>
);
