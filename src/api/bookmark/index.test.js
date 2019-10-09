import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Bookmark } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, bookmark

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  bookmark = await Bookmark.create({ user })
})

test('POST /bookmarks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, news: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.news).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /bookmarks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bookmarks 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /bookmarks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bookmarks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bookmark.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookmark.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /bookmarks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${bookmark.id}`)
  expect(status).toBe(401)
})

test('GET /bookmarks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /bookmarks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${bookmark.id}`)
    .send({ access_token: userSession, news: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookmark.id)
  expect(body.news).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /bookmarks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bookmark.id}`)
    .send({ access_token: anotherSession, news: 'test' })
  expect(status).toBe(401)
})

test('PUT /bookmarks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bookmark.id}`)
  expect(status).toBe(401)
})

test('PUT /bookmarks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, news: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bookmarks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bookmark.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /bookmarks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bookmark.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /bookmarks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bookmark.id}`)
  expect(status).toBe(401)
})

test('DELETE /bookmarks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
