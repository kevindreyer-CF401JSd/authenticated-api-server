# authenticated-api-server
Fully functional, authenticated and authorized API Server


## Requirements
- [ ] - API routes protected with proper permisssions based on user capability using Bearer Authentication and an ACL
  - [ ] - `app.get(...)` require authentication only, no specific roles
  - [ ] - `app.post(...)` require the *create* permission
  - [ ] - `app.put(...)` require the *update* permission
  - [ ] - `app.patch(...)` require the *update* permission
  - [ ] - `app.delete(...)` require the *delete* permission
- [x] - Auth Middleware
- [x] - Auth Model
- [ ] - Stretch Goals
  - [ ] - turn on and off authorization and authentication with env variable
- [ ] - Testing, 100% test coverage
  - [ ] - Auth router
    - [ ] - Signup
    - [ ] - Signin
  - [ ] - Model Finder Middleware
  - [ ] - Auth Middleware, protected Routes
  - [ ] - OAuth Chooser
  - [ ] - API Routes


## Access Control Roles
- read
- create
- update
- delete

## Route testing

- users
  - `http get :3000/users`
  - `http post :3000/signup username=test1 password=password role=user`
  - `http -a test2:password get :3000/signin`
  - `http get :3000/supersecret 'Authorization:Bearer <Encoded JSON Web Token>'`
- roles
  - `http post :3000/roles name=admin permissions:='["read","create","update","delete"]'`
  - `http post :3000/roles name=user permissions:='["read"]'`
  - `http get :3000/roles`

- `http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWIwZWMzMThlMmUxNDI4NjE5ODUxZCIsInVzZXJuYW1lIjoidGVzdDEiLCJ1c2VyVmFsaWQiOnRydWUsImlhdCI6MTU4MzAyNTg1OSwiZXhwIjoxNTgzMDI5NDU5fQ.kA95K1xlCLed70m1Xnm39taS1yKyu36OLPQWB51yZRE'`

test1: 
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWIwZWMzMThlMmUxNDI4NjE5ODUxZCIsInVzZXJuYW1lIjoidGVzdDEiLCJ1c2VyVmFsaWQiOnRydWUsImlhdCI6MTU4MzAyNTg1OSwiZXhwIjoxNTgzMDI5NDU5fQ.kA95K1xlCLed70m1Xnm39taS1yKyu36OLPQWB51yZRE`

test2: 
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWIxY2JhNmZhNjY5NDNlM2QwMDI2ZiIsInVzZXJuYW1lIjoidGVzdDIiLCJ1c2VyVmFsaWQiOnRydWUsImlhdCI6MTU4MzAyOTQzNCwiZXhwIjoxNTgzMDMzMDM0fQ.xcJdPPr8N_wKdEx5k3gHRXT-LEEdoNqLwtSlCLnQBfU`