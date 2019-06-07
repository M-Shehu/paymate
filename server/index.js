require('dotenv').config();

// No paystack libraries were used due to the ambiguity of the different library versions
// All server endpoints invoke the PayStack API directly
// const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY); 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Axios = require('axios');
const app = express();
const morgan = require('morgan');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());  
app.use(morgan('tiny'));   
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/pay', express.static(path.join(__dirname, '../public')));

let authOptions = (method, query, data) => {
  return {
    method: method,
    url: `https://api.paystack.co/${query}`,
    data: JSON.stringify(data),
    headers: {
      'Authorization': process.env.PAYSTACK_SECRET_KEY,
      'Content-Type': 'application/json'
    },
    json: true
  };
};

app.get('/balance', (req, res) => {
  Axios(authOptions('GET', 'balance'))
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/history', (req, res) => {
  Axios(authOptions('GET', 'transaction'))
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/payees', (req, res) => {
  Axios(authOptions('GET', 'transferrecipient'))
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/bank-list', (req, res) => {
  Axios(authOptions('GET', 'bank'))
    .then(({ data }) => {
      res.send(data);
    });
});

app.post('/register-payee', function(req, res) {
  let payeeData = {
    type: "nuban", 
    name: req.body.name, 
    description: req.body.description, 
    account_number: req.body.accountNumber, 
    bank_code: req.body.bankCode, 
    currency: "NGN"
  };

  Axios(authOptions('POST', 'transferrecipient', payeeData))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.post('/initialize-transfer', function(req, res) {
  let data = {
    source: 'balance',
    reason: 'Testing',
    amount: req.body.amount,
    recipient: req.body.recipient
  };

  Axios(authOptions('POST', 'transfer', data))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.post('/finalize-transfer', function(req, res) {
  let data = {
    transfer_code: req.body.transferCode, 
    otp: req.body.otp
  };

  Axios(authOptions('POST', 'finalize_transfer', data))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.post('/initialize-transaction', function(req, res) {
  let data = {
    amount: req.body.amount, 
    email: req.body.email
  };

  Axios(authOptions('POST', 'transaction/initialize', data))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.get('/verify', function(req, res) {
  let queryString = `bank/resolve?account_number=${req.query.account}&bank_code=${req.query.code}`;
  Axios(authOptions('GET', queryString))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.post('/finalize-transaction', function(req, res) {
  let data = {
    email: "nuban", 
    amount: req.body.name, 
    card: {
      cvv: req.body.cvv,
      number: req.body.number,
      expiry_month: req.body.expMonth,
      expiry_year: req.body.expYear
    }
  };

  Axios(authOptions('POST', 'charge', data))
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => {
      console.log(e.message);
    });
});

app.get('/*', function(req, res) {
  res.status(404).send('PayMate does not support that. Kindly go to the home page');
});

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));
