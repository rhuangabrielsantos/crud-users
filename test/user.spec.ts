import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test('when the user route is called, with post http method, should user has created', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/users')
      .send({
        name: 'Rhuan Gabriel',
        username: 'rhuanzito',
        password: 'secret'
      })

    const expectedMessage = 'User was created sucessfully'
    const expectedUser = await findUser(1)
    const expectedStatusCode = 201

    assert.equal(response.body.message, expectedMessage, 'The returned message is different')
    assert.deepEqual(response.body.user, expectedUser, 'The returned user is different')
    assert.equal(response.statusCode, expectedStatusCode, 'The returned status code is different')
  })

  test('when the user route is called, with get http method, should return all users', async (assert) => {
    const response = await supertest(BASE_URL).get('/users')

    const expectedUsers = await getAllUsers()
    const expectedStatusCode = 200

    assert.deepEqual(response.body, expectedUsers, 'The returned users are different')
    assert.equal(response.statusCode, expectedStatusCode, 'The returned status code is different')
  })

  test('when the user route is called, with put http method, should the specified user to be updated', async (assert) => {
    const id = 1
    
    const response = await supertest(BASE_URL)
      .put(`/users/${id}`)
      .send({
        name: 'Rhuan Gabriel',
        username: 'rhuangabrielsantos',
        password: 'secret'
      })

    const expectedMessage = 'User was updated sucessfully'
    const expectedUser = await findUser(id)
    const expectedStatusCode = 200

    assert.equal(response.body.message, expectedMessage, 'The returned message is different')
    assert.deepEqual(response.body.user, expectedUser, 'The returned user is different')
    assert.equal(response.statusCode, expectedStatusCode, 'The returned status code is different')
  })

  test('when the user route is called, with delete http method, should the specified user to be deleted', async (assert) => {
    const id = 1

    const user = await findUser(id)

    const response = await supertest(BASE_URL).delete(`/users/${id}`)

    const expectedMessage = `User ${user.username} has deleted`
    const expectedStatusCode = 200

    assert.equal(response.body.message, expectedMessage, 'The returned message is different')
    assert.equal(response.statusCode, expectedStatusCode, 'The returned status code is different')
  })
})

async function getAllUsers() {
  const users = await User.all()

  return users.map(user => {
    return user.toJSON()
  })
}

interface UserInterface {
  id: number,
  name: string,
  username: string,
  password: string,
  created_at: string,
  updated_at: string,
}

async function findUser(id: number): Promise<UserInterface> {
  const userModel = await User.findOrFail(id)

  const user = userModel.toJSON()

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    password: user.password,
    created_at: user.created_at,
    updated_at: user.updated_at 
  }
}