const jwt = require('jsonwebtoken')
const { server } = require('../../src/app')
const supergoose = require('@code-fellows/supergoose')
const mockRequest = supergoose(server)

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

describe('Auth Router testing', () => {
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

})