import React, { Component } from 'react';
import CalculatorKey from './calculatorKey';  
import './calculator.css';

class Calculator extends Component {
  state = {
    screenNum: '0',
    theme: 0,
    keys: [
      { id: '0', value: '7', col: '0', active: true },
      { id: '1', value: '8', col: '0', active: true },
      { id: '2', value: '9', col: '0', active: true },
      { id: '3', value: 'DEL', col: '1', active: true },
      { id: '4', value: '4', col: '0', active: true },
      { id: '5', value: '5', col: '0', active: true },
      { id: '6', value: '6', col: '0', active: true },
      { id: '7', value: '+', col: '0', active: true },
      { id: '8', value: '1', col: '0', active: true },
      { id: '9', value: '2', col: '0', active: true },
      { id: '10', value: '3', col: '0', active: true },
      { id: '11', value: '-', col: '0', active: true },
      { id: '12', value: '.', col: '0', active: true },
      { id: '13', value: '0', col: '0', active: true },
      { id: '14', value: '/', col: '0', active: true },
      { id: '15', value: 'x', col: '0', active: true },
      { id: '16', value: 'RESET', col: '1', active: true },
      { id: '17', value: '=', col: '2', active: true }
    ]
  }

  componentDidMount() {
    this.changeTheme(0);
  }

