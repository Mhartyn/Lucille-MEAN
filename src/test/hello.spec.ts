import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
  it('prueba de respuesta', () => {
    return chai.request(app).get('/hello')
    .then(res => {
        expect(res.text).to.eql('"hello"');
      })
    })
});