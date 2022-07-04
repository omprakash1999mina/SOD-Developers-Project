import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { store } from './store/store'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <SnackbarProvider maxSnack={3} preventDuplicate>
//         <App />
//       </SnackbarProvider>
//     </Provider>
//   </React.StrictMode>
// );


ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);