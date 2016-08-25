global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                res.body.should.be.a('object');
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans', _id: '57bd1593d8cd9fe199ccee0f'},
                        {name: 'Tomatoes', _id: '57bd1593d8cd9fe199ccee10'},
                        {name: 'Peppers', _id: '57bd1593d8cd9fe199ccee11'}, function(err) {
                console.log(err, 'arguments');
                done();
            });
        });
    });
    it('should edit an item on put given an id', function(done) {
        chai.request(app)
            .put('/items/57bd1593d8cd9fe199ccee0f')
            .send({'name': 'White beans', 'id': '57bd1593d8cd9fe199ccee0f'})
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('White beans');
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans', _id: '57bd1593d8cd9fe199ccee0f'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function(err) {
                console.log(err, 'arguments');
                done();
            });
        });
    });
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/57bd1593d8cd9fe199ccee0f')
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(201);
                res.should.be.json;
                res.body.name.should.equal('Broad beans');
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

// describe('Shopping List', function() {
//     before(function(done) {
//         server.runServer(function() {
//             Item.create({name: 'Broad beans'},
//                         {name: 'Tomatoes'},
//                         {name: 'Peppers'}, function() {
//                 done();
//             });
//         });
//     });
//     it('should not add an already existing item on post', function(done) {
//         chai.request(app)
//             .post('/items')
//             .send({'name': 'Peppers'})
//             .end(function(err, res) {
//                 res.should.have.status(500);
//                 done();
//             });
//     });
//     after(function(done) {
//         Item.remove(function() {
//             done();
//         });
//     });
// });

// describe('Shopping List', function() {
//     before(function(done) {
//         server.runServer(function() {
//             Item.create({name: 'Broad beans'},
//                         {name: 'Tomatoes'},
//                         {name: 'Peppers'}, function() {
//                 done();
//             });
//         });
//     });
//     it('should not post to an id that already exists', function(done) {
//         chai.request(app)
//             .post('/items')
//             .send({'name': 'Mangos', 'id': 1})
//             .end(function(err, res) {
//                 res.should.have.status(400);
//                 done();
//             });
//     });
//     after(function(done) {
//         Item.remove(function() {
//             done();
//         });
//     });
// });

// describe('Shopping List', function() {
//     before(function(done) {
//         server.runServer(function() {
//             Item.create({name: 'Broad beans'},
//                         {name: 'Tomatoes'},
//                         {name: 'Peppers'}, function() {
//                 done();
//             });
//         });
//     });
//     it('should not post without body data', function(done) {
//         chai.request(app)
//             .post('/items')
//             .send({})
//             .end(function(err, res) {
//                 res.should.have.status(400);
//                 res.body.should.not.have.property('name');
//                 done();
//             });
//     });
//     after(function(done) {
//         Item.remove(function() {
//             done();
//         });
//     });
// });

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should not put without an id in the end point', function(done) {
        chai.request(app)
            .put('/items')
            .send({'name': 'blue berries'})
            .end(function(err,res) {
                res.should.have.status(404);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans', _id: '57bd1593d8cd9fe199ccee0f'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should not put with different id in the endpoint than the body', function(done) {
        chai.request(app)
            .put('/items/57bd1593d8cd9fe199ccee0f')
            .send({'name': 'kidney beans', '_id': 1})
            .end(function(err,res) {
                res.should.have.status(400);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should not put to an id that does not exist', function(done) {
        chai.request(app)
            .put('/items/10')
            .send({'name': 'watermelon', 'id': 10})
            .end(function(err,res) {
                res.should.have.status(400);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should not delete an id that does not exist', function(done) {
        chai.request(app)
            .delete('/items/8')
            .end(function(err,res) {
                res.should.have.status(500);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    it('should not delete without an id in the endpoint', function(done) {
        chai.request(app)
            .delete('/items/')
            .end(function(err,res) {
                res.should.have.status(404);
                done();
            });
    });
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

