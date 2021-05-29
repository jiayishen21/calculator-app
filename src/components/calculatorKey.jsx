import React, { Component } from 'react';

class CalculatorKey extends Component {
  render() { 
    const { k, onGetClass, onButtonPress } = this.props;

    return (
      <div id={ k.id } onClick={ onButtonPress } className={ onGetClass(k) } >
        { k.value }
      </div>
    );
  }
}
 
export default CalculatorKey;