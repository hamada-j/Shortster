const express = require("express");
const router = express.Router();

const urlController = require("../controllers/controller");

router.get('/', urlController.getAll);

router.get('/:id/star', urlController.getOne);

router.post('/url+short', urlController.postUrlAndShort);

router.post('/short', urlController.postShort);

router.get('/short/:shortUrl', urlController.postShortClicks);


module.exports = router;
