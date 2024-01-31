import express from "express";
const router = express.Router()
import { getAllUsers } from "../../controllers/usersController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)


module.exports = router;