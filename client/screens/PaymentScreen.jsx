import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import Axios from 'axios';

const PaymentScreen = ({ receipient, type }) => {

  let email = "magnanimus.shehu@gmail.com";
  let receipientCode = receipient.reference;
  let amount = receipient.amount;
  const [ accessCode, setAccessCode ] = useState('');
  const [ reference, setReference ] = useState('');
  const [ transferCode, setTransferCode ] = useState('');
  const [ otp, setOtp ] = useState('');

  const initializeTransfer = () => {
    let data = {
      amount: amount,
      recipient: receipientCode
    }

    Axios.post('/initialize-transfer', data)
    .then(({ data }) => {
      console.log(data);
    })
  }

  const finalizeTransfer = () => {
    let data = { transferCode, otp };

    Axios.post('/finalize-transfer', data)
    .then(({ data }) => {
      console.log(data);
    })
  }

  const initializeTransaction = () => {
    let data = {
      amount: amount,
      recipient: receipientCode
    }

    Axios.post('/initialize-transfer', data)
    .then(({ data }) => {
      console.log(data);
    })
  }

  const finalizeTransaction = () => {
    let data = { transferCode, otp };

    Axios.post('/finalize-transfer', data)
    .then(({ data }) => {
      console.log(data);
    })
  }

  useEffect(() => {
    console.log('Hello There');
    initializeTransaction();
  }, []);

  return (
    <div className="container">
      { accessCode && <PaymentForm accessCode={accessCode}/> }
      <div className="btn">
        Return to Home page
      </div>
    </div>
  )
}

export default PaymentScreen;
