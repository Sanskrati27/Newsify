import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=3971c803c46c45aeb0fe0182faac30b0&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles})
    }

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3971c803c46c45aeb0fe0182faac30b0&page=${this.state.page -1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3971c803c46c45aeb0fe0182faac30b0&page=${this.state.page +1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }

    render() {
        return (
            <div>
            <div className='container my-3'>
                <h2 className='d-flex justify-content-center'>Newsify - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3 mx-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-warning" onClick={this.handlePrevClick()} >&larr; Previous</button>
                    <button className="btn btn-warning" onClick={this.handleNextClick()}>Next &rarr;</button>
            </div>
            <br/>
            </div>
        )
    }
}

export default News
