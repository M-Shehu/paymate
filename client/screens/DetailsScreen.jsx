import React from 'react';
import Balance from '../components/Balance';
import NewPayment from '../components/NewPayment';
import RecentsList from '../components/RecentsList';
import History from '../components/History';
import '../assets/styles/DetailsScreen.css';

const list = [
  {
    name: "shehu",
    role: 'baker',
    reference: '134ddfs'
  },
  {
    name: "Tutu",
    role: 'lala',
    reference: '134ddfs'
  },
  {
    name: "Resue",
    role: 'sjf',
    reference: '134ddfs'
  },
]

const DetailsScreen = ({ selected, chooseSelected, changeIsOpen, isOpen, setReceipientObj, serverRequest }) => {
  return (
  <div className="container row">
    <div className="col-40 column center">

      <Balance 
        balance={serverRequest.balance} />

      <History 
        history={serverRequest.history} />

    </div>
    <div className="col-60 column horizontal-center">

      <NewPayment 
        banks={serverRequest.bankList}
        setReceipientObj={setReceipientObj} />  

      <RecentsList 
        list={serverRequest.payees} 
        selected={selected} 
        chooseSelected={chooseSelected} 
        isOpen={isOpen} 
        setReceipientObj={setReceipientObj}
        changeIsOpen={changeIsOpen} />

    </div>
  </div>
)};

export default DetailsScreen;