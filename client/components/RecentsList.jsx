import React, { useState } from 'react';
import RecentPayeeEntry from './RecentPayeeEntry';
import '../assets/styles/recentsList.css';

const RecentList = ({ list, submitAmount, handleAmountChange }) => {
  
  const [ selected, setSelected ] = useState(null);
  const [ isOpen, setIsOpen ] = useState(true);

  const chooseSelected = (e) => {
    console.log(e.target.parentNode);
    setSelected(`${e.target.parentNode.id}`)
  }

  const changeIsOpen = (e) => {
    if (e.target.name !== 'amount') {
      setIsOpen(!isOpen);
    }
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
