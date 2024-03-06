import express from "express";
const router = express.Router()
import { getAllTurmas } from "../../controllers/turmasController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllTurmas)

module.exports = router;