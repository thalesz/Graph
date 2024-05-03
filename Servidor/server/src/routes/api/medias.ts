import express from "express";
const router = express.Router()
import { getAllMedias } from "../../controllers/medias";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllMedias)

module.exports = router; 