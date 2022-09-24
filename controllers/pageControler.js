const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const url = require('url');
//==========================================================import function
const sendEMail = require('../utility/sendEmail.js');
const sendSMSfuction = require('../utility/sendSms.js');

//==========================================================// home page show
const homepage = (req, res) => {
  res.render('index');
};
//=========================================================// blog page
const blogpage = (req, res) => {
  res.render('archive');
};

//=========================================================//  gallery show
const gallerypage = (req, res) => {
  res.render('gallery');
};
//=========================================================//  staff show
const staffpage = (req, res) => {
  res.render('staff');
};

//=========================================================//  location page
const locationpage = (req, res) => {
  res.render('location');
};

//=========================================================//  menu page
const menupage = (req, res) => {
  res.render('menu');
};

//===========================================================//  news page
const newspage = (req, res) => {
  res.render('news');
};

//============================================================//  reservation page

const reservationpage = (req, res) => {
  res.render('reservation');
};

//=============================================================//  add new data
const addnewdata = (req, res) => {
  res.render('database/create');
};

//===============================================================//  post push
const postdata = async (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );

  //=============================================================//  token difine here
  const token = Date.now() + Math.floor(Math.random() * 1000);
  const otp = Math.floor(Math.random() * 1000);
  const { name, photo, email, cell } = req.body;
  await sendSMSfuction(
    cell,
    `Hi ${name}, How are you? Your OTP is ${otp}`
  );
  await sendEMail(email, 'Hi', { name, email, cell, token });
  user.push({
    id: user.length - 1 + 2,
    name: name,
    photo: req.file.filename,
    email: email,
    cell: cell,
    token: token,
    verified: false,
    otp: otp,
  });
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );

  res.redirect('/admin');
};

//================================================================// verified data
const verifieddata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );

  const verifiedData = user.filter((data) => data.verified == true);
  res.render('database/verified', {
    user: verifiedData,
  });
};

//==================================================================//  unverified data
const unverifieddata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  // filter data  ==============================================================//
  const unverifiedData = user.filter(
    (data) => data.verified == false
  );

  res.render('database/unverified', {
    user: unverifiedData,
  });
};

//=============================================================//  view
const viewdata = (req, res) => {
  res.render('database/view');
};

//=============================================================//  edit data
const editdata = (req, res) => {
  res.render('database/edit');
};

//==============================================================// verified page show
const verifiydata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const token = req.params.token;
  //findindex  ======================================================>
  user[user.findIndex((data) => data.token == token)] = {
    ...user[user.findIndex((data) => data.token == token)],
    verified: true,
  };
  // writefilesyne =================================================>
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );
  // redircet //==================================================>
  res.redirect('/admin');
};

//=========================================================//  after delete  unverified data
const afterdeleteData = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );

  const id = req.params.id;
  const afterundelete = user.filter((item2) => item2.id != id);
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(afterundelete)
  );
  res.redirect('/unverified');
};

//=============================================================// after delete verified data

const afterverifiedDeldata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );

  const afterverdelete = user.filter(
    (item) => item.id != req.params.id
  );
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(afterverdelete)
  );
  res.redirect('/admin');
};

//=========================================================// verifycell page

const cellVerifiy = (req, res) => {
  res.render('database/cell');
};

//=========================================================//  verify with cell now
const cellVerifiynow = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const { otp } = req.body;

  user[user.findIndex((data) => data.otp == otp)] = {
    ...user[user.findIndex((data) => data.otp == otp)],
    verified: true,
  };

  // writefilesync //================================================//
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );
  // redirect //=======================================================//
  res.redirect('/admin');
};

//======================================================exports
module.exports = {
  homepage,
  blogpage,
  gallerypage,
  locationpage,
  menupage,
  newspage,
  reservationpage,
  staffpage,
  addnewdata,
  postdata,
  verifieddata,
  verifiydata,
  editdata,
  afterdeleteData,
  afterverifiedDeldata,
  cellVerifiy,
  cellVerifiynow,
  viewdata,
  unverifieddata,
};
