import React, { useState } from 'react';
import RecentPayeeEntry from './RecentPayeeEntry';
import Axios from 'axios';
import '../assets/styles/recentsList.css';

const RecentList = ({ list, updateBalance }) => {
  
  const [ selected, setSelected ] = useState(null);
  const [ isOpen, setIsOpen ] = useState(true);
  const [ amount, setAmount ] = useState();

  const chooseSelected = (e) => {
    setSelected(`${e.target.parentNode.id}`)
  }

  const changeIsOpen = (e) => {
    if (e.target.name !== 'amount') {
      setIsOpen(!isOpen);
    }
  }

  const initializeTransfer = (data) => {
    Axios.post('/initialize-transfer', data)
    .then(({ data }) => {
      updateBalance();
      alert('Your transfer was successful');
    })
    .catch(e => alert(`Please try again. There was an error sending the money\nServer Response: ${e.response.data}`))
  }

  const handleAmountChange = e => {
    setAmount(e.target.value);
  }

  const submitAmount = (e, receipientCode) => {
    e.preventDefault();
    let receipient = {
      amount: amount,
      recipient: receipientCode
    }
    initializeTransfer(receipient); 
  }

  return (
    <div className="expand column horizontal-center">
      <div className="title">
        Suppliers
      </div>
      <em>click on supplier to make transfer</em>
      <div className="list column horizontal-center">
        {
          list.map((element, id) => {
            return <RecentPayeeEntry 
              nameInfo={element} 
              id={id} 
              key={id}
              handleAmountChange={handleAmountChange}
              submitAmount={submitAmount}
              chooseSelected={chooseSelected}  
              changeIsOpen={changeIsOpen} 
              selected={selected}
              isOpen={isOpen} />
          })
        }
      </div>
    </div>
  )
}

export default RecentList;
