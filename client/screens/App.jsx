import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';

import DetailsScreen from './DetailsScreen';
import PaymentScreen from './PaymentScreen';

import '../assets/styles/global.css';
import logo from '../assets/images/logo.jpg';

const App = () => {
  
  const email = 'magnanimus.shehu@gmail.com'; // In the future, a log in component will get the email for us

  const [ isDataReceived, setIsDataReceived ] = useState(false);
  const [ selected, setSelected ] = useState(null);
  const [ isOpen, setIsOpen ] = useState(true);
  const [ serverRequest, setServerRequest ] = useState({});

  const chooseSelected = (e) => {
    console.log(e.target.parentNode);
    setSelected(`${e.target.parentNode.id}`)
  }

  const changeIsOpen = (e) => {
    if (e.target.name !== 'amount') {
      setIsOpen(!isOpen);
    }
  }

  const retrieveServerRequest = async () => {
    let request = {};
    Axios.get('/balance')
      .then(({ data }) => {
        console.log(data);
        request['balance'] = data.data[0].balance;
        return Axios.get('/history')
      })
      .then(({ data }) => {
        console.log(data);
        request['history'] = data.data;
        return Axios.get('/payees')
      })
      .then(({ data }) => {
        console.log(data);
        request['payees'] = data.data;
        return Axios.get('/bank-list')
      })
      .then(({ data }) => {
        console.log(data);
        request['bankList'] = data.data;
      })
      .then(() => {
        return setServerRequest(request);
      })
      .then(() => {
        setIsDataReceived(true);
      })
  }

  useEffect(() => {
    retrieveServerRequest();
  }, []);
  
  return (
    <Router>
      <Route                  // Default route is either the loading screen or the details screen
        exact
        path="/"
        render={props =>
          isDataReceived ? (
            <DetailsScreen    // Show the details screen after fetching data
              {...props} 
              selected={selected} 
              chooseSelected={chooseSelected} 
              isOpen={isOpen} 
              email={email}
              serverRequest={serverRequest}
              changeIsOpen={changeIsOpen} />
          ) : (
            <LoadingScreen     // Render loading screen while fetching data
              loading={true}
              bgColor='#f1f1f1'
              spinnerColor='#9ee5f8'
              textColor='#676767'
              logoSrc={logo}
              text='PayMate' /> 
          )
        } 
      />
      <Route                  // This route was setup for a custom payment form. Is not currently in use
        path="/pay" 
        render={(props) => (
          <PaymentScreen 
            {...props} 
            email={email} />)} />
    </Router>
  )
}

export default App;
