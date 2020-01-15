const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const img = require('./controllers/image');




const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'smart-brain'
    }
});


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/register', (req,res ) => {register.handleRegister(req,res,db,bcrypt)});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});
  
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id: id })
        .then(user => {
                if (user.length) {
                    res.json(user[0]);
                } else {
                    res.status(400).json("no such user");
                }
            }


        ).catch(err => res.status(400).json("error getting user"))

});

app.put('/image', (req,res)=> {img.handleImage(req,res,db)});
app.post('/imageurl', (req,res)=> {img.handleApiCall(req,res)});


app.listen(3000, () => {
    console.log('app is running on port 3000');
});