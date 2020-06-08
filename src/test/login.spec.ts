import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
let token = '';

describe('Prueba login', () => {
  it('Post login', () => {
    return chai.request(app)
      .post('/login')
      .send({'email': 'user08@hotmail.com', 'password': '123456'})      
      .then(res => {
        chai.expect(res).to.have.status(200);
        let resJSON = JSON.parse(res.text);
        token = resJSON.token;
        //chai.expect(res.body).to.have.statusCode(200);
      })
    })

    it('Post login, usuario no existe', () => {
      return chai.request(app)
        .post('/login')
        .send({'email': 'user77@hotmail.com', 'password': '123456'})      
        .then(res => {
          chai.expect(res).to.have.status(503);          
        })
    })

    it('Post login, usuario desactivado', () => {
      return chai.request(app)
        .post('/login')
        .send({'email': 'user07@hotmail.com', 'password': '123456'})      
        .then(res => {
          chai.expect(res).to.have.status(503);          
        })
    })

    it('Post login, contraseña invalida', () => {
      return chai.request(app)
        .post('/login')
        .send({'email': 'user08@hotmail.com', 'password': '12345'})      
        .then(res => {
          chai.expect(res).to.have.status(503);          
        })
    })

    it('Post login, usuario google', () => {
      return chai.request(app)
        .post('/login')
        .send({'email': 'mhartynpaez@gmail.com', 'password': '12345'})      
        .then(res => {
          chai.expect(res).to.have.status(504);          
        })
    })
});
