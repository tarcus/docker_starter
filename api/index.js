const express = require('express')
const app = express()
const mongoose = require('mongoose')


const {
	MONGO_USERNAME,
	MONGO_PASSWORD
  } = process.env;
  
const expressPort = 3000;
//db connecting to the mongo container
mongoose.connect('mongodb://mongo:27017/mydb', {
	 useNewUrlParser: true, 
	 useUnifiedTopology: true,
	 user: MONGO_USERNAME,
	 pass: MONGO_PASSWORD
})
.then(()=>{
	console.log('Connected to DB successfully!')
})
.catch((err)=>{
	console.log('Connection to DB failed', err)
})


const User = require('./models/user')

app.get('/', (req, res, next)=>{
	res.send(`Express Up and running!`);
})

app.get('/users', (req, res, next)=>{
	User.findOne({name: 'tarcus'}, (err, user)=>{
		if(err || !user){
			res.send('There is no such user, please create one')
		} else {
			res.send(`Your name is ${user.name}`)
		}
		
	})
})

app.get('/add', (req, res, next)=>{
	User.create({name: 'tarcus'}, (err, doc)=>{
		if(err){
			console.log("Can't create user: ", err)
			res.send("Can't create user!")
		} else {
			res.send("User created successfully!")
		} 
	})
})

app.listen(expressPort, ()=>{
	console.log(`Express Server is running on port ${expressPort}`)
})