import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('successfully retrieves the sales data', () => {
  let app = new App();
  return app.getData("http://localhost:3000/data.json").then( (data) => {
    let parsed = JSON.parse(data);
    expect(parsed.length).toBeGreaterThan(0);
  })

});
