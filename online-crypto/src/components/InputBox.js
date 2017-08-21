import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.props.onChange.bind(this);
  }

  render() {
    return (
      <TextareaAutosize 
        className="materialize-textarea" 
        onChange={this.onChange}
        value={this.props.value} /> 
    );
  }
}

export default Input;