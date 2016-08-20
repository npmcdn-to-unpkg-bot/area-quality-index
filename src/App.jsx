import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelectedAreaInfo = this.updateSelectedAreaInfo.bind(this);
    this.state = {
      areaData: {}
    }
    this.updateSelectedAreaInfo("20540");
  }
  updateSelectedAreaInfo(location) {
    $.get("/api/area/" +location)
    .done((data) => {
      this.setState({areaData: JSON.stringify(data)});
    });
  }
  render() {
    return (
      <div className="content">
        <p>This one is alive! So hello there world!!!FobarQuuz dajshfj ksahjk nanan 11</p>
        {JSON.stringify(this.state.areaData)}
        {}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
