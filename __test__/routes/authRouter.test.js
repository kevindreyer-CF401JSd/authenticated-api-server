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

const SECRET = "supersecretcodewordthatonlytheserverknows"

describe('Auth Router testing, roles and users', () => {
  Object.keys(roles).forEach(roleType => {
    describe(`${roleType} role`, () => {
      it('creates a role', () => {
        return mockRequest.post('/roles')
          .send(roles[roleType])
          .then(result => {
            expect(result).toBeDefined()
            expect(result.name).toEqual(roleType.name)
            expect(result.permissions).toEqual(roleType.permissions)
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
            expect(result.username).toEqual(userType.username)
            expect(result.role).toEqual(userType.role)
          })
      })
      it('user signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            resultTokenKey = JSON.parse(results.text).token
            expect(resultTokenKey).toBeDefined()
            // let token = jwt.verify(resultTokenKey, SECRET)
            // expect(token.username).toEqual(users[userType].username)
          })
      })
      it('user signin with bearer auth', () => {
        return mockRequest.get('/supersecret')
          .set('Authorization', `Bearer ${resultTokenKey}`)
          .then(results => {
            expect(results.statusCode).toBe(200);
            expect(results.type).toBe('application/json')
            expect(JSON.parse(results.text)[0].username).toEqual(users[userType].username)
          })
      })
    })
  })
  describe('the route get /roles', () => {
    it('returns our roles', () => {
      return mockRequest.get('/roles')
        .then(result => {
          expect(result).toBeDefined()
        })
    })
  })
  describe('the route get /users', () => {
    it('returns our users', () => {
      return mockRequest.get('/users')
        .then(result => {
          expect(result).toBeDefined()
        })
    })
  })

})