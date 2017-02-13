import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const http = require('http');
import _ from 'lodash';
import DataSummary from './DataSummary';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { data: null };
    }

    /**
     * Load in the sales data and re-render to pass it to the DataSummary Object
     */
    componentDidMount() {
        var self = this;
        this.getData("/data.json")
            .then(function(data) {
                var parsed = JSON.parse(data);
                self.setState({ data: parsed })
            });
    }


    /**
     * Make an HTTP call for the sales data
     * @param url - the url to retrieve
     * @returns {Promise} - a promise which resolves to the sales data
     */
    getData(url) {
        return new Promise((resolve, reject) => {
            http.get(url, response => {
                let data = '';
                response.on('data', _data => data += _data);
                response.on('end', () => resolve(data));
            });
        });
    }

    getLength() {
        return _.get(this.state, "data.length")
    }

    render() {
        var data = this.state.data
        return (
            <main className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Guppy Jeans</h2>
                </div>
                <p className="App-intro">
                    Data Items loaded: { this.getLength() }
                </p>
                <DataSummary data={ data } />
            </main>
        );
    }
}

export default App;
