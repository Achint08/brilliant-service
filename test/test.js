const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

/* Connection to server
* Run the backend using `npm run start`
* Run mocha for black box testing now
*/
let server = supertest.agent("http://localhost:3000");

// Define/Initialize required variable for testing
let token = '';
let milliseconds = (new Date).getTime();
let id = '';
    
let user = {
  userName: 'Br' + milliseconds,
  firstName: 'Brilliant',
  lastName: 'Service',
  organizationId: 'BH',
  role: 'Test',
  email: 'brilliant@bh.com',
  password: 'BrilliantServiceTest'
}

/* 
* Testing route (/user/create)
*/
describe("User creation (/user/create)",function(){

  it("should create user on all details",function(done){

    server
    .post("/user/create")
    .send(user)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.message.should.equal('User created!');
      done();
    });
  });

  it("should not create user on empty userName",function(done){

    let test_user = {...user}
    delete test_user['userName'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid userName",function(done){
    let test_user = {...user}
    test_user['userName'] = 'B';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on empty firstName",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    delete test_user['firstName'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid firstName",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    test_user['firstName'] = 'ach';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid lastName",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    test_user['lastName'] = 'ach';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on empty lastName",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    delete test_user['lastName'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid organizationId",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    test_user['organizationId'] = 'B';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on empty organizationId",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    delete test_user['organizationId'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid role",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    test_user['role'] = 'S';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on empty role",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    delete test_user['role'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("should not create user on invalid email",function(done){

    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    test_user['email'] = 'aa';
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });
  
  it("should not create user on empty email",function(done){
  
    let milliseconds = (new Date).getTime();
    let test_user = {...user}
    test_user['userName'] = 'B' + milliseconds;
    delete test_user['email'];
    server
    .post("/user/create")
    .send(test_user)
    .expect("Content-type",/json/)
    .expect(412)
    .end(function(err,res){
      res.status.should.equal(412);
      res.body.success.should.equal(false);
      done();
    });
  });
});

/* 
* Testing route (/auth/login)
*/
describe("Authentication => Login (/auth/login)",function(){

  it("should authenticate user and return JWT Token",function(done){

    server
    .post("/auth/login")
    .send({username : user.userName, password: user.password})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.message.should.equal('Authenticated!');
      res.error.should.equal(false);
      token = res.body.data.access_token;
      
      
      done();
    });
  });

  it("should not authenticate on wrong username",function(done){

    let milliseconds = (new Date).getTime();

    server
    .post("/auth/login")
    .send({username : 'B' + milliseconds, password: user.password})
    .expect("Content-type",/json/)
    .expect(401)
    .end(function(err,res){
      
      res.status.should.equal(401);
      res.body.error.should.equal('Unauthorized');
      done();
    });
  });

  it("should not authenticate on wrong password",function(done){

    let milliseconds = (new Date).getTime();
    server
    .post("/auth/login")
    .send({username : user.userName, password: milliseconds})
    .expect("Content-type",/json/)
    .expect(401)
    .end(function(err,res){
      
      res.status.should.equal(401);
      res.body.error.should.equal('Unauthorized');
      done();
    });
  });

});

/* 
* Testing route (/auth/me)
*/
describe("Authentication => My Info (/auth/me)",function(){

  it("should authenticate user and return JWT Token",function(done){

    server
    .get("/auth/me")
    .set('Authorization', 'Bearer ' + token)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.message.should.equal('User Data returned!');
      res.error.should.equal(false);
      id = res.body.data.id;
      done();
    });
  });

  it("should not authenticate on wrong username/password",function(done){

    server
    .post("/auth/login")
    .send({username : 'Hello1', password: 'achint'})
    .expect("Content-type",/json/)
    .expect(401)
    .end(function(err,res){
      
      res.status.should.equal(401);
      res.body.error.should.equal('Unauthorized');
      done();
    });
  });

});

/* 
* Testing route (/user/[:id])
*/

describe("Get User Info By Id => (/user/[:id])",function(){

  it("should return user details for a given id",function(done){

    let user_details = {...user}
    delete user_details['password'];
    server
    .get("/user/" + id)
    .set('Authorization', 'Bearer ' + token)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){ 
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.message.should.equal('User found!');
      res.error.should.equal(false);
      res.body.data.should.deepEqual(user_details);
      done();
    });
  });

  it("should not return user details if id doesn't exist",function(done){

    
    let user_details = {...user}
    delete user_details['password'];
    server
    .get("/user/0")
    .set('Authorization', 'Bearer ' + token)
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      res.body.success.should.equal(false);
      res.body.message.error_message.should.equal('No user found!');
      done();
    });
  });
});
