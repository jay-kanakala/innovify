//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    before((done) => { 
        // before running the tests
              
        done();  
    });

    /*
    * Test the /GET route
    */
    describe('/', () => {
        it('it should display the homepage message object', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.have.property('text').eql('{"message":"Welcome to innovify User management"}');
                done();
            });
        });
    });

});