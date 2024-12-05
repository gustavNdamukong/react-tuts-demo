import React from 'react';
import ReactDOM from 'react-dom/client';
//import HelloWorld from './HelloWorld';
import AppClass from './AppClass';
//import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8 offset-4">
          <AppClass msg="State using classes!" />
          {/* <App msg="State using functional component!" /> */}
        </div>
      </div>
    </div>
  </React.StrictMode>
);
