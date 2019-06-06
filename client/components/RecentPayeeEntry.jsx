import React, { useState, useEffect } from 'react';
import '../assets/styles/RecentPayeeEntry.css';

const RecentPayeeEntry = ({ nameInfo, isOpen, role, selected, id, chooseSelected, changeIsOpen, setReceipientObj }) => {

  const nameInput = React.createRef();
  const [ amount, setAmount ] = useState();

  const submitAmount = (e) => {
    e.preventDefault();
    let receipient = {
      amount: amount,
      reference: nameInfo.reference
    }
    setReceipientObj(receipient);
    setAmount('');
  }

  useEffect(() => {
    const recentDOMElement = document.querySelector(`#entry${id}`);
    const inputDOMElement = document.querySelector(`#input${id}`);
    const openRecent = () => {
      inputDOMElement.style.display = "block";
      recentDOMElement.style.color = "white";
      recentDOMElement.style.backgroundColor = "rgb(255, 212, 132)";
      recentDOMElement.style.height = "120px";
      recentDOMElement.style.boxShadow = "0 25px 45px rgba(114, 114, 114, 0.3), 0 20px 15px rgba(114, 114, 114, 0.22)";
    }
  
    const closeRecent = () => {
      inputDOMElement.style.display = "none";
      recentDOMElement.style.backgroundColor = "rgb(240, 240, 240)";
      recentDOMElement.style.height = "80px";
      recentDOMElement.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
    }
    console.log(selected, `entry${id}`);
    selected !== `entry${id}` ? closeRecent() : openRecent();
  }, [isOpen])

  return (
  <div class="recent" id={`entry${id}`} onClick={e => {chooseSelected(e); changeIsOpen(e);}}>
    <div className="entry-name">
      NAME: {nameInfo.name}
    </div>
    <div className="entry-role">
      ROLE: {nameInfo.role}
    </div>
    <div className="entry-input" id={`input${id}`}>
      <strong>How much do you want to send?: </strong>
      <input onChange={e => setAmount(e.target.value)} ref={nameInput} name="amount" className="message-name" type="number" placeholder="Amount To be Sent" value={amount}></input>
      <input onClick={submitAmount} type="submit" name="amount" value="Send"></input>
    </div>
  </div>
)};

export default RecentPayeeEntry;
