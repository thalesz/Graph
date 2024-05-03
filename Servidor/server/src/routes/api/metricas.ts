import express from "express";
const router = express.Router()
import { getAllMetricas } from "../../controllers/metricas";
import { verifyRoles } from "../../middleware/verifyRoles";
const ROLES_LIST = require('../../config/role_list')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllMetricas)

module.exports = router; 