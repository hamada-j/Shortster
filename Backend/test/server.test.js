/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const ShortUrl = require('../models/shortUrl');
const app =  require('../server');

beforeEach((done) => {
  mongoose.connect(
    "mongodb+srv://hamada:b2012v2013i@cluster0.ghxig.mongodb.net/<dbname>?retryWrites=true&w=majority",
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
  done();
});

test('GET /', async () => {
  try{
    const shorturl = await ShortUrl.create({
    full:
      'https://www.google.com/',
    short: 'AbCd12',
    clicks: 20,
    created: '2021-01-01T21:30:22.648+00:00',
    lastVisit: '2021-01-01T21:30:22.648+00:00',
  });

  await supertest(app)
    .get('/:shortUrl')
    .expect(200)
    .then((response) => {
      // Check the response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[0].id).toBe(shorturl.id);
      expect(response.body[0].full).toBe(shorturl.full);
      expect(response.body[0].short).toBe(shorturl.short);
      expect(response.body[0].clicks).toBe(shorturl.clicks);
      expect(response.body[0].created).toBe(shorturl.created);
      expect(response.body[0].lastVisit).toBe(shorturl.lastVisit);
    });
  }catch(err){
    console.log("AQUI ES: ---->" + err);
  }
  
});

test('POST /shortUrls', async () => {

  try{
    const data = {
    full:
      'https://www.google.com/',
    short: 'AbCd12',
    clicks: 42,
    created: '2021-01-01T21:30:22.648+00:00',
    lastVisit: '2021-01-01T21:30:22.648+00:00',
  };

  await supertest(app)
    .post('/shortUrls')
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.id).toBeTruthy();
      expect(response.body.full).toBe(data.full);
      expect(response.body.short).toBe(data.short);
      expect(response.body.clicks).toBe(data.clicks);
      expect(response.body.created).toBe(data.created);
      expect(response.body.lastVisit).toBe(data.lastVisit);

      // Check the data in the database
      const Shorturl = await ShortUrl.findOne({ _id: response.body.id });
      expect(Shorturl).toBeTruthy();
      expect(Shorturl.full).toBe(data.full);
      expect(Shorturl.short).toBe(data.short);
      expect(Shorturl.clicks).toBe(data.clicks);
      expect(Shorturl.created).toBe(data.created);
      expect(Shorturl.lastVisit).toBe(data.lastVisit);
    });
  }catch(err){
    console.log("AQUI ES 2: ---->" +err);
  }

});
