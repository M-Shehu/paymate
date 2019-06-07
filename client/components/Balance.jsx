import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Popup from './Popup';
import AmountEntry from './AmountEntry';

import '../assets/styles/balance.css';

const Balance = ({ balance, banks, email }) => {

  const [ payeeName, setPayeeName ] = useState('');
  const [ payeeOccupation, setPayeeOccupation ] = useState('');
  const [ isRecordFetched, setIsRecordFetched ] = useState(false);
  const [ payeeAccountNumber, setPayeeAccountNumber ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ payeeBank, setPayeeBank ] = useState('');
  const [ showAmountPopup, setShowAmountPopup ] = useState(false);

  const togglePopup = () => {  
    setShowAmountPopup(!showAmountPopup);  
  }  

  // Function to add payee to the list of suppliers
  const addPayee = (e) => {
    e.preventDefault();
    let payeeData = {
      name: payeeName,
      description: payeeOccupation,
      accountNumber: payeeAccountNumber,
      bankCode: payeeBank.code
    };
    setPayeeAccountNumber('');
    Axios.post('/register-payee', payeeData)
    .then(({ data }) => {
    })
    .then(() => {
      setIsRecordFetched(false);
    })
  }

  // Function to get Payee's Information
  const getPayeeInfo = (e) => {
    e.preventDefault();
    Axios.get('/verify', {
      params: {
        account: payeeAccountNumber,
        code: payeeBank.code
      }
    })
    .then(({ data }) => {
      setPayeeName(data.data.account_name);
    })
    .then(() => {
      setIsRecordFetched(true);
    })
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
  }

  // Function to map list of banks to drop down menu
  const mapBankList = () => {
    return banks.map(bank => {
      return <option value={bank.code}>{bank.name}</option>
    })
  }

  // Event handler for Amount to top up
  const handleAmountChange = change => {
    setAmount(change.target.value);
  }

  // Event handler for drop down menu
  const handleDropDownChange = selectedOption => {
    var sel = document.getElementById("bank-dropdown");
    var text= sel.options[sel.selectedIndex].text;
    setPayeeBank({code: selectedOption.target.value, label: text});
  };

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
        {
          !isRecordFetched ? (
            <React.Fragment>
              <div id="search" className="items form">
                <input 
                  id="search-bar" 
                  onChange={e => setPayeeAccountNumber(e.target.value)} 
                  type="number" 
                  value={payeeAccountNumber} 
                  placeholder="Supplier Account Number..." />       
              </div>

              <div id="search" className="items form">
                <select id="bank-dropdown" onChange={handleDropDownChange}>
                  <option value="" disabled selected>Choose Supplier Bank...</option>
                  {mapBankList()}
                </select>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="search-text">
                Name: {payeeName}
              </div>
              <div className="search-text">
                Account No: {payeeAccountNumber}
              </div>
              <div className="search-text">
                Bank: {payeeBank.label}
              </div>
              <div id="search" className="items form">
                <input 
                  id="search-bar" 
                  onChange={e => setPayeeOccupation(e.target.value)} 
                  type="text" 
                  placeholder="Payee Occupation" 
                  value={payeeOccupation} />       
              </div>
            </React.Fragment>
          )
        }
      </div>
      {
        !isRecordFetched ? (
          <button id="search-button" onClick={getPayeeInfo}> Search Supplier Acc No </button>
        ) : (
          <button id="search-button" onClick={addPayee}> Add Supplier to List </button>
        )
      }
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
