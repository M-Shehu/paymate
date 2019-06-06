import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import DetailsScreen from './DetailsScreen';
import PaymentScreen from './PaymentScreen';
import NewPayment from '../components/NewPayment';
import LoadingScreen from 'react-loading-screen';
import Axios from 'axios';
import '../assets/styles/global.css';

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}


const App = () => {
  
  const [ email, setEmail ] = useState('magnanimus.shehu@gmail.com'); // In the future, a log in component will gret the email for us
  const [ receipient, setReceipient ] = useState({}); // This holds the information object for the receipient 
  const [ isReceipientPresent, setIsReceipientPresent ] = useState(false);
  const [ isDataReceived, setIsDataReceived ] = useState(false);
  const [ selected, setSelected ] = useState(null);
  const [ isOpen, setIsOpen ] = useState(true);
  const [ serverRequest, setServerRequest ] = useMergeState({});

  const chooseSelected = (e) => {
    console.log(e.target.parentNode);
    setSelected(`${e.target.parentNode.id}`)
  }

  

  const changeIsOpen = (e) => {
    if (e.target.name !== 'amount') {
      setIsOpen(!isOpen);
    }
  }

  const retrieveBalance = () => {
    Axios.get('/balance')
    .then(({ data }) => {
      console.log(data);
      setBalance(data.data[0].balance);
    })
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

  // const retrieveHistory = () => {
  //   Axios.get('/history')
  //   .then(({ data }) => {
  //     console.log(data);
  //     setHistory(data.data);
  //   })
  // }

  // const retrievePayees = () => {
  //   Axios.get('/payees')
  //   .then(({ data }) => {
  //     console.log(data);
  //     setPayees(data.data);
  //   })
  // }

  // const retrieveBanks = () => {
  //   Axios.get('/bank-list')
  //   .then(({ data }) => {
  //     console.log(data);
  //     setBankList(data.data);
  //   })
  // }

  

  const setReceipientObj = (obj) => {
    console.log(obj);
    setReceipient(obj);
    setIsReceipientPresent(true);
  }

  useEffect(() => {
    retrieveServerRequest();
  }, []);
  
  return (
    <Router>
      <Route
        exact
        path="/"
        render={props =>
          !isReceipientPresent ? (
            isDataReceived ? (
              <DetailsScreen 
                {...props} 
                setReceipientObj={setReceipientObj}
                selected={selected} 
                chooseSelected={chooseSelected} 
                isOpen={isOpen} 
                serverRequest={serverRequest}
                changeIsOpen={changeIsOpen} />
              ) : (
                <LoadingScreen
                  loading={true}
                  bgColor='#f1f1f1'
                  spinnerColor='#9ee5f8'
                  textColor='#676767'
                  logoSrc='https://robinhood-fec-shehu.s3-us-west-1.amazonaws.com/logo.jpg'
                  text='PayMate' /> 
              )
          ) : (
            <Redirect push to="/pay" />
          )
        } 
      />
      <Route 
        path="/pay" 
        render={(props) => (
          <PaymentScreen 
            {...props} 
            email={email} 
            receipient={receipient}
            amount={amount} />)} />
    </Router>
  )
}

export default App;
