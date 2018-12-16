import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import NavBar from './components/NavBar';
import Subscribe from './components/Subscribe';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Subscribe />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
