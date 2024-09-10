import React, { Component } from 'react';



export class SpinnerJs extends Component {
    render() {
      const spinnerGif = require('./802.gif');
      const Mode=this.props.Mode;
      const filter= Mode==='dark'?'invert(1) sepia(1) hue-rotate(180deg) saturate(5)':'';
      return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <img src={spinnerGif} alt="Loading spinner"  style={{
            filter,}}/>
        </div>
      );
    }
  }
  
  export default SpinnerJs;
  