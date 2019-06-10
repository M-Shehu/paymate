import React, { useState } from 'react';
import Axios from 'axios';

const AddSupplier = ({ banks, updatePayees }) => {

  const [ payeeName, setPayeeName ] = useState('');
  const [ payeeOccupation, setPayeeOccupation ] = useState('');
  const [ isRecordFetched, setIsRecordFetched ] = useState(false);
  const [ payeeAccountNumber, setPayeeAccountNumber ] = useState('');
  const [ payeeBank, setPayeeBank ] = useState('');
  const [ dropDownValue, setDropDownValue ] = useState('default');


  // Event handler for drop down menu
  const handleDropDownChange = selectedOption => {
    var sel = document.getElementById("bank-dropdown");
    var text= sel.options[sel.selectedIndex].text;
    var bankCode = selectedOption.target.value;
    setDropDownValue(bankCode);
    setPayeeBank({code: bankCode, label: text});
  };


  // Function to map list of banks to drop down menu
  const mapBankList = () => {
    return banks.map(bank => {
      return <option key={bank.id} value={bank.code}>{bank.name}</option>
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
    .catch(e => {
      alert(`Please input a correct account number and try again \nServer Response: ${e.response.data}`)});
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
      updatePayees();
    })
    .then(() => {
      setIsRecordFetched(false);
    })
    .catch(e => {
      alert(`There was a problem adding this supplier. Please try again \nServer Response: ${e.response.data}`)});
  }

  return (
    <React.Fragment>
      <div id="stats-container" className="effect1">
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
                <select id="bank-dropdown" value={dropDownValue} onChange={handleDropDownChange}>
                  <option value="default" disabled >Choose Supplier Bank...</option>
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
    </React.Fragment>
  )
}

export default AddSupplier;
