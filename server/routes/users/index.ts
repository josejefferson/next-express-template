import bcrypt from 'bcrypt'
import express from 'express'
import { auth } from '../../middleware/auth-middleware'
import { create, read, readAll, remove } from '../../middleware/crud'
import Users from '../../models/users'
import { needPermission } from '../auth/permissions'
const userRoutes = express.Router()

userRoutes.get('/', auth, needPermission('*.users.read'), readAll(Users))
userRoutes.get('/:id', auth, needPermission('*.users.read'), read(Users))
userRoutes.post('/', auth, needPermission('*.users'), create(Users))
userRoutes.delete('/:id', auth, needPermission('*.users'), remove(Users))

userRoutes.put('/:id', auth, needPermission('*.users'), async (req, res) => {
  const data = Object.assign(req.body, { updatedBy: req.user?.id })
  if (!data.password) data.password = undefined
  if (data.password) data.password = bcrypt.hashSync(data.password, 10)
  const result = await Users.findByIdAndUpdate(req.params.id, data)
  res.json(result)
})

export default userRoutes
