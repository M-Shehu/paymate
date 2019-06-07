import React from 'react';  
import '../assets/styles/popup.css';  

const Popup = ({ closePopup, Component, props }) => {  
  return (  
    <div className='popup'>  
      <div className='popup_inner center column'>  
        <Component { ...props }/>
        <button className="close-button" onClick={closePopup}> X </button>  
      </div>  
    </div>  
  );   
}  

export default Popup;