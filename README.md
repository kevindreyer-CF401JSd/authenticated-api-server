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
  - `http put :3000/products/<product id> <field name>=<new field value> 'Authorization:Bearer <user token with acl permissions for route>'`
  - `http delete :3000/products/<product id> 'Authorization:Bearer <user token with acl permissions for route>'`

- permissions
 - `http get :3000/products 'Authorization:Bearer <>`
 - `http post :3000/products name="smartphone" 'Authorization:Bearer <>`

- token decode
- `http get :3000/supersecret 'Authorization:Bearer <>`

## Resources
[https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html](https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html)
[https://hackernoon.com/api-testing-with-jest-d1ab74005c0a](https://hackernoon.com/api-testing-with-jest-d1ab74005c0a)



### Swagger docs
[Autogenerating Swagger Documentation with Node & Express](https://www.youtube.com/watch?v=apouPYPh_as&t)
swagger-jsdoc
swagger-ui-dist
swagger-ui-express