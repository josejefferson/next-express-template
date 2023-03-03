import express from 'express'
import { auth } from '../../middleware/auth-middleware'
import changePasswordCtrl from './change-password-ctrl'
import loginCtrl from './login-ctrl'
import { meCtrl } from './me-ctrl'
import { permissionsCtrl } from './permissions'
import userRoutes from '../users'
const router = express.Router()
export default router

router.post('/login', loginCtrl)
router.get('/me', auth, meCtrl)
router.post('/change-password', auth, changePasswordCtrl)
router.get('/permissions', auth, permissionsCtrl)
router.use('/users', userRoutes)
