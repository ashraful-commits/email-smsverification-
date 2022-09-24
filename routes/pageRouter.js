const path = require('path');
const fs = require('fs');

//==============================================================//  import controlller
const express = require('express');
module.exports = {
  addnewdata,
  afterdeleteData,
  afterverifiedDeldata,
  blogpage,
  cellVerifiy,
  cellVerifiynow,
  editdata,
  gallerypage,
  homepage,
  locationpage,
  menupage,
  newspage,
  postdata,
  reservationpage,
  staffpage,
  unverifieddata,
  verifieddata,
  verifiydata,
  viewdata,
} = require('../controllers/pageControler.js');
const { userMulter } = require('../middlewares/pageMiddlerwars.js');

//===================================================================// create rouer
const router = express.Router();
//===================================================================// use router
router.get('/', homepage);
router.get('/home', homepage);
router.get('/blog', blogpage);
router.get('/gallery', gallerypage);
router.get('/location', locationpage);
router.get('/menu', menupage);
router.get('/news', newspage);
router.get('/reservation', reservationpage);
router.get('/staff', staffpage);

//===================================================================// admin page
router.get('/admin', verifieddata);
//===================================================================// email verified page
router.get('/admin/:token', verifiydata);

//===================================================================// cell verification page
router.get('/unverified/:otp', cellVerifiy);
//===================================================================// list of unverified
router.get('/unverified', unverifieddata);
//===================================================================// delete unverified data
router.get('/unverified/:id', afterdeleteData);
//===================================================================// cell verification
router.post('/unverified/:otp', cellVerifiynow);

//===================================================================// create data
router.get('/create', addnewdata);
//===================================================================//  post data
router.post('/create', userMulter, postdata);
//===================================================================// view data
router.get('/admin/:id', viewdata);
//===================================================================// edit data
router.get('/admin/:id', editdata);

//===================================================================// delet vrified  data
router.get('/admin/:id', afterverifiedDeldata);

//===================================================================// exports
module.exports = router;
