import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {

    state = {
        advice: "",
        textInput: "book",
        searchResults: []
    }
    componentDidMount() {
        this.fetchQuotes();
        this.searchQuotes();
    }

    fetchQuotes = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then(response => {
                const { advice } = response.data.slip
                this.setState({ advice });
            })
            .catch((error) => console.log(error))
    }

    inputTextHandler = (e) => {
        this.setState({ textInput: e.target.value });
    }

    searchQuotes = () => {
        axios.get(`https://api.adviceslip.com/advice/search/${this.state.textInput}`)
            .then(response => {
                this.setState({ searchResults: response.data.slips });
                console.log(this.state.searchResults);
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { advice, searchResults } = this.state;
        return (
            <div className="app">
                <h1 className="logo"> Quoteoholic </h1>
                <div className="card">
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={this.fetchQuotes}>
                        <span>Quotes!</span>
                    </button>
                </div>
                <div className="card">
                    {/* <h1 className="heading">{advice}</h1> */}
                    <input className="inputArea" type="text" onChange={this.inputTextHandler} placeholder="book"/>
                    <button className="button" onClick={this.searchQuotes}>
                        <span>Search!</span>
                    </button>
                </div>
                <div className="searchResults">
                <h1>Search Results</h1>
                    {
                        searchResults.map((quote) => <h3 key={quote.id}>"{quote.advice}"  &  Date {quote.date}</h3>)
                    }
                </div>

            </div>
        )
    } s
}

export default App;