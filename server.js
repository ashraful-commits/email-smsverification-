const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const expressLayout = require('express-ejs-layouts');
const router = require('./routes/pageRouter.js');

//========================================================// dotenv config
dotenv.config();

//========================================================// environment const
const port = process.env.PORT || 400;

//========================================================// init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//========================================================//  ejs
app.set('view engine', 'ejs');
//========================================================//  layout
app.use(expressLayout);
//========================================================//  layouts
app.set('layout', 'layouts/app');
//========================================================//  rotuer
app.use(router);

//=========================================================// static public folder
app.use(express.static('public'));

//========================================================//  sever creating
app.listen(port, () => {
  console.log(`server is running ${port}`.bgYellow);
});