  getPreferredScheme = () => {
    //TODO: fix this later
    let theme = this.state.theme;
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 1;
    }
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 2;
    }
    else {
      theme = 0;
    }
    this.setState( { theme });
    this.setTheme();
  };

  setTheme = () => {
    const theme = this.state.theme;
    const style = document.documentElement.style;
    if(theme === 0) {
      //backgrounds
      style.setProperty('--main-bg', '#3b4664');
      style.setProperty('--keypad-bg', '#252d44');
      style.setProperty('--screen-bg', '#181f32');

      //keys
      style.setProperty('--key-bg-delete', 'hsl(225, 21%, 49%)');
      style.setProperty('--key-shadow-delete', 'hsl(224, 28%, 35%)');

      style.setProperty('--key-bg-equals', 'hsl(6, 63%, 50%)');
      style.setProperty('--key-shadow-equals', 'hsl(6, 70%, 34%)');

      style.setProperty('--key-bg-default', 'hsl(30, 25%, 89%)');
      style.setProperty('--key-shadow-default', 'hsl(28, 16%, 65%)');

      //text
      style.setProperty('--text-title', 'hsl(0, 0%, 100%)');
      style.setProperty('--text-default', 'hsl(221, 14%, 31%)');
      style.setProperty('--text-delete', 'hsl(0, 0%, 100%)');
      style.setProperty('--text-equals', 'hsl(0, 0%, 100%)');
    }
    else if(theme === 1) {
      //backgrounds
      style.setProperty('--main-bg', '#e6e6e6');
      style.setProperty('--keypad-bg', '#d3cdcd');
      style.setProperty('--screen-bg', '#eeeeee');

      //keys
      style.setProperty('--key-bg-delete', 'hsl(185, 42%, 37%)');
      style.setProperty('--key-shadow-delete', 'hsl(185, 58%, 25%)');

      style.setProperty('--key-bg-equals', 'hsl(25, 98%, 40%)');
      style.setProperty('--key-shadow-equals', 'hsl(25, 99%, 27%)');

      style.setProperty('--key-bg-default', 'hsl(45, 7%, 89%)');
      style.setProperty('--key-shadow-default', 'hsl(35, 11%, 61%)');

      //text
      style.setProperty('--text-title', 'hsl(60, 10%, 19%)');
      style.setProperty('--text-default', 'hsl(60, 10%, 19%)');
      style.setProperty('--text-delete', 'hsl(0, 0%, 100%)');
      style.setProperty('--text-equals', 'hsl(0, 0%, 100%)');
    }
    else {
      //backgrounds
      style.setProperty('--main-bg', '#17062a');
      style.setProperty('--keypad-bg', '#1e0836');
      style.setProperty('--screen-bg', '#1e0836');

      //keys
      style.setProperty('--key-bg-delete', 'hsl(281, 89%, 26%)');
      style.setProperty('--key-shadow-delete', 'hsl(285, 91%, 52%)');

      style.setProperty('--key-bg-equals', 'hsl(176, 100%, 44%)');
      style.setProperty('--key-shadow-equals', 'hsl(177, 92%, 70%)');

      style.setProperty('--key-bg-default', 'hsl(268, 47%, 21%)');
      style.setProperty('--key-shadow-default', 'hsl(290, 70%, 36%)');

      //text
      style.setProperty('--text-title', 'hsl(52, 100%, 62%)');
      style.setProperty('--text-default', 'hsl(52, 100%, 62%)');
      style.setProperty('--text-delete', 'hsl(0, 0%, 100%)');
      style.setProperty('--text-equals', 'hsl(198, 20%, 13%)');
    }
  };

  changeTheme = theme => {
    this.setState( { theme } );
    setTimeout(() => {
      this.setTheme();
    }, 50); 
  }

  getButtonActive = buttonNumber => {
    if(this.state.theme === buttonNumber) {
      return 'theme-button active';
    }
    else {
      return 'theme-button';
    }
  }

  getClass = k => {
    let classNames = 'key';
    if(k.col == 0) classNames += ' key-default';
    else if(k.col == 1) classNames += ' key-delete';
    else classNames += ' key-equals';
    if(!k.active) classNames += ' pressed';

    if(k.id == 16) classNames += ' key-reset';

    return classNames;
  }

  buttonPress = k => {
    let screenNum = this.state.screenNum;
    let operations = this.state.operations;
    const ks = this.state.keys;
    const index = ks.indexOf(k);
    setTimeout(() => {
      ks[index].active = false;
      this.setState( { ks } );
    }, 50);

    if(k.value === 'DEL') {
      if(screenNum.substring(screenNum.length - 1) === ' ') screenNum = screenNum.substring(0, screenNum.length - 3);
      else if(screenNum.substring(screenNum.length - 1) === 'y' || screenNum.substring(screenNum.length - 1) === 'N') screenNum = '';
      else screenNum = screenNum.substring(0, screenNum.length - 1);
      if(screenNum.length === 0) screenNum = '0';
      this.setState( { screenNum } );
    }
    else if(k.value === 'RESET') {
      screenNum = '0';
      this.setState( { screenNum } );
    }
    else if(k.value === '=') {
      this.evaluate();
    }

    else if(document.getElementById('screen').getBoundingClientRect().width < 510) {
      if(screenNum.substring(screenNum.length - 1) === ' ') {
        if(k.value !== '+' && k.value !== '-' && k.value !== '/' && k.value !== 'x') {
          if(k.value === '.') {
            screenNum += '0.';
          }
          else {
            if(screenNum === '0') screenNum = '';
            screenNum += k.value;
          }
        }
      }
      else if(k.value === '+') {
        if(screenNum.substring(screenNum.length-1) === '.') screenNum = screenNum.substring(0, screenNum.length - 1);
        screenNum += ' + ';
      }
      else if(k.value === '-') {
        if(screenNum.substring(screenNum.length-1) === '.') screenNum = screenNum.substring(0, screenNum.length - 1);
        screenNum += ' - ';
      }
      else if(k.value === '.') {
        if(screenNum.substring(screenNum.length-1) !== '.') screenNum += '.';
      }
      else if(k.value === '/') {
        if(screenNum.substring(screenNum.length-1) === '.') screenNum = screenNum.substring(0, screenNum.length - 1);
        screenNum += ' / ';
      }
      else if(k.value === 'x') {
        if(screenNum.substring(screenNum.length-1) === '.') screenNum = screenNum.substring(0, screenNum.length - 1);
        screenNum += ' x ';
      }
      else {
        if(screenNum === '0') screenNum = '';
        screenNum += k.value;
      }
      
      this.setState( { screenNum } );
    }

    setTimeout(() => {
      ks[index].active = true;
      this.setState( { ks } );
    }, 550);
  }

  evaluate = () => {
    let flag = true;
    let screenNum = this.state.screenNum;
    let components = screenNum.split(' ');
    while(flag) {
      let indexM = components.indexOf('x');
      let indexD = components.indexOf('/');
      if(indexM === indexD) flag = false;
      else if(indexM < indexD && indexM !== -1 || indexD === -1) {
        components.splice(indexM, 1);
        components[indexM - 1] = parseFloat(components[indexM - 1]) * parseFloat(components[indexM]);
        components.splice(indexM, 1);
      }
      else  {
        components.splice(indexD, 1);
        components[indexD - 1] = parseFloat(components[indexD - 1]) / parseFloat(components[indexD]);
        components.splice(indexD, 1);
      }
    }
    flag = true;
    while(flag) {
      let indexA = components.indexOf('+');
      let indexS = components.indexOf('-');
      if(indexA === indexS) flag = false;
      else if(indexA < indexS && indexA !== -1 || indexS === -1) {
        components.splice(indexA, 1);
        components[indexA - 1] = parseFloat(components[indexA - 1]) + parseFloat(components[indexA]);
        components.splice(indexA, 1);
      }
      else  {
        components.splice(indexS, 1);
        components[indexS - 1] = parseFloat(components[indexS - 1]) - parseFloat(components[indexS]);
        components.splice(indexS, 1);
      }
    }
    screenNum = components[0] + '';
    this.setState( { screenNum } );
  }

  render() { 
    const ks = this.state.keys;
    const screenNum = this.state.screenNum;
    return (  
      <div className='full-screen'>
        <div className='calculator'>
          <div className='theme'>
            <div className='title'>
              calc
            </div>
            <div className='theme-selector'>
              THEME
            </div>
            <div className='theme-container'>
              <div className='theme-text'>1</div>
              <div className='theme-text'>2</div>
              <div className='theme-text'>3</div>

              <div className='button-container'>
                <button className={ this.getButtonActive(0) } onClick={ () => { this.changeTheme(0) } } ></button>
                <button className={ this.getButtonActive(1) } onClick={ () => { this.changeTheme(1) } } ></button>
                <button className={ this.getButtonActive(2) } onClick={ () => { this.changeTheme(2) } } ></button>
              </div>
            </div>
          </div>
            
          <div className='screen spacer'>
            <div id='screen' className='screen-text'>
              { screenNum }
            </div>
          </div>

          <div className='keypad'>
            <div className='keys'>
              { ks.map( k => (
                <CalculatorKey
                  key={ k.id }
                  k={ k }
                  onGetClass={ this.getClass }
                  onButtonPress={ () => { this.buttonPress(k) } }
                />  
              )) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Calculator;