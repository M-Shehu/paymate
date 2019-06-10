import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Popup from './Popup';
import AmountEntry from './AmountEntry';

import '../assets/styles/balance.css';

const Balance = ({ balance, email }) => {

  const [ amount, setAmount ] = useState('');
  const [ showAmountPopup, setShowAmountPopup ] = useState(false);

  const togglePopup = () => {  
    setShowAmountPopup(!showAmountPopup);  
  }  

  // Function to top up Paystack balance
  const topUpBalance = (e) => {
    e.preventDefault();
    let topUpData = {
      amount: amount,
      email: email
    }
    Axios.post('/initialize-transaction', topUpData)
    .then(({ data }) => {
      window.location.replace(data.data.authorization_url);
    })
    .catch(e => alert(`Please try again. There was an error trying to top up your account\nServer Response: ${e.response.data}`))
  }

  // Event handler for Amount to top up
  const handleAmountChange = change => {
    setAmount(change.target.value);
  }

  return (
    <React.Fragment>
      <div id="stats-container" className="effect1">
        <div id="users" className="items">
          <h4 className="stat-number"> ₦{(balance/100).toLocaleString()} </h4>
          <h4 className="stat-name"> Account Balance </h4>
        </div>
        <div id="repos" className="items" onClick={togglePopup}>
          <i className="fa fa-plus-circle stat-number icon"></i>
          <h4 className="stat-name"> TopUp Balance </h4>
        </div>
      </div>
      {
        showAmountPopup ? (
          <Popup // Popup to handle amount to add to account
            props={{ handleAmountChange, amount, topUpBalance }}
            closePopup={togglePopup}
            Component={AmountEntry} />
        ) : (
          null
        )  
      }  
    </React.Fragment>
  )
}

export default Balance;
