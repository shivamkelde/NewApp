import React, { Component } from 'react';
import NewsItems from './NewsItems';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SpinnerJs from './SpinnerJs';

export class News1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      totalPages: 0,
    };
  }

  fetchNews = async (page = 1) => {
    const { country, category, pageSize } = this.props;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://api.worldnewsapi.com/top-news?source-country=${country}&category=bussiness&language=en&date=2024-05-29`; // Example URL

    try {
      this.setState({ loading: true });
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      
      if (data && data.top_news && Array.isArray(data.top_news)) {
        const articles = [];
        data.top_news.forEach(newsGroup => {
          if (newsGroup.news && Array.isArray(newsGroup.news)) {
            articles.push(...newsGroup.news);  
          }
        });

        const totalResults = articles.length;
        const totalPages = Math.ceil(totalResults / pageSize);

       
        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize;
console.log(endIdx);
        this.setState({
          articles: articles.slice(startIdx, endIdx),
          totalResults,
          totalPages,
          loading: false,
          page,
        });
      } else {
        console.error("Invalid data format:", data);
        this.setState({
          articles: [],
          totalResults: 0,
          totalPages: 0,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    this.fetchNews();
  }

  handlePrevClick = () => {
    const { page } = this.state;
    if (page > 1) {
      this.fetchNews(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };      

  handleNextClick = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.fetchNews(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  render() {
    const { articles, loading, page, totalPages } = this.state;
    if (loading) return <SpinnerJs />;

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ padding: '25px' }}>TinyNews - Top Headlines</h1>
        <div className="row">
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((element) => (
              <div className="col-md-4" key={element.id || element.title}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={element.text ? element.text.slice(0, 80) : ""}
                  imageUrl={element.image ? element.image : "logo192.png"}
                  newsUrl={element.url}
                />
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <Button
            variant="dark"
            className="d-flex align-items-center"
            disabled={page === 1}
            onClick={this.handlePrevClick}
          >
            <i className="bi bi-arrow-left me-2"></i> Previous
          </Button>
          <Button
            variant="dark"
            className="d-flex align-items-center"
            disabled={page >= totalPages}
            onClick={this.handleNextClick}
          >
            Next <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
      </div>
    );
  }
}

export default News1;
