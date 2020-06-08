import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
let _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Imdvb2dsZSI6ZmFsc2UsInJvbCI6IkFETUlOIiwiZWxpbWluYWRvIjpmYWxzZSwiZmVjaGFDcmVhY2lvbiI6IjIwMjAtMDQtMDVUMDA6NTk6NDUuODUwWiIsIl9pZCI6IjVlODkyZDgxMzFmYzYyMTlkY2Y5MmY3YSIsIm5vbWJyZSI6Im1oYXJ0eW4gYWRtIiwiZW1haWwiOiJ1c2VyMDhAaG90bWFpbC5jb20iLCJfX3YiOjAsImltZyI6IjVlODkyZDgxMzFmYzYyMTlkY2Y5MmY3YS04NzIuanBnIiwiZmVjaGFNb2RpZmljYWNpb24iOiIyMDIwLTA1LTAzVDE2OjA3OjEwLjQ0N1oiLCJ1c3VhcmlvTW9kaWZpY2FjaW9uIjoiNWU4OTJkODEzMWZjNjIxOWRjZjkyZjdhIn0sImlhdCI6MTU5MTY1NzM4MSwiZXhwIjoxNTkxNjYwOTgxfQ.dTNcGmC27DvFj_7i8XAnZexRz7o-9tg03d-WKH8-WA0';

describe('Prueba maestros', () => {

  /* beforeEach(() => {
    chai.request(app).post('login')
    .send({'email': 'user08@hotmail.com', 'password': '123456'})      
      .then(res => {
        chai.expect(res).to.have.status(200);
        let resJSON = JSON.parse(res.text);
        _token = resJSON.token;
        //chai.expect(res.body).to.have.statusCode(200);        
      })
  }); */

  it('Get /maestros/grupos', () => {
    return chai.request(app)
      .get('/maestros/tipo?orden=nombre')
      .set("auth", _token)
      .then(res => {
        chai.expect(res).to.have.status(200);
        //chai.expect(res.body).to.have.statusCode(200);
      })
    })
});