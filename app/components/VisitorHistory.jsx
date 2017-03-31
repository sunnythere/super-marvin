import React from 'react'
import { getVisitors } from '../reducers/visitors'
import { connect } from 'react-redux'
import RightClick from './RightClick'
import List from './List'


const mapState = (state) => ({
  visitors: state.visitors.visitorsToday
})

const mapDispatch = { getVisitors }


export default connect(mapState,mapDispatch)(class VisitorHistory extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      theDate: '',
      visitorList: [],
      keyArr: [],
      popUpX: 0,
      popUpY: 0,
      popUpKey: null,
      showContextMenu: false,
      showCtrlPanel: false
    }

    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.keysReleased = this.keysReleased.bind(this)
    this.keysPressed = this.keysPressed.bind(this)
    this.ctrlPanelClose = this.ctrlPanelClose.bind(this)
    this.handleCtrlSubmit = this.handleCtrlSubmit.bind(this)

    this.handleChange = (field) => (evt) => {
      evt.preventDefault()
      this.setState({ [field]: evt.target.value })
    }

    this.handleChangeCheck = (field) => (evt) => {
      const key = evt.target.name
      const checked = evt.target.checked
      props.updateVisitorLog(key, { [field]: checked })
    }

    this.handleChangeDropDown = (field) => (evt) => {
      const { value } = evt.target
console.log('VALUE ', value)
      if (field === 'date' && this.state.date !== value) {
        this.props.getVisitors(value)
        .then((visitorList) => {
          console.log('visitorList' , visitorList)
          this.setState({
            theDate: value,
            visitorList: visitorList
          })
        })
      }
    }

  }


  componentDidMount() {
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    //   yesterday.split(' ').slice(0,4).join(' ')
    console.log('YESTERDAY', yesterday)
    this.props.getVisitors(yesterday)
      .then((visitorList) => {
        console.log('visitorList ', visitorList)
        this.setState({
          theDate: yesterday,
          visitorList: visitorList
        })
      })

    window.addEventListener('keydown', this.keysPressed, false)
    window.addEventListener('keyup', this.keysReleased, false)
  }

  componentWillUnMount() {
    window.removeEventListener('keydown', this.keysPressed, false)
    window.removeEventListener('keyup', this.keysReleased, false)
  }

  keysPressed(evt) {
    let keys = this.state.keyArr
    keys[evt.keyCode] = true
    this.setState({
      keyArr: keys
    })
    // ctrl, alt, m
    console.log("evt keys ", evt.keyCode)
    if (keys[17] && keys[18] && keys[77]) {
      console.log("HEYHEY")
      this.setState({
        showCtrlPanel: true
      })
      window.addEventListener('click', this.ctrlPanelClose, false)
    }
  }

  keysReleased(evt) {
    // let keyArr = this.state.keyArr
    // keyArr[evt.keyCode] = false
    // this.setState({
    //   keyArr: keyArr
    // })
  }

  ctrlPanelClose(evt) {
    if(!evt.target.id.includes('ctrl')) {
      this.setState({
        showCtrlPanel: false,
        keyArr: []
      })
      window.removeEventListener('click', this.ctrlPanelClose, false)
    }
  }

  handleCtrlSubmit(evt) {
    evt.preventDefault()
    const newTimeUnit = Number(this.state.timeUnit)
    const newRate = Number(this.state.rate)
    this.props.changeRate(newRate)
    this.props.changeTime(newTimeUnit)
    this.setState({ showCtrlPanel: false })
  }





  checkEnter(evt) {
    if (evt.which === 13) {
      evt.preventDefault()
    }
  }

  handleContextMenu(evt) {
    evt.preventDefault()
    const key = evt.target ? evt.target.name : null
    //const target = evt.
    console.log('context menu!!!')
    if (key) {
      this.setState({
        popUpX: evt.clientX,
        popUpY: evt.clientY,
        popUpKey: key,
        showContextMenu: true
      })
      window.addEventListener('click', this.contextMenuClose, false)
    }
  }

  handleDelete() {
    this.props.deleteOneVisitor(this.state.popUpKey)
    console.log("hey delete")
    this.setState({
      showContextMenu: false,
      popUpIdx: null
    })
  }

  contextMenuClose(evt) {
    evt.preventDefault()
    if(evt.target.id !== 'popUp') {
      this.setState({
        showContextMenu: false,
        popUpIdx: null
      })
      window.removeEventListener('click', this.contextMenuClose, false)
   }
  }



  render() {

    console.log('PROPS CHILDREN ', this.props.children)

    let optionDates = []
    for (let x = 0; x < 14; x++) {
      let dateObj = new Date()
      dateObj.setDate(dateObj.getDate() - x)
      // -0 today, -1 yesterday
      optionDates[x] = dateObj.toDateString()
    }

    let visitors = []
      for (let key in this.state.visitorList) {
        visitors.push(this.state.visitorList[key])
      }




    return (
      <div className="div-container">

        { this.state.showContextMenu &&
          <RightClick
            id="popUp"
            popUpX={this.state.popUpX}
            popUpY={this.state.popUpY}
            handleDelete={this.handleDelete}
          />
        }

        <div>
        <form>
          <select name="date" className="date-dropdown" onChange={this.handleChangeDropDown('date')}>
          {
            optionDates.map((date, idx) => {
              return (
                <option value={date} key={idx}>{date}</option>
                )
            })
          }
          </select>
        </form>
        </div>

        <div>

  <List visitors={visitors}/>

        </div>


        { this.state.showCtrlPanel &&
        <div className="ctrl" id="ctrlMenu">
        Entrance Fee:
        <br />
        <form onSubmit={this.handleCtrlSubmit}>
          $<input type="number" name="rate" id="ctrl1" className="number-ctrl" value={this.state.rate} onChange={this.handleChange('rate')} /> per
          <input type="number" name="timeUnit" id="ctrl2" className="number-ctrl" value={this.state.timeUnit} onChange={this.handleChange('timeUnit')} /> minutes
          <input type="submit" value="change" id="ctrlbtn"/>
        </form>
        </div>
        }

      </div>
    )
  }

})



