import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UserController {
  public async index () {
    return await User.all()
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()

    return await User.findOrFail(id)
  }

  public async store ({ request, response }: HttpContextContract) {
    const { name, username, password } = request.only(['name', 'username', 'password'])

    const user = await User.create({
      name,
      username,
      password
    })

    response.status(201)
    response.json({
      message: 'User was created sucessfully',
      user
    })
  }

  public async update ({ request }: HttpContextContract) {
    const { id } = request.params()
    const { name, username, password } = request.only(['name', 'username', 'password'])

    const user = await User.findOrFail(id)

    await user
      .merge({ name, username, password, updatedAt: DateTime.local() })
      .save()

    return {
      message: 'User was updated sucessfully',
      user
    }
  }

  public async destroy ({ request }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    await user.delete()

    return {
      'message': `User ${user.username} has deleted`
    }
  }
}
