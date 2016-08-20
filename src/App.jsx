import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Content} from './Search';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelectedAreaInfo = this.updateSelectedAreaInfo.bind(this);
    this.state = {
      areaData: {}
    }
    this.updateSelectedAreaInfo("20500");
  }
  updateSelectedAreaInfo(location) {
    $.get("/api/area_data/" +location)
    .done((data) => {
      this.setState({areaData: data});
    });
  }
  render() {
    return (
      <div className="content">
        <h1>The Area Indexer</h1>
        <Content callback={this.updateSelectedAreaInfo} />
        <ResultArea data={this.state.areaData}/>
      </div>
    )
  }
}

class ResultArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="charts">
        <div className="house-size">
          <i className="fa fa-3x fa-building-o"></i>
          <span className="title">Average household size</span>
          <span className="data">{this.props.data['household-avg-size']}</span>
        </div>
        <div className="median-income">
          <i className="fa fa-3x fa-money"></i>
          <span className="title">Median income</span>
          <span className ="data">{this.props.data['median-income']}€</span>
        </div>
        <div className="avg-age">
          <i className="fa fa-3x fa-clock-o"></i>
          <span className="title">Average age</span>
          <span className ="data">{this.props.data['average-age']}</span>
        </div>
        <div className="jobless">
          <i className="fa fa-3x fa-briefcase"></i>
          <span className="title">Unemployed</span>
          <span className ="data">{(this.props.data['jobless']*100).toFixed(2)}</span>
        </div>
        <div className="owners-renters">
          <i className="fa fa-3x fa-area-chart"></i>
          <span className="title">Owners</span>
          <span className ="data">{this.props.data['house-owners']}</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
