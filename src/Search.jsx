import React from 'react';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value : ''};
        this.handleChange = this.handleChange.bind(this);
        this.submitShit = this.submitShit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});

    }
    submitShit(e) {
        e.preventDefault();
        this.props.callback(this.state.value);
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button onClick={this.submitShit} value="Do shit">Go</button>
            </div>
        )
    }
}