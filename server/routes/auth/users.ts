import bcrypt from 'bcrypt'
import express, { Request } from 'express'
import Users from '../../models/users'
import { auth } from '../../middleware/auth-middleware'
import { needPermission } from './permissions'
const userRoutes = express.Router()

// Retorna todos os usuários
userRoutes.get('/', auth, needPermission('*.users.read'), async (req, res) => {
  const result = await Users.find()
    .select('+createdBy +updatedBy')
    .populate('createdBy updatedBy', 'name -_id')
  res.json(result)
})

// Retorna um usuário
userRoutes.get('/:id', auth, needPermission('*.users.read'), async (req, res) => {
  const result = await Users.findById(req.params.id)
    .select('+createdBy +updatedBy')
    .populate('createdBy updatedBy', 'name -_id')
  res.json(result)
})

// Cria um usuário
userRoutes.post('/', auth, needPermission('*.users'), async (req, res) => {
  const data = Object.assign(req.body, { createdBy: req.user?.id, updatedBy: req.user?.id })
  const result = await Users.create(data)
  res.json(result)
})

// Modifica um usuário
userRoutes.put('/:id', auth, needPermission('*.users'), async (req, res) => {
  const data = Object.assign(req.body, { updatedBy: req.user?.id })
  if (!data.password) data.password = undefined
  if (data.password) data.password = bcrypt.hashSync(data.password, 10)
  const result = await Users.findByIdAndUpdate(req.params.id, data)
  res.json(result)
})

// Exclui um usuário
userRoutes.delete('/:id', auth, needPermission('*.users'), async (req, res) => {
  const result = await Users.findByIdAndDelete(req.params.id)
  res.json(result)
})

export default userRoutes
