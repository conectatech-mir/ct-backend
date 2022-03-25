const req = require('supertest')
const DB = require('../../config/db')
const app = require('../../app')
const User = require('../../models/user.model')

describe('Auth', () => {
  beforeAll(async () => {
    await DB.connect()
  })

  beforeEach(async () => {
    await DB.cleanup()
  })

  afterAll(async () => {
    await DB.disconnect()
  })

  it('should not create user if the email is not sent or is not a valid email', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
    }

    const res = await req(app).post('/api/auth/register').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(1)
    expect(res.body).toHaveProperty('errors[0].param', 'email')
  })

  it('should not create a user if the first or last name is empty or has less than 3 letters', async () => {
    const user = {
      email: 'homero@mail.com',
      password: '123456',
    }

    const res = await req(app).post('/api/auth/register').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors')
  })

  it('should not create a user if the email used already exists', async () => {
    const user = {
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456',
    }

    await req(app).post('/api/auth/register').send(user)

    const res = await req(app).post('/api/auth/register').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body).toHaveProperty('errors[0].msg', 'E-mail already in use')
  })

  it('should not create a user if the password is less than 6 characters ', async () => {
    const user = {
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '12345',
    }

    const res = await req(app).post('/api/auth/register').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body).toHaveProperty('errors[0].msg', 'Password must be at least 6 chars long')
  })

  it('should create the user if the provided data is correct', async () => {
    const user = {
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456',
    }

    const res = await req(app).post('/api/auth/register').send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe('User has been created successfully')
    expect(await User.find().count()).toBe(1)
  })

  it('should log in if the credentials are correct', async () => {
    const user = {
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456',
    }

    await req(app).post('/api/auth/register').send(user)

    const res = await req(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('User logged in successfully')
    expect(res.body.data).toHaveProperty('token')
  })

  it('should not log in if the details are incorrect', async () => {
    const user = {
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456',
    }

    await req(app).post('/api/auth/register').send(user)

    const res = await req(app).post('/api/auth/login').send({
      email: user.email,
      password: 'fakepassword',
    })

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('errors[0].param', 'password')
  })
})