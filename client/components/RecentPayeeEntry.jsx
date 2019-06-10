import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import '../assets/styles/RecentPayeeEntry.css';

const RecentPayeeEntry = ({ nameInfo, isOpen, selected, id, handleAmountChange, chooseSelected, changeIsOpen, submitAmount }) => {

  const [ amount, setAmount ] = useState();
  const [ otpRequested, setOtpRequested ] = useState(false);

  useEffect(() => {
    const recentDOMElement = document.querySelector(`#entry${id}`);
    const inputDOMElement = document.querySelector(`#input${id}`);
    const openRecent = () => {
      inputDOMElement.style.display = "block";
      recentDOMElement.style.color = "white";
      recentDOMElement.style.backgroundColor = "rgb(255, 212, 132)";
      recentDOMElement.style.height = "120px";
    }
  
    const closeRecent = () => {
      inputDOMElement.style.display = "none";
      recentDOMElement.style.backgroundColor = "rgb(240, 240, 240)";
      recentDOMElement.style.height = "80px";
    }
    selected !== `entry${id}` ? closeRecent() : openRecent();
  }, [isOpen])

  return (
  <div className="recent" id={`entry${id}`} onClick={e => {chooseSelected(e); changeIsOpen(e);}}>
    <div className="entry-name">
      NAME: {nameInfo.name}
    </div>
    <div className="entry-role">
      ROLE: {nameInfo.description}
    </div>
    <div className="entry-input" id={`input${id}`}>
      <strong>How much do you want to send?: </strong>
      <input 
        onChange={handleAmountChange} 
        name="amount" 
        className="message-name" 
        type="number" 
        placeholder="Amount To be Sent" 
        value={amount}></input>
      <input onClick={e => submitAmount(e, nameInfo.recipient_code)} type="submit" name="amount" value="Send"></input>
    </div>
  </div>
)};

export default RecentPayeeEntry;
