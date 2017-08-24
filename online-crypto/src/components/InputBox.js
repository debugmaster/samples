import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import classnames from 'classnames';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.props.onChange.bind(this);
  }

  render() {
    const componentClass = classnames({
      valid: !!this.props.value,
      invalid: !this.props.value
    }, 'materialize-textarea');

    return (
      <TextareaAutosize
        className={componentClass}
        onChange={this.onChange}
        value={this.props.value} />
    );
  }
}

export default Input;