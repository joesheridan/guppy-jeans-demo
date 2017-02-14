### Functionality Summary

The functionality of the solution provides the user with the option to run all 
the queries described in the test document.
The code was written in a generic way to allow for any combination of columns. 
It would therefore be trivial to add additional queries or allow the user to pick
and choose which columns to include in the query.

### How to open the demo in a browser

The application was based on the `create-react-app` application generator.
To run the application, enter the following at the command prompt: 
```
npm start
```
This will start a local application listening on port 3000. You can access the app by
browsing to http://localhost:3000 - provided you have no other services listening on that
port.
A fully optimised production build can be achieved by:
```
npm run build
```
Which can be accessed by `cd build` and then:
```
python -m SimpleHTTPServer 9999
```
and can be accessed on http://localhost:9999

### How to run the tests

To run the tests, simply run:
```
npm test
```
This will run the jest tests.

### Reasons/justification for libraries/frameworks used

* ReactJS - React is a light-weight javascript library (as FB describe it) built to maximize reusable components
and handle the rendering of ui components in a sensible manner.
* React-Bootstrap - Bootstrap allows a quick and simple way to layout ui components on the page 
(via a Grid system) and apply uniform and modern styling. React bootstrap was developed to 
integrate with React, directly in JSX.
* Lodash - lodash is a collection of functions which follow the functional programming paradigm.
It fits in very well with JSX and preparing the data on which the ui components rely.
* Jest - jest is a testing framework for React.

### API Format

I decided to use JSON as the data format because it is the native JavaScript
object storage format and therefore very easy to read, parse, transmit and use in test
cases. Other options to consider would have been CSV, XML, Protocol Buffers and a whole
host of others [here](https://en.wikipedia.org/wiki/Comparison_of_data_serialization_formats).
However all others would have incurred additional development time to implement.
For production sites, the payoff could be smaller file sizes, quicker access or quicker
compression/decompression times.

I used the standard `create-react-app` HTTP endpoint for the API.
For production use, I would use HTTPS (SSL) so that sensitive data could not be captured
in transit. I would also add some secure authentication scheme such as OAuth or JWT to
increase data privacy. I would also compress the data to decrease download time.

### Assumptions
The sales data dates have been assumed to be American format (mm/dd/yyyy) since JavaScript doesn't 
natively accept GB format (dd/mm/yyyy). This could be fixed by using something like moment.js
or other custom code to reverse the days and months.