# authenticated-api-server
Fully functional, authenticated and authorized API Server


## Requirements
- [x] - API routes protected with proper permisssions based on user capability using Bearer Authentication and an ACL
  - [x] - `app.get(...)` require authentication only, no specific roles
  - [x] - `app.post(...)` require the *create* permission
  - [x] - `app.put(...)` require the *update* permission
  - [ ] - `app.patch(...)` require the *update* permission
  - [x] - `app.delete(...)` require the *delete* permission
- [x] - Auth Middleware
- [x] - Auth Model
- [ ] - Stretch Goals
  - [ ] - turn on and off authorization and authentication with env variable
- [ ] - Testing, 100% test coverage
  - [ ] - Auth router
    - [x] - Signup
    - [x] - Signin
  - [x] - Model Finder Middleware
  - [x] - Auth Middleware, protected Routes
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
  - `http put :3000/products/<product id> <field name>=<new field value> 'Authorization:Bearer <user token with acl permissions for route>'`
  - `http delete :3000/products/<product id> 'Authorization:Bearer <user token with acl permissions for route>'`

- permissions
 - `http get :3000/products 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMwODQ5NzEsImV4cCI6MTU4MzA4ODU3MX0._W-Xj9NYi24DerqXBrGKzDqDoIchZyaXWyHZYeGoNGA'`
 - `http post :3000/products name="smartphone" 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMwODQ5NzEsImV4cCI6MTU4MzA4ODU3MX0._W-Xj9NYi24DerqXBrGKzDqDoIchZyaXWyHZYeGoNGA'`

- token decode
- `http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWIwZWMzMThlMmUxNDI4NjE5ODUxZCIsInVzZXJuYW1lIjoidGVzdDEiLCJ1c2VyVmFsaWQiOnRydWUsImlhdCI6MTU4MzAyNTg1OSwiZXhwIjoxNTgzMDI5NDU5fQ.kA95K1xlCLed70m1Xnm39taS1yKyu36OLPQWB51yZRE'`

test1: user role pw:password
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmMzZhMGNlMzJlNGYyOWVjYTc5NiIsInVzZXJuYW1lIjoidGVzdDEiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCJdLCJpYXQiOjE1ODMwOTE1NjIsImV4cCI6MTU4MzA5NTE2Mn0.l1EH6e3jdhgwSvtjPGlcMUIYf5H7VbresFDNQzT9kdc`

test2: editor role pw:password
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNWFiMGNlMzJlNGYyOWVjYTc5OSIsInVzZXJuYW1lIjoidGVzdDIiLCJ2YWxpZCI6dHJ1ZSwicGVybWlzc2lvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJpYXQiOjE1ODMxMTI1NjQsImV4cCI6MTU4MzExNjE2NH0.BKBwQOGxeg4YaIYzeoOnyVJ25tuo7dKIjF2TqB4g9RU`

testadmin: admin role pw:password
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWJmNTQ3MGNlMzJlNGYyOWVjYTc5NyIsInVzZXJuYW1lIjoidGVzdGFkbWluIiwidmFsaWQiOnRydWUsInBlcm1pc3Npb25zIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNTgzMDk5NDkwLCJleHAiOjE1ODMxMDMwOTB9.CqtqPacpEetOKdBRMspCSPmsNdkOx0hXhAgj8zgw1b0`

## Resources
[https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html](https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html)
[https://hackernoon.com/api-testing-with-jest-d1ab74005c0a](https://hackernoon.com/api-testing-with-jest-d1ab74005c0a)



### Git error 
```
Kevins-MBP:authenticated-api-server kevindreyer$ git push origin test
error: src refspec test does not match any
error: failed to push some refs to 'https://github.com/kevindreyer-CF401JSd/authenticated-api-server.git'
```
