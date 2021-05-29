import React, { Component } from 'react';
import Calculator from './components/calculator';
import './App.css';

class App extends Component {
  state = {  }

  componentDidMount() {
    document.title = 'Calculator';
  }

  render() { 
    return (
      <React.Fragment>
        <Calculator />
      </React.Fragment>
    );
  }
}
 
export default App;
