import React from 'react';
import HistoryEntry from './HistoryEntry';

const History = ({ history }) => {

  history = history.filter(element => {
    return element.status === 'success';
  })
  
  const renderHistory = (history) => {
    return history.map (element => {
      return <HistoryEntry text={`₦${(element.amount/100).toLocaleString()} --- ${element.customer.email}`}/>; 
    })
  } 
  
  return (
    <div>
      <div className="title">
        History
      </div>

      {history && history.length > 0 ? renderHistory(history) : <HistoryEntry text={'You have no transaction history'} />}
    </div>
  )
}

export default History;
