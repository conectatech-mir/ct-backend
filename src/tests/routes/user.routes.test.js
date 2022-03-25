const req = require('supertest')
const DB = require('../../config/db')
const app = require('../../app')
const User = require('../../models/user.model')
const { default: mongoose } = require('mongoose')

describe('User', () => {
  beforeAll(async () => {
    await DB.connect()
  })

  beforeEach(async () => {
    await DB.cleanup()
  })

  afterAll(async () => {
    await DB.disconnect()
  })

  it('should return and error when the user id does not exist', async () => {
    const id = new mongoose.Types.ObjectId()

    const res = await req(app).get('/api/users/getUserById/' + id)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body).toHaveProperty('errors[0].param', 'id')
  })

  it('should return user data when id exist', async () => {
    const user = await User.create({
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456'
    })

    const res = await req(app).get('/api/users/getUserById/' + user._id)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data.email).toBe(user.email)
  })
})