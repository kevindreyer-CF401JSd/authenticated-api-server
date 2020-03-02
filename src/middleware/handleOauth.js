const superagent = require('superagent')
const User = require('../models/users')

const { 
  GITHUB_CLIENT_ID_CODE,
  GITHUB_APP_CLIENT_SECRET,
  GITHUB_TOKEN_SERVER_URL,
  GITHUB_REMOTE_API_ENDPOINT,
  API_SERVER
} = process.env

// get a OAuth token with a code
async function exchangeCodeForToken (code) {
  const response = await superagent
    .post(GITHUB_TOKEN_SERVER_URL)
    .send({
      client_id: GITHUB_CLIENT_ID_CODE,
      client_secret: GITHUB_APP_CLIENT_SECRET,
      code: code,
      redirect_uri: API_SERVER,
      state: 'this is unguessable!'
    })
    return response.body.access_token
}

// get username with token
async function getRemoteUsername (token) {
  const response = await superagent
    .get(GITHUB_REMOTE_API_ENDPOINT)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app')
  return response.body.login
}

// get or create user in DB and create an auth JWT token
async function getUser (username) {
  const potentialUser = await User.findOne({ username })
  let user
  if (!potentialUser) {
    const newUser = new User({ username })
    user = await newUser.save()
  } else {
    user = potentialUser
  }
  const token = user.generateToken()
  return [user, token]
}

// OAuth the user
async function handleOauth (req, res, next) {
  try {
    const { code } = req.query
    console.log('(1) CODE:', code)
    const remoteToken = await exchangeCodeForToken(req.query.code)
    console.log('(2) ACCESS TOKEN:', remoteToken)
    const remoteUsername = await getRemoteUsername(remoteToken)
    console.log('(3) GITHUB USER:', remoteUsername)
    const [user, token] = await getUser(remoteUsername)
    req.user = user
    req.token = token
    console.log('(4a) LOCAL USER:', user)
    console.log('(4b) USER\'S JWT TOKEN:', { token })
    next()
  } catch (err) {
    next(`ERROR: ${err.message}`)
  }
}

module.exports = handleOauth