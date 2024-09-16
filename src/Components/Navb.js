import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

class NavB extends Component {

  getNewsByCountry = () => {
    let countryId = document.getElementById('countryListId');
    let countryName = countryId.value;
    let option = document.querySelector(`#countries option[value='${countryName}']`)
    let country = '';
    if (option) {
      country=option.getAttribute('data-value');
    }


    this.props.setCountry(country);
    console.log('countryName',country);
    if(country!=='us'){
      alert("Currently We can't accept Country other than United State");
    }
    countryId.value = null;
  };

  getBackground = () => {
    return this.props.Mode === 'light' ? 'bg-dark' : 'bg-light';
  }
  getTextColor = () => {
    return this.props.Mode === 'light' ? 'text-dark' : 'text-light';
  }
  getIcon = () => {
    return this.props.Mode === 'light' ? 'bi-moon-fill' : 'bi-sun-fill';
  }
  render() {
    const backgroundClass = this.getBackground();
    const textColorClass = this.getTextColor();
    const iconClass = this.getIcon();
    return (
      <Navbar expand="lg" style={{ background: `${this.props.Mode === 'light' ? '' : 'rgb(66, 66, 66)'}` }}
        className={`justify-content-between ${this.props.Mode === 'light' ? 'bg-body-secondary' : ''} `}
        fixed="top">
        <Container>

          <Navbar.Brand className={`fw-bolder fs-3 lh-1 ${textColorClass}`} as={Link} to="/">TN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"   >
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/">Home</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/business">Business</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/entertainment">Entertainment</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/health">Health</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/sports">Sports</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/technology">Technology</Nav.Link>
              <Nav.Link className={` ${textColorClass}`} as={Link} to="/science">Science</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Group controlId="countryListId">
                <Form.Control
                  list="countries"
                  placeholder="Search country.."
                  className={`${this.props.Mode === 'dark' ? 'bg-dark text-light custom-input' : ''}`}

                />
                <datalist id="countries">
                  <option value="United States" data-value="us" />
                  <option value="India" data-value="in" />
                  <option value="Japan" data-value="jp" />
                </datalist>
              </Form.Group>
              <Button
                variant={`${this.props.Mode === 'light' ? 'dark' : 'light'}`}
                className={`d-block align-items-center me-5 ${backgroundClass}`}
                onClick={this.getNewsByCountry}
              >
                <i className={`bi bi-search ${backgroundClass}`} ></i>
              </Button>
            </Form>
            <Button variant={`${this.props.Mode === 'light' ? 'dark' : 'light'}`} className="d-flex align-items-center me-5" onClick={this.props.getMode}>
              <i className={`bi ${iconClass}`}></i>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavB;
