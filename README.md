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
  - `http -a test2:password post :3000/signin`
  - `http get :3000/supersecret 'Authorization:Bearer <Encoded JSON Web Token>'`
- roles
  - `http post :3000/roles name=admin permissions:='["read","create","update","delete"]'`
  - `http post :3000/roles name=user permissions:='["read"]'`
  - `http get :3000/roles`
- products
  - `http get :3000/products 'Authorization:Bearer <user token with acl permissions for route>'`
  - `http post :3000/products name="smartphone" 'Authorization:Bearer <user token with acl permissions for route>'`
  - `http put :3000/products/<product id> <field name>=<new field value>'Authorization:Bearer <user token with acl permissions for route>'`

- permissions
 - `http get :3000/products 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMwODQ5NzEsImV4cCI6MTU4MzA4ODU3MX0._W-Xj9NYi24DerqXBrGKzDqDoIchZyaXWyHZYeGoNGA'`
 - `http post :3000/products name="smartphone" 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMwODQ5NzEsImV4cCI6MTU4MzA4ODU3MX0._W-Xj9NYi24DerqXBrGKzDqDoIchZyaXWyHZYeGoNGA'`

- token
- `http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWIwZWMzMThlMmUxNDI4NjE5ODUxZCIsInVzZXJuYW1lIjoidGVzdDEiLCJ1c2VyVmFsaWQiOnRydWUsImlhdCI6MTU4MzAyNTg1OSwiZXhwIjoxNTgzMDI5NDU5fQ.kA95K1xlCLed70m1Xnm39taS1yKyu36OLPQWB51yZRE'`

test1: user role
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmMzZhMGNlMzJlNGYyOWVjYTc5NiIsInVzZXJuYW1lIjoidGVzdDEiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpYXQiOjE1ODMwOTE1NjIsImV4cCI6MTU4MzA5NTE2Mn0.l1EH6e3jdhgwSvtjPGlcMUIYf5H7VbresFDNQzT9kdc`

test2: editor role
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMwOTQ1MDEsImV4cCI6MTU4MzA5ODEwMX0.oI6Hh8Tbq9YG2PWZT5doAmu3rT-6ViduMXj0X3opKH4`