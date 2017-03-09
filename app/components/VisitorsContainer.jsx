import React from 'react'
import { addToVisitorLog, updateVisitorLog, deleteOneVisitor, getAllVisitorsToday } from '../reducers/visitors'
import { changeRate, changeTime } from '../reducers/cost'
import { connect } from 'react-redux'
import Visitors from './Visitors'
import RightClick from './RightClick'


const mapState = (state) => ({
  visitors: state.visitors.visitorsToday,
  oneVisitor: state.visitors.oneVisitor,
  rate: state.cost.rate,
  timeUnit: state.cost.time
})

const mapDispatch = { updateVisitorLog, addToVisitorLog, deleteOneVisitor, getAllVisitorsToday, changeRate, changeTime}


export default connect(mapState,mapDispatch)(class VisitorsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      visitorNum: 1,
      newVisitorBtnText: 'New Visitor',
      keyArr: [],
      showNameField: false,
      popUpX: 0,
      popUpY: 0,
      popUpKey: null,
      showContextMenu: false,
      showCtrlPanel: false,
      rate: props.rate,
      timeUnit: props.timeUnit
    }

    this.addNewVisitor = this.addNewVisitor.bind(this)
    this.checkOut = this.checkOut.bind(this)
    this.handleChangeVisNum = this.handleChangeVisNum.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.onBlurNameField = this.onBlurNameField.bind(this)
    this.handleApplyGrace = this.handleApplyGrace.bind(this)
    this.checkEnter = this.checkEnter.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUndoCheckOut = this.handleUndoCheckOut.bind(this)
    this.keysReleased = this.keysReleased.bind(this)
    this.keysPressed = this.keysPressed.bind(this)
    this.ctrlPanelClose = this.ctrlPanelClose.bind(this)
    this.handleCtrlSubmit = this.handleCtrlSubmit.bind(this)
    this.handleChangeMinor = this.handleChangeMinor.bind(this)
    this.handleChangeUnder3 = this.handleChangeUnder3.bind(this)

    this.handleChange = (field) => (evt) => {
      evt.preventDefault()
      this.setState({ [field]: evt.target.value })
    }

    this.handleChangeCheck = (field) => (evt) => {
      const key = evt.target.name
      const checked = evt.target.checked
      props.updateVisitorLog(key, { [field]: checked })

    }

  }




  componentDidMount() {
    const today = new Date()
    this.props.getAllVisitorsToday(today)

    window.addEventListener('keydown', this.keysPressed, false)
    window.addEventListener('keyup', this.keysReleased, false)
  }

  componentWillUnmount() {
    const today = new Date()
    this.props.getAllVisitorsToday(today)()

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
    if (!evt.target.id.includes('ctrl')) {
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

  // if adding more than one visitor at a time (like a family)
  handleChangeVisNum(evt) {
    evt.preventDefault()
    const value = evt.target.value
    this.setState({
      visitorNum: value,
      newVisitorBtnText: value > 1 ? 'New Visitors' : 'New Visitor'
    })
  }

  addNewVisitor(evt) {
    evt.preventDefault()
    const newTime = new Date()
    const count = Object.keys(this.props.visitors).length+1
    const newVisitorObj = {
      checkedOut: false,
      name: "name here",
      minor: false,
      under3: false,
      checkInTimeMS: newTime.valueOf(),
      checkInTime: newTime.toLocaleTimeString()
    }
    const partySize = Number(evt.target.visitorNum.value)
    if (partySize === 1) {
      this.props.addToVisitorLog(count, Object.assign(newVisitorObj, {partySize: '1', count: count}))
    } else {
      for (let x = 0; x < partySize; x++) {
        this.props.addToVisitorLog(count+x, Object.assign(newVisitorObj, {partySize: `${partySize}-${x+1}`, count: (count+x)}))
      }
    }

    // reset newVisitor button
    this.setState({
      visitorNum: 1,
      newVisitorBtnText: 'New Visitor'
    })
  }

  handleChangeMinor(evt) {
console.log('HCM')
    const key = evt.target.name
    const checked = evt.target.checked
    console.log('value?? ', evt.target.value)
console.log('HCM checked ', checked)
    this.props.updateVisitorLog(key, { minor: checked })

    if (!checked) {
      this.props.updateVisitorLog(key, { under3: false})

       // if (this.props.visitors[key].partySize.length > 1 && this.props.visitors[key].checkedOut) {
       //  // if already checkedOut, and part of group, adjust total
       //  this.props.updateVisitorLog(key, { cost: this.props.visitors[key].baseCost})

       //  this.updateTotalCost(key)
       //  }
    }
  }

  handleChangeUnder3(evt) {
console.log('HCU3')
    const key = evt.target.name
    const checked = evt.target.checked  //could be true or false
console.log('HCu3 checked ', checked)

    this.props.updateVisitorLog(key, { under3: checked })

    // if (this.props.visitors[key].checkedOut && this.props.visitors[key].partySize.length > 1) {
    //     this.props.updateVisitorLog(key, { cost: (checked ? 0 : this.props.visitors[key].baseCost) })
    //     this.updateTotalCost(key)
    // }
  }

  updateTotalCost(key) {
console.log('START UPDATE TOTALCOST')
    //find key of last group member (single visitor cannot be under3)
    const partyArr = this.props.visitors[key].partySize.split('-')

    const numberOfPeople = Number(partyArr[0])
    const firstKey = Number(key) - Number(partyArr[1]) +1

    // const baseCost = this.props.visitors[key].baseCost
    let newTotal = 0

    for (let key = firstKey; key < (firstKey + numberOfPeople); key++) {
      newTotal += this.props.visitors[key].cost
    }

    this.props.updateVisitorLog((firstKey + numberOfPeople -1), {totalCost: newTotal})
  }


//TODO: EDIT
  handleChangeName(evt) {
    evt.preventDefault()
    const key = evt.target.name
    const name = evt.target.value
    this.props.updateVisitorLog(key, {
      name: name,
      keyArr: []
    })
  }

//TODO: EDIT
  onBlurNameField(evt) {
    evt.preventDefault()
    const key = evt.target.name
    const name = evt.target.value
    this.props.updateVisitorLog(key, {
      name: name
    })
  }


  checkOut(evt) {
    evt.preventDefault()
    const count = evt.target.idNum.value  //idx+1
    const visitorEntry = this.props.visitors[count]
    const timeUnit = this.props.timeUnit  //30min
    //calculate time
    const startTime = visitorEntry.checkInTimeMS
    const leaveTime = new Date()
    const difference = leaveTime - startTime //diff in milliseconds
      const minutes = Math.round(difference/1000/60)
      const hours = Math.floor(minutes/60)
      const remMin = minutes % 60
      //5 min grace
      const graceAvail = ((minutes > timeUnit) && (minutes % timeUnit <= 5)) ? true : false
    const baseCost = this.calculateBaseCost(difference, minutes)

    const visitorLog = {
      checkedOut: true,
      checkOutTimeMS: leaveTime.valueOf(),
      checkOutTime: leaveTime.toLocaleTimeString(),
      totalTimeMS: difference,
      totalTime: minutes >= 60 ?
        `${hours} ${hours === 1 ? 'hr' : 'hrs'}, ${remMin} ${remMin === 1 ? 'min' : 'mins'}`
        : `${minutes} ${minutes === 1 ? 'min' : 'mins'}`,
      graceAvail: graceAvail,
      baseCost: baseCost,
    }


    const numberOfPeople = Number(visitorEntry.partySize.slice(0,1))
    const firstKey = numberOfPeople > 1 ? Number(count) - Number(visitorEntry.partySize.slice(2,3)) +1 : Number(count)

    let totalCost = 0

    for (let key = firstKey; key < (firstKey + numberOfPeople); key++) {
  // console.log('KEY: ' , key, ", firstKey, numberOfPeople: ", typeof firstKey, typeof numberOfPeople, firstKey + numberOfPeople)
        let under3 = this.props.visitors[key].under3
        let cost = this.adjustCost(key, baseCost, under3)
        totalCost += cost

      this.props.updateVisitorLog(key, Object.assign(visitorLog, { under3: under3, cost: cost }))
    }

    if (numberOfPeople > 1) {
      this.props.updateVisitorLog(count, {totalCost: totalCost})
    }
  }

    calculateBaseCost(difference, minutes) {
      const rate = this.state.rate  //$5
      const timeUnit = this.props.timeUnit  //30min

      let baseCost = (difference > 0 && minutes <= timeUnit) ? rate : Math.ceil(minutes/timeUnit)*rate // at least rate, otherwise rate times time
      return baseCost
    }

    adjustCost(key, baseCost, under3) {
      if (under3) { return 0 }
      else { return baseCost }

      //this.props.updateVisitorLog(key, update)
    }



  handleApplyGrace(evt) {
    //grace box doesn't appear unless total time is w/in 5 min outside timeUnit
    const rate = this.props.rate
    const key = evt.target.name
    const graceChecked = evt.target.checked

    const numberOfPeople = Number(visitorEntry.partySize.slice(0,1))
    const firstKey = numberOfPeople > 1 ? Number(count) - Number(visitorEntry.partySize(2,3)) +1 : Number(count)

    let totalCost = 0

    for (let key = firstKey; key < (firstKey + numberOfPeople); key++) {
        let cost = this.props.visitors[key].cost
        let baseCost = this.props.visitors[key].baseCost

        let newBaseCost = (graceChecked && (baseCost > rate)) ? (baseCost - rate) : baseCost
        let newCost = !this.props.visitors[key].under3 ? baseCost : 0
        totalCost += newCost

      this.props.updateVisitorLog(key, { cost: newCost })
    }

    if (numberOfPeople > 1) {
      this.props.updateVisitorLog((firstKey + numberOfPeople -1), {totalCost: totalCost})
    }

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

//TODO: edit handleDelete
  handleDelete() {
    this.props.deleteOneVisitor(this.state.popUpKey)
    console.log("hey delete")
    this.setState({
      showContextMenu: false,
      popUpIdx: null
    })
  }

//TODO: update to include multiple entries
  handleUndoCheckOut() {
    const key = this.state.popUpKey
    let undoObj = {
      checkedOut: false,
      checkOutTimeMS: null,
      checkOutTime: null,
      totalTimeMS: null,
      totalTime: null,
      graceAvail: null,
      baseCost: null,
    }
    this.props.updateVisitorLog(key, undoObj)
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


// --------------- RENDER ---------------
  render() {

    console.log('LOCAL STATE' ,this.state)

    let visitors = []
      for (let key in this.props.visitors) {
        visitors.push(this.props.visitors[key])
      }

    return(
      <div className="div-container">

          <Visitors
            visitors={visitors}
            names={this.state.names}
            visitorNum={this.state.visitorNum}
            name={this.state.name}
            times={this.state.times}
            newVisitorBtnText={this.state.newVisitorBtnText}
            showNameField={this.state.showNameField}
            addNewVisitor={this.addNewVisitor}
            checkOut={this.checkOut}
            handleChangeVisNum={this.handleChangeVisNum}
            handleChangeName={this.handleChangeName}
            changeNameField={this.changeNameField}
            onBlurNameField={this.onBlurNameField}
            handleApplyGrace={this.handleApplyGrace}
            handleChange={this.handleChange}
            checkEnter={this.checkEnter}
            handleChangeCheck={this.handleChangeCheck}
            handleContextMenu={this.handleContextMenu}
            handleChangeMinor={this.handleChangeMinor}
            handleChangeUnder3={this.handleChangeUnder3}
          />

        <div id="newVisitor-div">
          <form onSubmit={this.addNewVisitor} className="newVisitorForm">
            <input type="number" className="no-arrows" id="visitorNumInput" name="visitorNum" value={this.state.visitorNum} onChange={this.handleChangeVisNum} />
            <input type="submit" id="newVisitorBtn" defaultValue={this.state.newVisitorBtnText}/>
          </form>
        </div>

        { this.state.showContextMenu &&
          <RightClick
            id="popUp"
            popUpX={this.state.popUpX}
            popUpY={this.state.popUpY}
            handleDelete={this.handleDelete}
            checkedOut={this.props.visitors[this.state.popUpKey].checkedOut}
            handleUndoCheckOut={this.handleUndoCheckOut}
          />
        }

        { this.state.showCtrlPanel &&
        <div className="ctrl" id="ctrlMenu">
        Entrance Fee:
        <br />
        <form onSubmit={this.handleCtrlSubmit}>
          $<input type="number" name="rate" id="ctrl1" className="number-ctrl" value={this.state.rate} onChange={this.handleChange('rate')} /> per
          <input type="number" name="timeUnit" id="ctrl2" className="number-ctrl" value={this.state.timeUnit} onChange={this.handleChange('timeUnit')} /> minutes
          <input type="submit" defaultValue="change" id="ctrlbtn"/>
        </form>
        </div>
        }

      </div>
    )
  }

})



