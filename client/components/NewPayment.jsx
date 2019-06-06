import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';
import Select from 'react-select';
import '../assets/styles/NewPayment.css';

const NewPayments = ({ setReceipientObj, banks }) => {

  const [ payeeName, setPayeeName ] = useState('');
  const [ payeeOccupation, setPayeeOccupation ] = useState('');
  const [ gettingPayeeRef, setGettingPayeeRef ] = useState(false);
  const [ payeeAccountNumber, setPayeeAccountNumber ] = useState('');
  const [ payeeBank, setPayeeBank ] = useState('');

  const addPayee = (e) => {
    e.preventDefault();
    // let receipient = {
    //   amount: amount,
    //   reference: nameInfo.reference
    // }
    setGettingPayeeRef(true);
    // setReceipientObj(receipient);
    // setAmount('');
  }

  const mapBankList = () => {
    return banks.map(bank => {
      return {value: bank.code, label: bank.name}
    })
  }

  const handleChange = selectedOption => {
    setPayeeBank(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <React.Fragment>

      {
        !gettingPayeeRef ? (
          <div className="new-payment center column"  onClick={e => {chooseSelected(e); changeIsOpen(e);}} >
            <h3 style={{color: "white"}}>New Payment</h3>
            <div className="col-80 column" style={{width: "80%"}}>
              <input onChange={e => setPayeeName(e.target.value)} type="text" placeholder="Payee Name" value={payeeName}></input>
              <input onChange={e => setPayeeOccupation(e.target.value)} type="text" placeholder="Payee Occupation" value={payeeOccupation}></input>
              <input onChange={e => setPayeeAccountNumber(e.target.value)} type="number" placeholder="Payee Account Number" value={payeeAccountNumber}></input>
              <Select
                value={payeeBank}
                onChange={handleChange}
                options={mapBankList()}
              />
              {/* <select id="bank-list">
                {mapBankList()}
              </select> */}
              <br></br>
              <input onClick={addPayee} type="submit" name="amount" value="Send"></input>
            </div>
          </div>
        ) : (
          <LoadingScreen 
              loading={true}
              bgColor='#f1f1f1'
              spinnerColor='#9ee5f8'
              textColor='#676767'
              logoSrc='https://robinhood-fec-shehu.s3-us-west-1.amazonaws.com/logo.jpg'
              text='Registering Payee on PayMate' />
        )
      }
    </React.Fragment>
  )
}

export default NewPayments;
