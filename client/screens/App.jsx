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
  const [ serverRequest, setServerRequest ] = useState({});

 

  const updateBalance = async () => {
    Axios.get('/balance')
      .then(({ data }) => {
        setServerRequest({...serverRequest, balance: data.data[0].balance})
      })
  }

  const updateHistory = async () => {
    Axios.get('/history')
      .then(({ data }) => {
        setServerRequest({...serverRequest, history: data.data})
      })
  }

  const updatePayees = async () => {
    Axios.get('/payees')
      .then(({ data }) => {
        setServerRequest({...serverRequest, payees: data.data})
      })
  }

  const retrieveServerRequest = async () => {
    let request = {};
    Axios.get('/balance')
      .then(({ data }) => {
        request['balance'] = data.data[0].balance;
        return Axios.get('/history')
      })
      .then(({ data }) => {
        request['history'] = data.data;
        return Axios.get('/payees')
      })
      .then(({ data }) => {
        request['payees'] = data.data;
        return Axios.get('/bank-list')
      })
      .then(({ data }) => {
        request['bankList'] = data.data;
      })
      .then(() => {
        return setServerRequest(request);
      })
      .then(() => {
        setIsDataReceived(true);
      })
      .catch(e => alert('Please refresh the page. There was an error trying to retrieve info'));
  }

  useEffect(() => {
    retrieveServerRequest();
  }, []);
  
  return (
    <Router>
      <Route                  // Default route is either the loading screen or the details screen
        exact
        path="/"
        render={props => (
          <LoadingScreen     // Render loading screen while fetching data
            loading={!isDataReceived}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            logoSrc={logo}
            text='PayMate'>

              {isDataReceived && <DetailsScreen    // Show the details screen after fetching data
                {...props} 
                email={email}
                updateBalance={updateBalance}
                updateHistory={updateHistory}
                updatePayees={updatePayees}
                serverRequest={serverRequest} />}

          </LoadingScreen> )} />
          
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
