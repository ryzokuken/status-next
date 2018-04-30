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
    return (
      <table>
        <tbody>
          <tr>
            <th>Protocol</th>
            <th>Local: Port</th>
            <th>Local: Address</th>
            <th>Remote: Port</th>
            <th>Remote: Address</th>
            <th>State</th>
            <th>PID</th>
          </tr>
          {Object.keys(this.state.data).map((key, index) => (
            <tr key={index}>
              <td>{this.state.data[key].protocol}</td>
              <td>{this.state.data[key].local.port}</td>
              <td>{this.state.data[key].local.address}</td>
              <td>{this.state.data[key].remote.address}</td>
              <td>{this.state.data[key].remote.address}</td>
              <td>{this.state.data[key].state}</td>
              <td>{this.state.data[key].pid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
