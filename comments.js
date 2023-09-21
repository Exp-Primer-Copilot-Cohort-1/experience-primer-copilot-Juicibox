// create web server

// create web server for comments
//=============

// import module
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Handle request
router.get('/', commentsController.getComments);
router.get('create', commentsController.createComment);
router.post('create', commentsController.postComment);
router.get('delete', commentsController.deleteComment);

// export router
module.exports = router;