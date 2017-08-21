import React, { Component } from 'react';
import { Col, Input, Row } from 'react-materialize';
import forge from 'node-forge';

import { EmptyCol, InputBox, OutputBox } from './components';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      password: '',
      output: ''
    };

    this.changeInput = this.changeInput.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeInput(e) {
    this.setState({input: e.target.value});

    if(this.state.password && e.target.value) {
      this.updateOutput(e.target.value, this.state.password);
    }
  }

  changePassword(e) {
    this.setState({password: e.target.value});

    if(this.state.input && e.target.value) {
      this.updateOutput(this.state.input, e.target.value);
    }
  }

  updateOutput(input, password) {
    const temp = password.repeat(3);

    const key = forge.md.md5.create()
      .update(temp.slice(0,temp.length/2)).digest().toHex();

    const iv = forge.md.md5.create()
      .update(temp.slice(temp.length/2)).digest().toHex();

    var cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(input)));
    cipher.finish();

    this.setState({output: forge.util.encode64(cipher.output.getBytes())});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Easy AES Calculator</h2>
        </div>
        <Row>
          <Col s={4} className="input-box">
            <InputBox value={this.state.input} onChange={this.changeInput} />
          </Col>
          <EmptyCol />
          <Col s={2}>
            <Input type="password" onChange={this.changePassword} />
          </Col>
          <EmptyCol />
          <Col s={4} className="output-box">
            <OutputBox value={this.state.output} />
          </Col>
        </Row>
      </div>
    );
  }

}

export default App;
