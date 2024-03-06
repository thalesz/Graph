import express from "express";
const router = express.Router()
import { getAllMediaPondGrupo } from "../../controllers/mediaPondGrupoController";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllMediaPondGrupo)

module.exports = router;