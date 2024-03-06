import express from "express";
const router = express.Router()
import { getAllDisciplina } from "../../controllers/disciplinaController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllDisciplina)

module.exports = router;