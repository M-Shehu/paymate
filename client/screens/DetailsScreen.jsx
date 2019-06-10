import React from 'react';
import Balance from '../components/Balance';
import RecentsList from '../components/RecentsList';
import History from '../components/History';
import '../assets/styles/DetailsScreen.css';
import TopBar from '../components/TopBar';
import AddSupplier from '../components/AddSupplier';

const DetailsScreen = ({serverRequest, email, updatePayees, updateHistory, updateBalance }) => {
  return (
    <React.Fragment>
      <TopBar />
      <div id="main" className="container row">
      <div className="col-50 column horizontal-center balance-col">

        <Balance
          email={email}
          updateHistory={updateHistory}
          balance={serverRequest.balance} />

        <History 
          history={serverRequest.history} />

      </div>
      <div className="col-50 column horizontal-center">

        <AddSupplier 
          updatePayees={updatePayees}
          banks={serverRequest.bankList} />

        <RecentsList 
          list={serverRequest.payees} 
          updateBalance={updateBalance} />

      </div>
    </div>
  </React.Fragment>
)};

export default DetailsScreen;