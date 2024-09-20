import React from 'react';
import { Card } from 'react-bootstrap';

const NewsItems = ({ title, description, imageUrl, newsUrl,Mode }) => {
 

  const imgStyle = {
    width: '100%',
    height: '200px', 
    objectFit: 'cover', 
  };


  return (
    <div className='container my-3 '>
      <Card className={`${Mode==='dark'?'bg-dark text-light':''}`}>
        <Card.Img variant="top" src={imageUrl} alt="image" style={imgStyle} />
        <Card.Body>
          <Card.Title className='text-truncate'>{title}...</Card.Title>
          <Card.Text className='custom-text limited-height'>{description}...</Card.Text>
          <a href={newsUrl} target='_blank' rel='noopener noreferrer' className={`btn btn-sm ${Mode==='light'?'btn-primary':'btn-secondary'} `}>
            Read More
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsItems;
