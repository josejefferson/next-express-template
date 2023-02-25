import bcrypt from 'bcrypt'
import mongoose, { Document, Schema, Types } from 'mongoose'
import log from '../helpers/log'
import { can } from '../routes/auth/permissions'

export interface IUser extends Document {
  name: string
  photo?: string
  username: string
  password: string
  permissions: string[]
  requirePasswordChange?: boolean
  createdBy?: Types.ObjectId
  updatedBy?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  validatePassword: (data: string) => boolean
  hasPermission: (permissions: string[]) => boolean
}

const schema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    photo: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    permissions: { type: [String], required: true },
    requirePasswordChange: { type: Boolean },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users', select: false },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Users', select: false }
  },
  { timestamps: true }
)

schema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  if (this.password === '') return next()
  try {
    this.password = bcrypt.hashSync(this.password, 10)
    return next()
  } catch (err: any) {
    return next(err)
  }
})

schema.methods.validatePassword = async function (data: string) {
  return bcrypt.compare(data, this.password)
}

schema.methods.hasPermission = async function (permissions: string[]) {
  return can(this.permissions || [], permissions)
}

const Users = mongoose.model('Users', schema)

Users.countDocuments().then(async (count) => {
  if (count !== 0) return
  log(
    'INFO',
    undefined,
    'MongoDB: Nenhum usuário encontrado, criando um administrador...\nLogin: admin\nSenha: admin'
  )
  const password = 'admin'
  Users.create({ name: 'Admin', username: 'admin', password, permissions: ['*'] })
})

export default Users
