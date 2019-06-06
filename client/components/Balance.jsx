import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import History from './History';
import '../assets/styles/balance.css';

const Balance = ({ balance }) => {
  // const [ balance, setBalance ] = useState(0);
  
  // const retrieveBalance = () => {
  //   let authOptions = {
  //     method: 'GET',
  //     url: 'https://api.paystack.co/balance',
  //     headers: {
  //         'Authorization': 'Bearer sk_test_0d03d4204fd232838c4b27538c204c5553cf8e79',
  //         'Content-Type': 'application/json'
  //     },
  //     json: true
  //   };

  //   Axios(authOptions)
  //   .then(({ data }) => {
  //     setBalance(data.data[0].balance);
  //   })
  // }
  // useEffect(() => {
  //   retrieveBalance();
  // })

  return (
    <div>
      <div className="number">
        <span className="text" style={{"fontSize": "20px", marginRight: "4px"}}>₦</span>{balance.toLocaleString()}
      </div>
      <div className="text space">
        Your Paystack Account
      </div>
    </div>
  )
}

export default Balance;
