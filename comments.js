// create web server
// 1. import express
const express = require('express')
// 2. create express object
const app = express()
// 3. create router
const router = express.Router()
// 4. import data
const comments = require('../data/comments')
// 5. import uuid
const { v4: uuidv4 } = require('uuid');
