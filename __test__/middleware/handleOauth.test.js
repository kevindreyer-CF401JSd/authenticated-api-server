const supergoose = require('@code-fellows/supergoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../src/app')
const mockRequest = supergoose(server)
const request = require('supertest');

const link = 'https://github.com/login/oauth/authorize?client_id=abafc20a153ff19f78b4&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth&scope=&state=this%20is%20unguessable!'

// describe('test the OAuth route', () => {
//   it('returns something', () => {
//     return mockRequest.get('/oauth')
//       .then(result => {
//         expect(result).toBeDefined()
//       })
//   })
// })