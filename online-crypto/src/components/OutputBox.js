import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

class Output extends Component {
  render() {
    return (
      <TextareaAutosize 
        className="materialize-textarea"
        disabled
        value={this.props.value} /> 
    );
  }
}

export default Output;