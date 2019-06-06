import React, { useState } from 'react';
import HistoryEntry from './HistoryEntry';

const History = () => {

  const [ history, setHistory ] = useState(null);
  const renderHistory = () => {
    return 1;
  } 
  
  return (
    <div>
      <div className="title">
        History
      </div>

      {history ? renderHistory() : <HistoryEntry text={'You have no transaction history'} />}
    </div>
  )
}

export default History;
