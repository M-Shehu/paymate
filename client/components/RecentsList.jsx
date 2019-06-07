import React from 'react';
import RecentPayeeEntry from './RecentPayeeEntry';
import '../assets/styles/recentsList.css';

const RecentList = ({ list, selected, chooseSelected, changeIsOpen, isOpen, setReceipientObj }) => {
  
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
              chooseSelected={chooseSelected}  
              changeIsOpen={changeIsOpen} 
              selected={selected}
              setReceipientObj={setReceipientObj}
              isOpen={isOpen} />
          })
        }
      </div>
    </div>
  )
}

export default RecentList;
