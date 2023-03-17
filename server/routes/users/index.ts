import express from 'express'
import { create, read, readAll, remove, update, validate } from '../../middleware/crud'
import { needPermission } from '../../middleware/permissions'
import Users from '../../models/users'
import { userPostSchema, userPutSchema } from './validation'

const usersRoutes = express.Router()
export default usersRoutes

usersRoutes.get('/', needPermission('*.users.read'), readAll(Users))
usersRoutes.get('/:id', needPermission('*.users.read'), read(Users))
usersRoutes.post('/', needPermission('*.users'), validate(userPostSchema), create(Users))
usersRoutes.put('/:id', needPermission('*.users'), validate(userPutSchema), update(Users))
usersRoutes.delete('/:id', needPermission('*.users'), remove(Users))
