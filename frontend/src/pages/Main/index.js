import React, { Component } from 'react';
import { Container } from './styles';
import Body from './components/Body';
import Header from './components/Header';

class Main extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Body />
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default Main