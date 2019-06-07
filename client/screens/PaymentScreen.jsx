import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import Axios from 'axios';

const PaymentScreen = () => {

  const [ reference, setReference ] = useState('');
  const [ transferCode, setTransferCode ] = useState('');
  const [ otp, setOtp ] = useState('');

  const initializeTransaction = () => {
    let data = {
      amount: amount,
      recipient: receipientCode
    }

    Axios.post('/initialize-transfer', data)
    .then(({ data }) => {
    })
  }

  const finalizeTransaction = () => {
    let data = { transferCode, otp };

    Axios.post('/finalize-transfer', data)
    .then(({ data }) => {
    })
  }

  return (
    <div className="container">
      <PaymentForm />
      <div className="btn">
        This Page is not functional for now
      </div>
    </div>
  )
}

export default PaymentScreen;
