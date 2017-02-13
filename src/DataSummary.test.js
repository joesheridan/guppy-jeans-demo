import React from 'react';
import ReactDOM from 'react-dom';
import DataSummary from './DataSummary';
var data = require('../public/data.json');

it('successfully displays top selling manufacturers by gender', () => {
    var dataSummary = new DataSummary();
    var results = dataSummary.getTableBodyData(["Manufacturer", "Gender"], data);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toEqual({ count: 25, Gender: "F", Manufacturer:"The Hipster Jeans Company" });
});

it('successfully displays top selling manufacturers by country', () => {
    var dataSummary = new DataSummary();
    var results = dataSummary.getTableBodyData(["Manufacturer", "Country"], data);
    expect(results[0]).toEqual({ count: 25, Country: "Germany", Manufacturer:"The Hipster Jeans Company" });
});

it('successfully displays top selling sizes by country', () => {
    var dataSummary = new DataSummary();
    var results = dataSummary.getTableBodyData(["Size", "Country"], data);
    expect(results[0]).toEqual({ count: 16, Country: "Germany",Size:"28/30" });
});

it('successfully displays top selling month globally', () => {
    var dataSummary = new DataSummary();
    var results = dataSummary.getTableBodyData(['Month'], data);
    expect(results[0]).toEqual({ count: 29, Month:1 });
});

it('successfully displays top selling month by country', () => {
    var dataSummary = new DataSummary();
    var results = dataSummary.getTableBodyData(["Country", "Month"], data);
    console.log('gettablebodydata results:',results);
    expect(results[0]).toEqual({ count: 16, Country: "Germany", Month: 1 });
});