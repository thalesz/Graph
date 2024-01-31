const registerController = require('../controllers/registerController');
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.post('/', registerController.handleNewUser);

module.exports = router;