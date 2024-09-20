import React, { Component } from 'react';
import NewsItems from './NewsItems';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SpinnerJs from './SpinnerJs';

export class News extends Component {
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

  fetchNews = async () => {
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&category=${category}&pageSize=${pageSize}&page=${page}`;
    console.log(url);
    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log("API response:", data);

      if (data && data.articles) {
        const totalResults = data.totalResults;
        const totalPages = Math.ceil(totalResults / pageSize);
        this.setState({
          articles: data.articles,
          totalResults,
          totalPages,
          loading: false,
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

  async componentDidUpdate(prevProps) {
    
    if (
      prevProps.category !== this.props.category ||
      prevProps.pageSize !== this.props.pageSize ||
      prevProps.country !== this.props.country
    ) {
      
      this.setState({ page: 1 }, () => {
        this.fetchNews(); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      });
      
    }
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: Math.max(prevState.page - 1, 1) }),
      () => {
        this.fetchNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    );
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: Math.min(prevState.page + 1, this.state.totalPages) }),
      () => {
        this.fetchNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    );
  };

  render() {
    const { articles, loading, page, totalPages } = this.state;
    const  Mode  = this.props.Mode; 
    console.log('Current Mode:', Mode); 
    if (loading) return <SpinnerJs Mode={Mode} />;

    return (
      <div className='container my-3 '>
        <h1 className={`text-center ${Mode==='light'?'text-dark':'text-light'}`} style={{ padding: '25px' }}>TinyNews - Top Headlines</h1>
        <div className="row">
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((element) => (
              <div className="col-md-4" key={element.publishedAt || `${element.title}-${element.url}`}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  imageUrl={element.urlToImage ? element.urlToImage : "logo192.png"}
                  newsUrl={element.url}
                  Mode={Mode}
                />
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <Button
            variant={`${Mode==='light'?'dark':'light'}`}
            className="d-flex align-items-center"
            disabled={page === 1}
            onClick={this.handlePrevClick}
          >
            <i className="bi bi-arrow-left me-2"></i> Previous
          </Button>
          <Button
            variant={`${Mode==='light'?'dark':'light'}`}
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

export default News;
