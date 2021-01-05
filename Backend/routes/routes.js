'use strict';

const express = require("express");
const router = express.Router();

const urlController = require("../controllers/controller");

router.get('/', urlController.getAll);

router.get('/:id/star', urlController.getOne);

router.post('/customUrlShort', urlController.postUrlAndShort);

router.post('/short', urlController.postShort);

router.get('/short/:shortUrl', urlController.postShortClicks);

router.delete('/delete/:id', urlController.deleteOne);


module.exports = router;
