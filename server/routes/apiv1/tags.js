'use strict';

const express = require('express');
const router = express.Router();
const tagsApiController = require('../../controllers/tagsApiController');

const { index } = tagsApiController();

router.get('/', index);

module.exports = router;