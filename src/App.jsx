import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="content">
        <p>This one is alive! So hello there world!!!Fobar11</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
