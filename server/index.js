require('dotenv').config();

const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
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

// app.get('/new-access-code', function(req, res) {
//     var customerid = req.params.customerid;
//     var cartid     = req.params.cartid;
//     // you can then look up customer and cart details in a db etc
//     // I'm hardcoding an email here for simplicity
//     amountinkobo = process.env.TEST_AMOUNT * 100;
//     if(isNaN(amountinkobo) || (amountinkobo < 2500)){
//         amountinkobo = 2500;
//     }
//     email = process.env.SAMPLE_EMAIL;

//     // all fields supported by this call can be gleaned from
//     // https://developers.paystack.co/reference#initialize-a-transaction
//     paystack.transaction.initialize({
//         email:     email,        // a valid email address
//         amount:    amountinkobo, // only kobo and must be integer
//         metadata:  {
//             custom_fields:[
//                 {
//                     "display_name":"Started From",
//                     "variable_name":"started_from",
//                     "value":"sample charge card backend"
//                 },
//                 {
//                     "display_name":"Requested by",
//                     "variable_name":"requested_by",
//                     "value": req.headers['user-agent']
//                 },
//                 {
//                     "display_name":"Server",
//                     "variable_name":"server",
//                     "value": req.headers.host
//                 }
//             ]
//         }
//     },function(error, body) {
//         if(error){
//             res.send({error:error});
//             return;
//         }
//         res.send(body.data.access_code);
//     });
// });

// payeeData = {
//   type: "nuban", 
//   name: "Mr. Shiba", 
//   description: "Customer1029 bank account", 
//   account_number: "0000000000", 
//   bank_code: "044", 
//   currency: "NGN"
// }

let authOptions = (method, query, data) => {
  return {
    method: method,
    url: `https://api.paystack.co/${query}`,
    data: data,
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
  Axios(authOptions('GET', 'transaction/totals'))
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/payees', (req, res) => {
  Axios(authOptions('GET', 'transfer'))
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
// app.post('/register-payee', function(req, res) {
//   var customerid = req.params.customerid;
//   var cartid     = req.params.cartid;
//   // you can then look up customer and cart details in a db etc
//   // I'm hardcoding an email here for simplicity
//   amountinkobo = process.env.TEST_AMOUNT * 100;
//   if(isNaN(amountinkobo) || (amountinkobo < 2500)){
//       amountinkobo = 2500;
//   }
//   email = process.env.SAMPLE_EMAIL;

//   // all fields supported by this call can be gleaned from
//   // https://developers.paystack.co/reference#initialize-a-transaction
//   paystack.transaction.initialize({
//       email:     email,        // a valid email address
//       amount:    amountinkobo, // only kobo and must be integer
//       metadata:  {
//           custom_fields:[
//               {
//                   "display_name":"Started From",
//                   "variable_name":"started_from",
//                   "value":"sample charge card backend"
//               },
//               {
//                   "display_name":"Requested by",
//                   "variable_name":"requested_by",
//                   "value": req.headers['user-agent']
//               },
//               {
//                   "display_name":"Server",
//                   "variable_name":"server",
//                   "value": req.headers.host
//               }
//           ]
//       }
//   },function(error, body) {
//       if(error){
//           res.send({error:error});
//           return;
//       }
//       res.send(body.data.access_code);
//   });
// });

// app.get('/verify/:reference', function(req, res) {
//     var reference = req.params.reference;

//     paystack.transaction.verify(reference,
//         function(error, body) {
//         if(error){
//             res.send({error:error});
//             return;
//         }
//         if(body.data.success){
//             // save authorization
//             var auth = body.authorization;
//         }
//         res.send(body.data.gateway_response);
//     });
// });

// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('/*', function(req, res){
//     res.status(404).send('Only GET /new-access-code \
//         or GET /verify/{reference} is allowed');
// });

// app.listen(app.get('port'), function() {
//     console.log("Node app is running at localhost:" + app.get('port'))
// })

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));
