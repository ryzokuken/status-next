import React from 'react';
import fetch from 'isomorphic-unfetch';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

    setInterval(() => {
      fetch('http://localhost:8000')
        .then(res => res.json())
        .then(res => this.setState({ data: res }));
    }, 1000);
  }

  render() {
    return <h1>{JSON.stringify(this.state.data)}</h1>;
  }
}
