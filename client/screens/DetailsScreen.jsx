import React from 'react';
import Balance from '../components/Balance';
import RecentsList from '../components/RecentsList';
import History from '../components/History';
import '../assets/styles/DetailsScreen.css';
import TopBar from '../components/TopBar';

const DetailsScreen = ({ selected, chooseSelected, changeIsOpen, isOpen, serverRequest, email }) => {
  return (
    <React.Fragment>
      <TopBar />
      <div className="container row">
      <div className="col-50 column center balance-col">

        <Balance
          banks={serverRequest.bankList}
          email={email}
          balance={serverRequest.balance} />

        <History 
          history={serverRequest.history} />

      </div>
      <div className="col-50 column horizontal-center">

        <RecentsList 
          list={serverRequest.payees} 
          selected={selected} 
          chooseSelected={chooseSelected} 
          isOpen={isOpen} 
          changeIsOpen={changeIsOpen} />

      </div>
    </div>
  </React.Fragment>
)};

export default DetailsScreen;