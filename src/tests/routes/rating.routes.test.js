const req = require('supertest')
const jwt = require('jsonwebtoken')
const DB = require('../../config/db')
const app = require('../../app')
const User = require('../../models/user.model')
const Rating = require('../../models/rating.model')
const Post = require('../../models/post.model')
const { default: mongoose } = require('mongoose')

describe('Rating', () => {
  const userId = new mongoose.Types.ObjectId()

  const userOne = {
    _id: userId,
    firstName: 'Homero',
    lastName: 'Simpson',
    email: 'homero@mail.com',
    password: '123456',
    token: jwt.sign({ email: 'homero@mail.com', id: userId }, process.env.SECRET_KEY || 'secret', { expiresIn: '1h' }),
  }

  beforeAll(async () => {
    await DB.connect()
  })

  beforeEach(async () => {
    await DB.cleanup()

    const user = new User(userOne)
    await user.save()
  })

  afterAll(async () => {
    await DB.disconnect()
  })

  it('should create rating', async () => {
    const user = await User.create({
      firstName: 'Homero',
      lastName: 'Simpson',
      email: 'homero@mail.com',
      password: '123456'
    })

    const professional = await User.create({
      firstName: 'Marge',
      lastName: 'Simpson',
      email: 'marge@mail.com',
      password: '123456',
      rol: 'PROFESSIONAL',
    })

    const post = await Post.create({
      title: 'Post title',
      body: 'Post description',
      user: user._id,
    })

    const res = await req(app).post('/api/ratings')
      .send({
        user: user._id,
        professional: professional._id,
        post: post._id,
        body: 'Awesome work!!',
        value: 4
      })
      .set('Authorization', `Bearer ${userOne.token}`)

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe('Rating created successfully')
    expect(await Rating.find().count()).toBe(1)
  })
})