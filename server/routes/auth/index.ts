import express from 'express'
import { auth, optionalAuth } from '../../middleware/auth'
import { validate } from '../../middleware/crud'
import changePasswordCtrl from './change-password-ctrl'
import { changePasswordSchema } from './change-password-validation'
import loginCtrl from './login-ctrl'
import { loginSchema } from './login-validation'
import meCtrl from './me-ctrl'
import permissionsCtrl from './permissions-ctrl'

const authRoutes = express.Router()
export default authRoutes

authRoutes.post('/login', validate(loginSchema), loginCtrl)
authRoutes.get('/me', optionalAuth, meCtrl)
authRoutes.post('/change-password', auth, validate(changePasswordSchema), changePasswordCtrl)
authRoutes.get('/permissions', auth, permissionsCtrl)
