import express from "express";
const router = express.Router()
import {handleLogin} from '../controllers/authController';

router.post('/', handleLogin)


module.exports = router;