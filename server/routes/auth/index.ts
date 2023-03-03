import express from 'express'
import { auth } from '../../middleware/auth'
import changePasswordCtrl from './change-password-ctrl'
import loginCtrl from './login-ctrl'
import meCtrl from './me-ctrl'
import permissionsCtrl from './permissions-ctrl'

const authRoutes = express.Router()
export default authRoutes

authRoutes.post('/change-password', auth, changePasswordCtrl)
authRoutes.post('/login', loginCtrl)
authRoutes.get('/me', auth, meCtrl)
authRoutes.get('/permissions', auth, permissionsCtrl)
