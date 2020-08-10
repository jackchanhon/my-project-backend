const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {

  let tempDate = new Date(req.body.startDate)
  const endDate =  new Date(req.body.endDate)

  let invoiceDate = tempDate.getDate() + '/' + parseInt(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()

  if(req.body.subscriptionType === 'weekly') {
    let tempEndDate = new Date(req.body.endDate)
    tempEndDate = tempEndDate.setDate(tempEndDate.getDate() - 7)

    while(new Date(tempDate)< tempEndDate) {
      tempDate = tempDate.setDate(tempDate.getDate() + 7)
      tempDate = new Date(tempDate)
      invoiceDate = invoiceDate + ', ' + tempDate.getDate() + '/' + parseInt(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    }
  } else if(req.body.subscriptionType === 'monthly') {
    let tempEndDate = new Date(req.body.endDate)
    tempEndDate = tempEndDate.setDate(tempEndDate.getDate() - 30)

    while(new Date(tempDate)< tempEndDate ) {
      console.log(tempDate)
      console.log(req.body.endDate)
      tempDate = tempDate.setDate(tempDate.getDate() + 30)
      tempDate = new Date(tempDate)
      invoiceDate = invoiceDate + ', ' + tempDate.getDate() + '/' + parseInt(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    }
  }
  let responseData = {
    userName: req.body.userName,
    subscriptionType: req.body.subscriptionType,
    invoiceAmount: req.body.invoiceAmount,
    invoiceDate: invoiceDate
  }
  console.log(responseData)
  return res.json(responseData);
});

app.listen(5000, function() {
  console.log('Server listening on port 5000.');
});
