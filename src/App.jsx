import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from "./DisplayLocation";

export class App extends React.Component {
  constructor(props) {
    super(props);
    //this.updateSelectedAreaInfo = this.updateSelectedAreaInfo.bind(this);
    this.state = {
      areaData: {}
    }
    //updateSelectedAreaInfo("20540");
  }
  updateSelectedAreaInfo(location) {
    $.get("/api/area/" +location)
    .done((data) => {
      setState({areaData: data});
    });
  }
  render() {
    return (
      <div className="content">
        <p>This one is alive! So hello there world!!!FobarQuuz dajshfj ksahjk nanan</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
