import React from 'react';
import '../assets/styles/amount-entry.css';

const AmountEntry = ({ handleAmountChange, amount, topUpBalance }) => (
  <React.Fragment>
    <div className="amount-search">
      <input onChange={e => handleAmountChange(e)} type="number" value={amount} placeholder="How much do you want to add (In Kobo Pls)..."/>       
    </div>
    
    <button id="search-button" onClick={topUpBalance}>Go to payment</button>
  </React.Fragment>
);

export default AmountEntry;
