import React, { Component } from 'react';
import News from './Components/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavB from './Components/Navb';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Country: 'us',
      Mode: 'light',
    };
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.Mode !== this.state.Mode) {
      document.body.style.background = this.state.Mode === 'light' ? '#ffffff' : '#292929';
    }
  }

  getMode = () => {
    this.setState(
      (prevState) => ({ Mode: prevState.Mode === 'light' ? 'dark' : 'light' }),
      () => console.log('Mode updated:', this.state.Mode)
    );
  };

  setCountry = (newCountry) => {
    this.setState({ Country: newCountry });
  };

  render() {
    const basename = process.env.NODE_ENV === 'production' ? '/NewsApp' : '/';
    return (
      <div className="App">
        <Router basename={basename}>
          <NavB setCountry={this.setCountry} Mode={this.state.Mode} getMode={this.getMode} />
          <div className="container my-5">
            <Routes>
              <Route path="/" element={<News pageSize={15} country={this.state.Country} category="general" Mode={this.state.Mode} />} />
              <Route path="/business" element={<News pageSize={15} country={this.state.Country} category="business" Mode={this.state.Mode} />} />
              <Route path="/entertainment" element={<News pageSize={15} country={this.state.Country} category="entertainment" Mode={this.state.Mode} />} />
              <Route path="/science" element={<News pageSize={15} country={this.state.Country} category="science" Mode={this.state.Mode} />} />
              <Route path="/sports" element={<News pageSize={15} country={this.state.Country} category="sports" Mode={this.state.Mode} />} />
              <Route path="/technology" element={<News pageSize={15} country={this.state.Country} category="technology" Mode={this.state.Mode} />} />
              <Route path="/health" element={<News pageSize={15} country={this.state.Country} category="health" Mode={this.state.Mode} />} />
              <Route path="*" element={<div className='my-3 text-align-center'>404 Not Found</div>} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
