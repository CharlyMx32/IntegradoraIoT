import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';

export default class RegistrosController {

  async index({}: HttpContext) {
    const usuarios = await User.all()
    return usuarios
  }

  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {

    const { email, password, imagen_perfil } = request.all()

    const usuario = { email, password, imagen_perfil }

    const user = await User.create(usuario)

    return response.status(201).json(user)

  }

  async show({ params }: HttpContext) {
    const { id } = params
    const user = await User.find(id)
    return user
  }

  async update({ params, request }: HttpContext) {

    const { id } = params
    const { email, password, imagen_perfil } = request.all()

    const usuario = { email, password, imagen_perfil }

    const user = await User.find(id)

    user?.merge(usuario)

    await user?.save()

    return user

  }

  async destroy({ params }: HttpContext) {
    const { id } = params
    const user = await User.find(id)
    await user?.delete()
    return user
  }
}