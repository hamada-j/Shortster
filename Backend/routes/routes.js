'use strict';

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const urlController = require("../controllers/controller");
/**
* @swagger
* tags:
*   name: Shorts for Urls
*   description: Shortid as a URL
*/

/**
* @swagger
* definitions:
*   shortsterSchema:
*     type: object
*     required:
*       - url
*       - short
*       - clicks
*       - created
*       - clicks
*     properties:
*       url:
*         type: string
*       short:
*         type: string
*       clicks:
*         type: number
*       created:
*         type: date
*       lastVisit:
*         type: date
*/

/**
* @swagger
* definitions:
*   customSchema:
*     type: object
*     required:
*       - url
*       - short
*     properties:
*       url:
*         type: string
*       short:
*         type: string
*/

/**
* @swagger
* definitions:
*   simpleSchema:
*     type: object
*     required:
*       - url
*     properties:
*       url:
*         type: string
*/


/**
* @swagger
* /:
*   get:
*     summary: "Get all URL in the Data Base"
*     tags: [All]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     description: Get all entries.
*     responses:
*       200:
*         description: Get All 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/
router.get('/', urlController.getAll);

/**
* @swagger
* /{id}/stats:
*   get:
*     summary: "Get one URL in the Data Base by the ID"
*     tags: [One]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: _id of the document to retrieve.
*         schema:
*            $ref: "#/definitions/shortsterSchema"
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/
router.get('/:id/stats', urlController.getOne);

/**
* @swagger
* /customUrlShort:
*   post:
*     summary: "Create a doc from the URL in the Data Base with custom the ID introduce by user"
*     tags: [Custom]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url and short.length > 4 to create.
*         schema:
*            $ref: "#/definitions/customSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/customSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*
*/
router.post('/customUrlShort', 
    [
    check("url", "valid URL")
      .exists()
      .isURL(),
    check("short", "should have at less than 4 characters")
      .isLength({ min: 4 })
    ],
    urlController.postUrlAndShort);

/**
* @swagger
* /short:
*   post:
*     summary: "Create a doc from the URL in the Data Base with all generate by the Api"
*     tags: [Simple]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/simpleSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/simpleSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       888:
*         description: Validation errors
*/

router.post('/short',
    [
    check("url", "is a valid URL")
      .exists()
      .isURL()
    ], 
    urlController.postShort);

/**
* @swagger
* /short/{shortUrl}:
*   get:
*     summary: "Get one URL from the short id and get the link"
*     tags: [ShortClicks]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: shortUrl
*         required: true
*         description: ShortID of the document to retrieve.
*         schema:
*            $ref: "#/definitions/shortsterSchema"
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/

router.get('/short/:shortUrl', urlController.postShortClicks);

/**
* @swagger
* /delete/{id}:
*   delete:
*     summary: "Givin a id for delete a document"
*     tags: [Delete]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: _id of the document to delete.
*         schema:
*           $ref: "#/definitions/shortsterSchema"
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*
*/
router.delete('/delete/:id', urlController.deleteOne);


module.exports = router;
