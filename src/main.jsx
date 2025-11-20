import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './store'
import './style.css'
import { ThemeProvider } from './contexts/ThemeContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);