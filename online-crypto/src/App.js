import React, { Component } from 'react';
import { Col, Input, Row } from 'react-materialize';
import forge from 'node-forge';

import { EmptyCol, TextBox } from './components';

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
    this.changeOutput = this.changeOutput.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeInput(e) {
    this.setState({input: e.target.value});

    if(this.state.password) {
      this.updateOutput(e.target.value, this.state.password);
    }
  }

  changeOutput(e) {
    this.setState({output: e.target.value});

    if(this.state.password) {
      this.updateInput(e.target.value, this.state.password);
    }
  }

  changePassword(e) {
    this.setState({password: e.target.value});

    if(this.state.input && e.target.value) {
      this.updateOutput(this.state.input, e.target.value);
    } else if(this.state.output && e.target.value) {
      this.updateInput(this.state.output, e.target.value);
    }
  }

  init(password) {
    if (!password) {
      throw new Error('Password is not defined');
    }

    const temp = password.repeat(3);
    const key = forge.md.md5.create()
      .update(temp.slice(0,temp.length/2)).digest().toHex();
    const iv = forge.md.md5.create()
      .update(temp.slice(temp.length/2)).digest().toHex();

    return {
      key, iv
    };
  }

  updateInput(output, password) {
    if(!output) {
      this.setState({input:''});
      return;
    }

    const { key, iv } = this.init(password);
    const cipher = forge.cipher.createDecipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(forge.util.decode64(output)));
    cipher.finish();

    try{
      this.setState({input: forge.util.decodeUtf8(cipher.output.getBytes())});
    } catch (_) {
      this.setState({input: ''});
    }
  }

  updateOutput(input, password) {
    if(!input) {
      this.setState({output:''});
      return;
    }

    const { key, iv } = this.init(password);
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(input)));
    cipher.finish();

    try {
      this.setState({output: forge.util.encode64(cipher.output.getBytes())});
    } catch (_) {
      this.setState({output: ''});
    }
  }

  render() {
    return (
      <div className="App">
        <Row className="App-header">
          <h2>Easy AES Calculator</h2>
        </Row>
        <Row>
          <Col s={4} className="input-box">
            <TextBox value={this.state.input} onChange={this.changeInput} />
          </Col>
          <EmptyCol />
          <Col s={2}>
            <Input type="password" onChange={this.changePassword} />
          </Col>
          <EmptyCol />
          <Col s={4} className="output-box">
            <TextBox value={this.state.output} onChange={this.changeOutput} />
          </Col>
        </Row>
      </div>
    );
  }

}

export default App;
