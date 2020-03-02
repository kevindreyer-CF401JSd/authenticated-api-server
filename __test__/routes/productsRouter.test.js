const supergoose = require('@code-fellows/supergoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../src/app')
const mockRequest = supergoose(server)
const request = require('supertest');

let roles = {
  admin: { name: 'admin', permissions: ['read','create','update','delete'] },
  editor: { name: 'editor', permissions: ['read','create','update'] },
  user: { name: 'user', permissions: ['read'] },
}

let users = {
  admin1: { username: 'admin1', password: 'password', role: 'admin' },
  editor1: { username: 'editor1', password: 'password', role: 'editor' },
  user1: { username: 'user1', password: 'password', role: 'user' },
}

let products = {
  prod1: { name: 'pants' },
  prod2: { name: 'shirt' },
  prod3: { name: 'socks' },
}

const SECRET = "supersecretcodewordthatonlytheserverknows"

describe('Auth Router testing, roles and users', () => {
  Object.keys(roles).forEach(roleType => {
    describe(`${roleType} role`, () => {
      it('creates a role', () => {
        return mockRequest.post('/roles')
          .send(roles[roleType])
          .then(result => {
            expect(result).toBeDefined()
          })
      })
    })
  })
  Object.keys(users).forEach(userType => {
    let resultTokenKey
    describe(`${userType} user`, () => {
      it('creates a user', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(result => {
            expect(result).toBeDefined()
          })
      })
      it('user signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            resultTokenKey = JSON.parse(results.text).token
            expect(resultTokenKey).toBeDefined()
          })
      })
      it('create a product', () => {
        return mockRequest.post('/products')
          .set('Authorization', `Bearer ${resultTokenKey}`)
          .send({
            name: `${users[userType].username} product`,
          })
          .then(results => {
            if(users[userType].username === 'user1') {
              expect(results.statusCode).toBe(500)
            } else {
              expect(results.statusCode).toBe(200)
            }
          })
      })
    })
  })
})