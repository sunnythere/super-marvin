import React from 'react'

export default class clock extends React.Component {

  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {

    let time = this.state.date.toLocaleTimeString()
    let timeArr = time.split(' ')
    let time1 = timeArr[0].split(':')
    let showTime = `${time1[0]}:${time1[1]} ${timeArr[1]}`

    return(<div>
      {showTime}
    </div>)

    }
}
