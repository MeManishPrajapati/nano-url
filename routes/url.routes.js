const express = require('express');
const { getOriginalUrl, generateNanoUrl } = require('../controllers/url.controller');
const urlRoutes = express.Router();

urlRoutes.post('/generate', generateNanoUrl)

urlRoutes.get('/:nano_url', getOriginalUrl)


module.exports = urlRoutes;