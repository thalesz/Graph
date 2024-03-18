import express from "express";
const router = express.Router()
import { getQuestoesDuvidasAlunos } from "../../controllers/duvidaQuestaoAlunoController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getQuestoesDuvidasAlunos)

module.exports = router;