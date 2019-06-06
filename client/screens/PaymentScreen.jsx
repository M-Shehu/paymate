import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import Axios from 'axios';

const PaymentScreen = ({ receipient }) => {

  console.log(receipient);
  let email = "magnanimus.shehu@gmail.com";
  let amount = 10;
  const [ accessCode, setAccessCode ] = useState('');
  const [ reference, setReference ] = useState('');


  const initializeTransaction = () => {
    console.log(email, amount);
    let authOptions = {
      method: 'POST',
      url: 'https://api.paystack.co/transaction/initialize',
      data: JSON.stringify({email, amount}),
      headers: {
          'Authorization': 'Bearer sk_test_0d03d4204fd232838c4b27538c204c5553cf8e79',
          'Content-Type': 'application/json'
      },
      json: true
    };

    Axios(authOptions)
    .then(({ data }) => {
      setAccessCode(data.data.access_code);
      setReference(data.data.reference);
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
