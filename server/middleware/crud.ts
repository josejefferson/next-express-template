import { badRequest } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import type { Model } from 'mongoose'
import { ObjectSchema } from 'yup'

// Retorna todos as entidades
export function readAll<T = any>(Model: Model<T>) {
  return async (req: Request, res: Response) => {
    const result = await Model.find()
      .select('+createdBy +updatedBy')
      .populate('createdBy updatedBy', 'name -_id')
    res.json(result)
  }
}

// Retorna uma entidade
export function read<T = any>(Model: Model<T>) {
  return async (req: Request, res: Response) => {
    const result = await Model.findById(req.params.id)
      .select('+createdBy +updatedBy')
      .populate('createdBy updatedBy', 'name -_id')
    if (result === null) throw badRequest('Esta entidade não existe')
    res.json(result)
  }
}

// Cria uma entidade
export function create<T = any>(Model: Model<T>) {
  return [
    createdBy,
    updatedBy,
    async (req: Request, res: Response) => {
      const result = await Model.create(req.body).catch((err) => {
        if (err.message.includes('duplicate key')) {
          throw badRequest('Já existe uma entidade com este nome')
        }
        throw err
      })
      res.json(result)
    }
  ]
}

// Atualiza uma entidade
export function update<T = any>(Model: Model<T>) {
  return [
    updatedBy,
    async (req: Request, res: Response) => {
      const result = await Model.findByIdAndUpdate(req.params.id, { $set: req.body }).catch(
        (err) => {
          if (err.message.includes('duplicate key')) {
            throw badRequest('Já existe uma entidade com este nome')
          }
          throw err
        }
      )
      if (result === null) throw badRequest('Esta entidade não existe ou foi removida')
      res.json(result)
    }
  ]
}

// Exclui uma entidade
export function remove<T = any>(Model: Model<T>) {
  return async (req: Request, res: Response) => {
    const result = await Model.findByIdAndDelete(req.params.id)
    if (result === null) throw badRequest('Esta entidade não existe ou já foi removida')
    res.json(result)
  }
}

// Injeta o campo createdBy
export function createdBy(req: Request, res: Response, next: NextFunction) {
  if (typeof req.body === 'object' && !Array.isArray(req.body)) {
    req.body.createdBy = req.user?.id
  }
  next()
}

// Injeta o campo updatedBy
export function updatedBy(req: Request, res: Response, next: NextFunction) {
  if (typeof req.body === 'object' && !Array.isArray(req.body) && req.user) {
    req.body.updatedBy = req.user?.id
  }
  next()
}

// Valida a requisição
export function validate(schema: ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validateSync(req.body)
      req.body = schema.cast(req.body, { stripUnknown: true })
      next()
    } catch (err: any) {
      throw badRequest('Dados inválidos: ' + err.message)
    }
  }
}
