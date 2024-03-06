import express from "express";
const router = express.Router()
import { getAllSimuladosByIdTurma } from "../../controllers/simuladosController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllSimuladosByIdTurma)

module.exports = router;