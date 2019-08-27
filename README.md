## Brilliant Service

Brilliant service provides authentication system for users handled using Passport  local and JWT strategy authentication built using:

* [Typescript](https://typescriptlang.org)
* [Nest](https://github.com/nestjs/nest)
* [TypeORM](https://github.com/typeorm/typeorm)
* [Express](https://expressjs.com/en/guide/routing.html)
* [MySQL](https://www.mysql.com)
* [Mocha](https://mochajs.org/) - for black box API testing

## Installation

Install Node modules using :

```bash
$ npm install
```

Checkout installation guide for MySQL [here](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04).

## Running the app

Create a database named ```users``` using ```root``` user and update configurations on [ormconfig.json](./ormconfig.json) file.
```bash

# start mysql server
$ sudo service mysql start

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## APIs

### /auth/login

Purpose: To login the application using passport strategy

Method: 
```js
POST
```
Headers:
```js
Content-type: application/json
```
Body:
```js
{
  username: user,
  password: pass
}
```

### /auth/me

Purpose: To get details of the user. Uses JWT strategy to authenticate user.

Method: 
```js
GET
```
Headers:
```js
Content-type: application/json
Authorization : Bearer auth_token
```

### /user/create

Purpose: To create user with the details provided in body

Method: 
```js
POST
```
Headers:
```js
Content-type: application/json
```
Body:
```js
{
  userName: user, // string, unique, required, 4-20 chars
  password: pass, //string, required, 4-100 chars
  firstName: first, //string, required, 4-20 chars
  lastName: last, //string, required, 4-20 chars
  organizationId: oid, //string, required, 2-20 chars
  role: role //string, required, 4-20 chars
}
```
### /user/:id

Purpose: To get user details based on id

Path Params:

```js
id : 1 // number
```

Method: 
```js
GET
```
Headers:
```js
Content-type: application/json
Authorization : Bearer auth_token
```



## Test

Run the application using steps above and then unit testing can be done using following steps:

```bash
# unit tests
$ npm install -g mocha
$ mocha

```

## Thought Process

* My first thought was to transform the code into a much modular approach, something like Angular. I personally prefer Typescript over Javascript because of its object oriented nature and modular support so used it.

* I first developed the [service](https://github.com/Achint08/brilliant) without any framework but that didn't had a much cleaner and structured architecture as I wanted it to be as an enterprise grade application. It was then I came across Nest. As the Nest Documentation states, Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications.

* During the developement hours, when I  looked at the assignment code, I realized that there were certain glitches which could have been resolved for a efficient working of the code. There could be much more focus on code readibility for easing life of future developers and saving development costs. The code level scalability could be improved in a sense that if a new requirements comes, in how much of a change, we can adapt to that requirement.

* In an enterprise-grade application, it is a must to keep security on priority. There are certain middlewares and encryption used to avoid and save from attacks like brute force, phising from hackers, password stealing.

* The code contains comments wherever required to explain the purpose of functions, classes and its methods, and so that documents can be easily created.

* The focus was also for correct use of HTTP Standards so as to facilitate the work and clear API definitions and policy for other services which might use the brilliant authentication service.

* The database schema and validation is adjusted to cover up maximal correct user data points. The black box testing meticuluously test each of the case for validation.

* Use of passport strategy(username/password) strategy and JWT strategy is used so that autheticated users of client side applications can connect securely with server.

* The dependency framework injection remove the dependency by separating the usage from the creation of the object. This reduces the amount of required boilerplate code and improves flexibility. This help a long way to reduce occupied memory and lesser code. The current application takes these advantage from this featured framework.

* The focus was also for proper logging mechanism to catch and debug the root cause of any issue faced by system using standardized Logger and use of correct levels so that different log streams can be created in future. Currently, stream is set to ```console```.

* The focus was also for handling exception wherever possible to avoid server crash and use of logging to understand the reason for exception by trace backing the stack.

* The end to end black box API testing clearly abstracts the policy from the mechanism of API. The testing clearly tests if the API policy is maintained. If in future, any changes to mechanism of API is done, the testing would help test the policy.