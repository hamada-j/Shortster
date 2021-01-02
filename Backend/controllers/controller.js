
const mongoose = require("mongoose");
const ShortUrl = require('../models/shortUrl');
const generate = require('../utils/generateID');

exports.getAll = async (req, res, next) => {
  try {
      const shortUrls = await ShortUrl.find();
      console.log(shortUrls);
      //res.render('index', { shortUrls });
      res.status(200).json({data: shortUrls})
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
      
};

exports.getOne = async (req, res, next) => {
    let url = req.url;
    let id = url.substring(url.lastIndexOf("/") , 1);
    try {
      const shortUrls = await ShortUrl.findById(id);
      //console.log(shortUrls)
      res.status(0).json({data: shortUrls})
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
      
};


exports.postUrlAndShort = async (req, res, next) => {
  try{ 
    const shortUrls = await ShortUrl.findOne({ 
      short: req.body.ShortsterUrl
    });
    if (shortUrls){
      return res.status(400).json({
        message: "Short Url already exist"
      });
    }
    const createUrlAndShort = new ShortUrl({
       full: req.body.fullUrl, 
       short: req.body.ShortsterUrl
    });
    createUrlAndShort.save((err, doc) => {
      if (err) {
        return res.status(400).json({
        message: "Short Url can NOT save! ---> " + err
      });
      }
      res.status(200).json({data: doc})
    })
  }catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
};


exports.postShort = async (req, res, next) => {
  try{ 
    let createShort = new ShortUrl({ 
      full: req.body.fullUrl, 
      short: generate
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
        message: "Short Url can NOT save! ---> " + err
      });
      }
      res.status(200).json({data: doc})
    });

  }catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }      
};

exports.postShortClicks = async (req, res, next)=> {
  try{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl == null){
      return res.status(400).json({
        message: "Short Url can NOT save! ---> " + err
      });
    } 

    await ShortUrl.findOneAndUpdate({ short: req.params.shortUrl, lastVisit : new Date() }, {new: true});
    shortUrl.clicks++;
    shortUrl.save();
    res.status(200).json({doc: shortUrl, data: shortUrl.full})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }

}