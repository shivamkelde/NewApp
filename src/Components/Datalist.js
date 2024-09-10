import React from 'react';
import { Form, Container } from 'react-bootstrap';

const Datalist = ({category}) => {
  return (
    <Container className="mt-5">
      <Form>
        <Form.Group controlId="exampleDataList">
          <Form.Label>Choose a programming language</Form.Label>
          <Form.Control 
            list="datalistOptions" 
            placeholder="Type to search..." 
          />
          <datalist id="datalistOptions">
            <option value="JavaScript" />
            <option value="Python" />
            <option value="Java" />
            <option value="C++" />
            <option value="Ruby" />
          </datalist>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Datalist;
