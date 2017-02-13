import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { Table, Grid, Row, Col, Button } from 'react-bootstrap';

/**
 * Aggregates the passed in data by a set of predefined columns and counts the total sales
 */
class DataSummary extends Component {

    constructor(props) {
        super(props);
        this.state = { selected : "ManufacturersByGender" }
    }

    /**
     * onclick button handler
     * @param selected
     */
    handleClick(selected) {
        this.setState({ selected: selected });
    }

    /**
     * Decides which query to perform based on the 'selected' state param
     * @returns {XML} - a jsx results table
     */
    displayTable() {
        switch (this.state.selected) {
            case "ManufacturersByGender":
                return this.displayBy(["Manufacturer", "Gender"], this.props.data);
                break;
            case "ManufacturersByCountry":
                return this.displayBy(["Manufacturer", "Country"], this.props.data);
                break;
            case "Sizes":
                return this.displayBy(["Country", "Size"], this.props.data);
                break;
            case "MonthsGlobally":
                return this.displayBy(["Month"], this.props.data);
                break;
            case "MonthsByCountry":
                return this.displayBy(["Country", "Month"], this.props.data);
                break;
            default:
                return this.displayBy(["Manufacturer", "Gender"], this.props.data);
        }
    }


    /**
     * Get the results table header section
     * @param cols
     * @param data
     * @returns {XML}
     */
    getTableHead(cols, data) {
        return (
            <thead>
                <tr>
                    { _.map(cols, (col, idx) => <th key={ idx }>{ col }</th> ) }
                    <th>Count</th>
                </tr>
            </thead>
        )
    }

    /**
     * Get a count of the total sales for all matching data entries
     * @param data - the sales data
     * @param entry - the target object properties to use as a basis for matching other elements
     * @param cols - the data columns which form the aggregation query
     * @returns {Number} - the total sales for all items which match the target values in the target item object
     */
    getCount(data, item, cols) {
        var matchObject = {}
        _.each(cols, col => {
            matchObject[col] = item[col];
        });
        return _.chain(data)
                .filter(_.matches(matchObject))
                .sumBy("Count")
                .value();
    }

    /**
     * Aggregate the sales data and calculate the total sales for each given type
     * @param cols - the columns to aggregate the data by
     * @param data - the sales data
     * @returns {Object} - a JSON object containing the filtered results table data
     */
    getTableBodyData(cols, data) {

        return _.chain(this.decorateByMonth(data))
            .map(item => _.pick(item, cols)) // extract only those properties which match the requested cols
            .uniqWith(_.isEqual) // use object comparison for unique rows
            .map(item => {
                item.count = this.getCount(data, item, cols); // add the count to the row
                return item;
            })
            .sortBy(item => item.count)
            .reverse() // reverse the order so that the sort is descending
            .value();
    }

    /**
     * Add month data to the results
     * OrderDate is in the Americanised format "mm/dd/yyyy"
     * @param data - the sales data to add month information to
     * @returns {Array} - an array of sales data entries with month information included
     */
    decorateByMonth(data) {
        // transform data to include month
        return _.map(data, item => {
            let date = new Date(item.OrderDate);
            item.Month = date.getMonth();
            return item;
        });
    }

    /**
     * Renders the body of the results table
     * @param cols - the columns to aggregate the data by
     * @param data - the data to process
     * @returns {XML} - jsx results table body
     */
    getTableBody(cols, data) {

        var tableItems = this.getTableBodyData(cols, data);
        var jsxItems = _.map(tableItems, (entry, idx) =>
                <tr key={ idx }>
                    {  _.map(cols, (col, idx) => <td key={ idx }>{ entry[col] }</td> ) }
                    <td>{ entry.count }</td>
                </tr>
            );

        return (
            <tbody>
                { jsxItems }
            </tbody>
        )
    }

    /**
     * Displays the results table based on the given columns
     * @param cols - the columns to aggregate the data by
     * @param data - the data to process
     * @returns {XML} - jsx results table
     */
    displayBy(cols, data) {

        return (
            <Table striped bordered condensed hover>
                { this.getTableHead(cols, data) }
                { this.getTableBody(cols, data) }
            </Table>);
    }

    /**
     * Renders the list of buttons for the different queries
     * @returns {XML}
     */
    renderBtns() {
        var btnList = [
            { title: "Top Selling Manufacturers by Gender",
                selectHandle: "ManufacturersByGender" },
            { title: "Top Selling Manufacturers by Country",
                selectHandle: "ManufacturersByCountry" },
            { title: "Top Selling Sizes by country",
                selectHandle: "Sizes" },
            { title: "Top Selling Months globally",
                selectHandle: "MonthsGlobally" },
            { title: "Top Selling Months by country",
                selectHandle: "MonthsByCountry" }
        ];
        return (
            <Grid>
                <Row>
                    { _.map(btnList, (btn, index) => {
                            return (<Col key={index} xs={12} md={4}>
                                <Button className="actionBtn" bsStyle="primary" block onClick={this.handleClick.bind(this, btn.selectHandle)}>
                                    { btn.title }
                                     </Button>
                            </Col>)
                        })
                    }
                </Row>
            </Grid>
        )
    }

    /**
     * main render method renders the buttons and results table
     * @returns {XML}
     */
    render() {
        return (
            <section className="DataSummary">
                { this.renderBtns() }
                <h2>Results Table</h2>
                <Grid>
                    { this.displayTable() }
                </Grid>
            </section>
        );
    }
}

export default DataSummary;


