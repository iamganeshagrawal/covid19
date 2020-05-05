import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap';
import './app.css'
import Global from './Global';
import Country from './Country'
import Prevention from './Prevention'

// Disabling console.log() 
window.console.log = () => {}

function App() {
  return (
    <>
     <Container fluid className="header">
        <h1><span>C</span>OVID-19</h1>
      </Container>
      <Container fluid>
        <Row>
          <Col md={6} >
            <Global />
          </Col>
          <Col md={6} >
            <Country />
          </Col>
        </Row>
        <Prevention />
      </Container>
      <Container fluid className="footer mt-4 mb-2 text-muted">
        <span>Design with <span className="heart"></span> By <a href="https://instagram.com/thelocalcoder">Ganesh Agrawal</a></span>
      </Container>
    </>
  );
}

export default App;
