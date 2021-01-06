/* eslint-disable no-undef */
'use strict';
const mongoose = require('mongoose');
const supertest = require('supertest');

const generate = require('../utils/generateID')
const ShortUrl = require('../models/shortUrl');
const app = require('../app');


beforeEach((done) => {
  mongoose.connect(
   "mongodb+srv://shortster:shortster@cluster0.ghxig.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

afterAll( async done => {
  mongoose.connection.close();
  mongoose.disconnect()
  done();
  console.log(" Fin del test!!")
});

test('GET / get all endpoint, Should save 10 elements to database and return them', async () => {
  try{
    let arrTest = [];

    for( let i = 0; i < 10; i++ ){
      const shorturl = await ShortUrl.create({
        full: `https://www.google.com/`,
        short: generate(),
        clicks: Math.floor((Math.random() * 10) + 1),
        createdAt: '2021-01-01T21:30:22.648+00:00',
        visitedAt: '2021-01-01T21:30:22.648+00:00',
      });
      arrTest.push(shorturl)
    }
  await supertest(app)
    .get('/')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(arrTest.length);
      expect(response.body.data[0]._id).toBe(arrTest[0].id);
      expect(response.body.data[1].full).toBe(arrTest[1].full);
      expect(response.body.data[3].short).toBe(arrTest[3].short);
      expect(response.body.data[4].clicks).toBe(arrTest[4].clicks);
      expect(response.body.data[8].createdAt).toBe(arrTest[8].createdAt);
      expect(response.body.data[9].visitedAt).toBe(arrTest[9].visitedAt);
    });
  }catch(err){
    console.log(err);
  } 
});

test('GET /:id/stats, Should get one element from database givin the id', async () => {
  try{
    const shorturl = await ShortUrl.create({
    full:
      "https://www.google.kr/",
    short: "AbC123",
    clicks: 20,
    createdAt: new Date(),
    visitedAt: new Date(),
  });
  await supertest(app)
    .get(`/${shorturl.id}/stats`)
    .expect(200)
    .then((response) => {
      expect(response.body.data._id).toBe(shorturl.id);
      expect(response.body.data.full).toBe(shorturl.full);
      expect(response.body.data.short).toBe(shorturl.short);
      expect(response.body.data.clicks).toBe(shorturl.clicks);
      expect(response.body.data.createdAt).toBe(shorturl.createdAt);
      expect(response.body.data.visitedAt).toBe(shorturl.visitedAt);
    });
  }catch(err){
    console.log(err);
  }
});

test('GET /short/:shortUrl, Should return one element from database givin the short ID with one more click and update the last visit', async () => {
  try{
    const shorturl = await ShortUrl.create({
    full:
      'https://www.google.com/',
    short: 'AbC333',
    clicks: 20,
    createdAt: '2021-01-01T21:30:22.648+00:00',
    visitedAt: '2021-01-01T21:30:22.648+00:00',
  });
  await supertest(app)
    .get(`/short/${shorturl.short}`)
    .expect(200)
    .then((response) => {
      expect(response.body.doc._id).toBe(shorturl.id);
      expect(response.body.doc.full).toBe(shorturl.full);
      expect(response.body.doc.short).toBe(shorturl.short);
      expect(response.body.doc.clicks).toBe(shorturl.clicks + 1);
      expect(response.body.doc.createdAt).toBe(shorturl.createdAt);
      expect(response.body.doc.visitedAt).toBe(shorturl.visitedAt);
    });
  }catch(err){
    console.log(err);
  }
  
});

test('POST /short, Should post one element in database givin the url and custom shortID', async () => {
  try{
    const data = {
    url:'https://www.google.ru/',
    short: 'MyID01'
  };

  await supertest(app)
    .post('/customUrlShort')
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.data.full).toBe(data.url);
      expect(response.body.data.short).toBe(data.short);
      //the data in the database
      const result = await ShortUrl.findOne({ _id: response.body.data._id });
      expect(result).toBeTruthy();
      expect(result.full).toBe(data.url);
      expect(result.short).toBe(data.short);
    });
  }catch(err){
    console.log(err);
  }

});

test('POST /short, Should post one element in database givin a Url', async () => {
  try{
    const data = {
    url:'https://www.google.fr/',
  };

  await supertest(app)
    .post('/short')
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.data.full).toBe(data.url);
      //the data in the database
      const Shorturl = await ShortUrl.findOne({ _id: response.body.data._id });
      expect(Shorturl).toBeTruthy();
      expect(Shorturl.full).toBe(data.url);
    });
  }catch(err){
    console.log(err);
  }

});


test('GET /delete/:id, Should delete de element from the database', async () => {
  try{
    const shorturl = await ShortUrl.create({
    full:
      'https://www.google.hr/',
    short: 'aaaaaa',
    clicks: 2,
    createdAt: '2021-01-01T21:30:22.648+00:00',
    visitedAt: '2021-01-01T21:30:22.648+00:00',
  });

  await supertest(app)
    .delete(`/delete/${shorturl.id}`)
    .expect(200)
    .then((response) => {
      // Check the response 
      expect(response.body).toBeTruthy();
      // Check the response message and comparative
      expect(response.body.msg).toStrictEqual("deleted");
    });
  }catch(err){
    console.log(err);
  }
  
});

