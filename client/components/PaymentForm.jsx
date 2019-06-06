import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../assets/styles/paymentForm.css';

const PaymentForm = ({ accessCode }) => {

  const [ paystack, setPaystack ] = useState({});
  const [ email, setEmail ] = useState('mag.shehu@gmail.com');
  const [ amount, setAmount ] = useState(12000);
  const [ cardNumber, setCardNumber ] = useState('');
  const [ CVV, setCVV ] = useState('');
  const [ expMonth, setExpMonth ] = useState('');
  const [ expYear, setExpYear ] = useState('');

  const initializePayStack = () => {
    Paystack.init({
      form: "paystack",
      access_code: accessCode 
    })
    .then(returnedObj => {
      console.log(returnedObj);
      setPaystack(returnedObj); 
    })
    .catch(function(error){
      console.log("There was an error loading Paystack", error);
    });
  }

  const formatNumber = (value) => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  

  useEffect(() => {
    initializePayStack();
    // initializeTransaction();
  }, [])

  return (
    <div className="container center">
      <form id="paystack" className="contact-form center">
        <div className="number-cvv row">
          <div className="input-field col-40">
            <label className="message-name" htmlFor="message-name">Card Number</label>
            <input data-paystack="number" onChange={e => this.setName(e.target.value)} value={cardNumber} name="cardNumber" type="tel" pattern="\d*" maxLength="19" placeholder=".... .... .... ...."/>
          </div>
          <div className="input-field col-20">
            <label className="message-name" htmlFor="message-name">CVV</label>
            <input type="tel" data-paystack="cvv" onChange={e => this.setName(e.target.value)} value={CVV} name="CVV"/>            
          </div>
        </div>
        <div className="expiry row">
          <div className="input-field">
            <label className="message-name" htmlFor="message-name">Expiry Month</label>
            <input type="tel" data-paystack="expiryMonth" onChange={e => this.setName(e.target.value)} value={expMonth} className="cc-expires-month"/>
          </div>
          <div className="input-field">
            <label className="message-name" htmlFor="message-name">Expiry Year</label>
            <input type="tel" data-paystack="expiryYear" onChange={e => this.setName(e.target.value)} value={expYear} className="cc-expires-year"/>
          </div>
        </div>
        
      <button className="btn" type="submit" data-paystack="submit">Make Payment</button>
      </form>
    </div>
  )
}

export default PaymentForm;
