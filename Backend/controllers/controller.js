'use strict';
const mongoose = require("mongoose");
const ShortUrl = require('../models/shortUrl');
const generate = require('../utils/generateID');

exports.getAll = async (req, res, next) => {
  try {
      const shortUrls = await ShortUrl.find();
      res.status(200).json({data: shortUrls})
  } catch (err) {
      console.log(err);
      res.status(500).json({error: "getAll: " + err });
  }     
};

exports.getOne = async (req, res, next) => {
    let url = req.url;
    let id = url.substring(url.lastIndexOf("/") , 1);
    try {
      const shortUrls = await ShortUrl.findById(id);
      res.status(200).json({data: shortUrls})
    } catch (err) {
      console.log(err);
      res.status(500).json({error: "getOne: " + err });
    }   
};


exports.postUrlAndShort = async (req, res, next) => {
  
  try{ 
    const shortUrls = await ShortUrl.findOne({ 
      short: req.body.short
    });
    if (shortUrls){
      return res.status(400).json({
        message: "Short Url already exist in Database"
      });
    } else {
      const createUrlAndShort = new ShortUrl({
       full: req.body.url, 
       short: req.body.short
      });
      createUrlAndShort.save((err, doc) => {
        if (err) {
            return res.status(400).json({
            message: "Short Url can`t save! ---> " + err
          });
        }
        res.status(200).json({data: doc})
      })
    }
    
  }catch (err) {
      console.log(err);
      res.status(500).json({ message: "postUrlAndShort: " + err });
    }
};



exports.postShort = async (req, res, next) => {
 
  try{ 
    let createShort = new ShortUrl({ 
      full: req.body.url, 
      short: generate()
    });

    const existShort = await ShortUrl.findById(createShort._id);
    if (existShort) {
       return res.status(400).json({
        message: "Short Url already exist"
      });
    }

    createShort.save((err, doc) => {
      if (err) {
       return res.status(400).json({
        message: "Short Url can`t save! ---> " + err
      });
      }
      res.status(200).json({data: doc})
      
    });
  }catch (err) {
    console.log(err);
    res.status(500).json({ message: "postShort: " + err });
  } 

};

exports.postShortClicks = async (req, res, next)=> {
   try{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl == null){
      return res.status(400).json({
        message: "Short Url can NOT save!"
      });
    } 

    await ShortUrl.findOneAndUpdate({ short: req.params.shortUrl, lastVisit : new Date() }, {new: true});
    shortUrl.clicks++;
    shortUrl.save();
    res.status(200).json({doc: shortUrl, data: shortUrl.full})
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "postShortClicks: " + error });
  }

};

exports.deleteOne = async (req, res, next)=> {
   try{

  await ShortUrl.deleteOne({ _id: req.params.id });
  res.status(200).json({msg: "deleted"})
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "deleteOne" + err });
  }

};