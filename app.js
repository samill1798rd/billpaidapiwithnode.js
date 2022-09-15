const express = require('express');

const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//Mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bills'
  });

  //Route

  app.post('/bills', (req,res)=>{

    let password = req.body.password;

    if(password === 'fp01-87d3e71f-6be9-4326-a9a2-37140ba64b1c'){
        const sql = 'SELECT * FROM billsdetail';

    connection.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length > 0){
            res.json(results);
            res.status(201);
        }
        else{res.send('Not result');}
       })
    }else{res.send('Error to connect')}
  });

  app.post('/add', (req,res)=>{

    const sql = 'INSERT INTO billsdetail SET ?';

    const billsObj = {
        balance: req.body.balance,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        fingerprint: req.body.fingerprint,
        cards: req.body.cards,
        banks: req.body.banks,
        business: req.body.business,
        transactions: req.body.transactions
    };

    connection.query(sql, billsObj, (err, results) => {
        if(err) throw err;
        res.status(200).send("success");
    })
  });


// check connection
connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!')
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
