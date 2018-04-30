import React from 'react';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filter: 'ALL'
    };

    // setInterval(() => {
    //   fetch('http://localhost:8000')
    //     .then(res => res.json())
    //     .then(res => this.setState({ data: res }))
    //     .catch(err => console.error(err));
    // }, 1000);

    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
    this.socket.on('status', ({ key, data }) => {
      const sData = this.state.data;
      sData[key] = data;
      this.setState({ data: sData });
    });
  }

  componentWillUnmount() {
    this.socket.off('message', this.handleMessage);
    this.socket.close();
  }

  handleStatus(data) {}

  setFilter(evt) {
    this.setState({ filter: evt.target.value });
  }

  render() {
    const arr = Object.keys(this.state.data)
      .map(key => this.state.data[key])
      .sort((a, b) => a.local.port - b.local.port);
    const fArr = this.state.filter === 'ALL' ? arr : arr.filter(i => i.state === this.state.filter);

    return (
      <div>
        <select value={this.state.filter} onChange={this.setFilter}>
          <option value="ALL">ALL</option>
          <option value="ESTABLISHED">ESTABLISHED</option>
          <option value="CLOSE_WAIT">CLOSE_WAIT</option>
          <option value="TIME_WAIT">TIME_WAIT</option>
          <option value="SYN_SENT">SYN_SENT</option>
        </select>
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
            {fArr.map((item, index) => (
              <tr key={index}>
                <td>{item.protocol}</td>
                <td>{item.local.port}</td>
                <td>{item.local.address}</td>
                <td>{item.remote.address}</td>
                <td>{item.remote.address}</td>
                <td>{item.state}</td>
                <td>{item.pid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
