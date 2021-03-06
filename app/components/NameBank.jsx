import React, { Component } from 'react'

import { getAllNames, getAllTags, addOneTag, addOneName, removeNameFromList } from '../reducers/names'
import { connect } from 'react-redux'
import RightClick from './RightClick'
import { ChromePicker } from 'react-color'


const mapState = (state) => ({
  allNames: state.names.names,
  allTags: state.names.tags
})

const mapDispatch = { getAllNames, getAllTags, addOneTag, addOneName, removeNameFromList }


export default connect(mapState,mapDispatch)(class NameBank extends Component {

  constructor(props) {
    super(props)

    this.state = {
      addName: '',
      description: '',
      selectedTags: [],
      sort: 'alltags',
      keyArr: [],
      showSelectConfirm: false,
      showCtrlPanel: false,
      newTag: '',
      sampleTagColor: 'grey',
      showColorPicker: false,
      renderedList: [],
      headerDivColor: '#464646',
      selectedName: '',
      selectedKey: '',
      selectedDescrip: '',
      nameF: '',
      dirty: false,
      warnDuplicate: false,
      duplicateMsg: '',
    }

    this.handleAddNameSubmit = this.handleAddNameSubmit.bind(this)
    this.keysPressed = this.keysPressed.bind(this)
    this.handleCtrlSubmit = this.handleCtrlSubmit.bind(this)
    this.ctrlPanelClose = this.ctrlPanelClose.bind(this)
    this.renderTags = this.renderTags.bind(this)
    this.handleClickTag = this.handleClickTag.bind(this)
    this.sortAlpha = this.sortAlpha.bind(this)
    this.groupSort = this.groupSort.bind(this)
    this.formatListSection = this.formatListSection.bind(this)
    this.renderList = this.renderList.bind(this)
    this.selectName = this.selectName.bind(this)
    this.chooseName = this.chooseName.bind(this)
    this.showHint = this.showHint.bind(this)
    this.clickSampleTag = this.clickSampleTag.bind(this)
    this.randomPic = this.randomPic.bind(this)

    this.handleChange = (field) => (evt) => {
      this.setState({ [field]: evt.target.value })
    }

    this.handleChangeDropDown = field => evt => {
      const { value } = evt.target
      this.setState({ [field]: value })

      if (field === 'sort') {
        this.props.allTags.forEach(tagObj => {
          if (tagObj.tagName === value) {
            this.setState({ headerDivColor: ` ${tagObj.color}` })
          }
        })
      }
    }

    this.handleChangeBool = field => evt => {
      evt.preventDefault()
      this.setState({ [field]: !this.state[field] })
    }

    this.handleChangeComplete = (color, event) => {
      this.setState({ sampleTagColor: color.hex })
    }

  }


  componentDidMount() {
    window.addEventListener('keydown', this.keysPressed, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keysPressed, false)
  }

  keysPressed(evt) {
    let keys = this.state.keyArr
    keys[evt.keyCode] = true
    this.setState({ keyArr: keys })
    // ctrl, alt, m

    if (keys[17] && keys[18] && keys[77]) {
      this.setState({ showCtrlPanel: true })
      window.addEventListener('click', this.ctrlPanelClose, false)
    }
  }

  handleCtrlSubmit(evt) { //add new tag
    evt.preventDefault()
    this.props.addOneTag({
      tagName: this.state.newTag,
      color: this.state.sampleTagColor ? this.state.sampleTagColor : null
    })
    this.setState({
      newTag: '',
      showCtrlPanel: false,
      sampleTagColor: 'grey',
      keyArr: []
    })
    window.removeEventListener('click', this.ctrlPanelClose, false)
  }

  clickSampleTag(evt) {
    evt.preventDefault()
    this.setState({ showColorPicker: !this.state.showColorPicker })
  }

  ctrlPanelClose(evt) {
    if (evt.target.id === 'ctrlClose') {
      this.setState({
        showCtrlPanel: false,
        keyArr: []
      })
      window.removeEventListener('click', this.ctrlPanelClose, false)
    }
  }

  renderTags(tagsArr) {
    return tagsArr.map((tagObj, idx) => {
      let classes = `tag ${tagObj.color && tagObj.color[0] !== '#' ? tagObj.color : 'tag99'}`
      let style = { backgroundColor: tagObj.color && tagObj.color[0] === '#' ? tagObj.color : null }
      return (<button key={`${tagObj.key}-${idx}`} className={classes} style={style} id={tagObj.key} onClick={this.handleClickTag} >{tagObj.tagName}</button> )
    })
  }

  handleClickTag(evt) {
    evt.preventDefault()
    const tagKey = evt.target.id

    const tagIndex = this.state.selectedTags.map(obj => obj.key).indexOf(tagKey)

    let updatedTagList
    if (tagIndex === -1) { //if not already selected
      let newTag
      for (let idx in this.props.allTags) {
        if (this.props.allTags[idx].key === tagKey) {
          newTag = this.props.allTags[idx]
          updatedTagList = [...this.state.selectedTags, newTag]
        }
      }
    } else {
      updatedTagList = this.state.selectedTags.slice(0, tagIndex).concat(this.state.selectedTags.slice(tagIndex+1))
    }

    this.setState({ selectedTags: updatedTagList })
  }


  sortAlpha(arrayOfObj) {
    return arrayOfObj.sort((a,b) => {
      let newA, newB

      if (a.name) {
        newA = a.name
        newB = b.name
      } else  {
        newA = a[0].name
        newB = b[0].name
      }

      let x = 0
      while (x < newA.length || x < newB.length) {
        let aNum = newA.toLowerCase().charCodeAt(x)
        let bNum = newB.toLowerCase().charCodeAt(x)

        if (aNum !== bNum) { return aNum - bNum }
        else if (!aNum) { return 1 }
        else if (!bNum) { return -1 }
        else { x++ }
      }
    })
  }

  groupSort (arrayOfObj) {
    let sortedArr = []
      arrayOfObj.forEach(nameObj => {
        if (!nameObj.theme) { //if single name
          sortedArr[0] ? sortedArr[0].push(nameObj) : sortedArr[0] = [nameObj]
        } else {  //if not single name
          //idx = number at end of theme -1
          let idx = Number(nameObj.theme[nameObj.theme.length-1] - 1)
          let match = false

          if (sortedArr[idx]) {
            //search for match in sortedArray
            sortedArr[idx].forEach(innerNameArr => {
              if (innerNameArr[0].theme === nameObj.theme) {
                innerNameArr.push(nameObj)
                match = true
              }
            })
            //if partner(s) is/are not already in sortedArray, start new element
            if (!match) sortedArr[idx].push([nameObj])
          } else {
            sortedArr[idx] = [[nameObj]]
          }
        }
      })
    //sortedArr looks like:
    //  [[1, 1, 1], [[ 2, 2 ], [ 2, 2 ]], [[ 3, 3, 3 ], [ 3, 3, 3 ]] ], where numbers are nameObjs
    return sortedArr
  }

  formatListSection(arrSection) {
    let listTitle
    if (arrSection[0].name) { listTitle = "Singles" }
    else if (arrSection[0].length === 2) { listTitle = "Pairs" }
    else if (arrSection[0].length === 3) { listTitle = "Triplets" }
    else if (arrSection[0].length === 4) { listTitle = "Quartets" }
    else { listTitle = `Groups of ${arrSection[0].length}` }

    let show, keyValue
    let names = arrSection.map((nameGroup, idx) => {
      if (nameGroup.name || nameGroup.name === "") {
        show = nameGroup.name
        keyValue = nameGroup.key
      } else { //if array
        show = []
        keyValue = []
        nameGroup.forEach(name => {
          show.push(name.name)
          keyValue.push(name.key)
        })
        show = show.join(", ")
        keyValue = keyValue.join(", ")

      }

      return (<a className="name-link" key={`${nameGroup}-${idx}`} onClick={this.selectName}><li className="name" id={keyValue}>{show}</li></a>)
    })

    return (
      <div key={`nameGroup-${arrSection[0].length}`}>
         <h4>{listTitle}</h4>
         <ul>{names}</ul>
      </div> )
  }

  renderList(arrayOfNames) {
    let filteredArr
    // if applicable, filter by tag
    this.props.allTags.forEach(tagObj => {
      if (tagObj.tagName === this.state.sort) {
        filteredArr = arrayOfNames.filter(nameObj => {
          if (nameObj.tags) {
            return nameObj.tags.includes(this.state.sort)
          }
        })
      }
    })

    const arr = filteredArr ? filteredArr : arrayOfNames

    //sort by group size
    const renderedList = this.groupSort(arr).map(array => {
      return this.sortAlpha(array)
    })

    return renderedList
    // switch (this.state.sort) {
    //   case 'date': //not grouped
    //     return arr.sort((a,b) => { return a.time - b.time })
    //     break
    //   case 'alpha': //not grouped
    //     return this.sortAlpha(arr)
    //     break
    //   default: //grouped

    //}
  }

  showHint(evt) {
    evt.preventDefault()
    this.setState({
      dirty: true,
      warnDuplicate: false
    })
  }

  handleAddNameSubmit(evt) {
    evt.preventDefault()

    const justTagNames = this.state.selectedTags.length ? this.state.selectedTags.map(tagObj => tagObj.tagName) : null
    let description = this.state.description.trim()
    let name = this.state.addName.trim() ? this.state.addName.trim() : null //trim any surrounding white space
    if (name) {
        if (name[0] === "\"" && name[name.length-1] === "\"" || name[0] === "\'" && name[name.length-1] === "\'") {
          //trim quotes
          name = [name.slice(1, name.length-1).trim()]
        } else if (!name.includes(",")) {
          name = [name]
        } else {
          name = name.split(",").map(name => name.trim())
        }

        let duplicate = false
        this.props.allNames.forEach(nameObj => {
          if (nameObj.theme === `${name}-${name.length}`) {
            this.setState({
              duplicateMsg: 'these names are',
              warnDuplicate: true
            })
            duplicate = true
          } else if (!nameObj.theme && nameObj.name === name[0]) {
            this.setState({
              duplicateMsg: 'this name is',
              warnDuplicate: true,
            })
            duplicate = true
          }
        })

        if (!duplicate) {
          name.forEach((oneName, idx) => {
            this.props.addOneName({
              name: oneName,
              description: description ? description : null,
              tags: justTagNames,
              theme: name.length > 1 ? `${name}-${name.length}` : null
            })
          })

          this.setState({
            dirty: false,
            keyArr: [],
            addName: '',
            description: '',
            selectedTags: []
          })
        }
    }
  }

  selectName(evt) {
    evt.preventDefault()
    const keyStr = evt.target.id
    const nameStr = evt.target.innerHTML
    let nameF, selectedDescrip

    //search to see if group (theme)
     this.props.allNames.forEach(nameObj => {

        if (nameObj.key === keyStr) { //if single name
          nameF = `name ${nameObj.name}`
          selectedDescrip = nameObj.description
        } else if (keyStr === 'close') { //if hitting close button
          this.setState({
            showSelectConfirm: false
          })
        } else {
          const keys = keyStr.split(", ")
          const names = nameStr.split(", ")
          if (nameObj.key === keys[0].trim()) { //if group
            selectedDescrip = nameObj.description
            //description same for group
          }

          if (keys.length === 2) {
            nameF = `names ${names[0]} and ${names[1]}`
          } else if (keys.length > 2) {
            let names1 = names.slice(0, names.length-1).join(", ")
            let names2 = names[names.length-1]
            nameF = `names ${names1}, and ${names2}`
          }
        }
      })

    if (keyStr !== 'close') {
      this.setState({
        selectedName: evt.target.innerHTML,
        selectedDescrip: selectedDescrip,
        selectedKey: evt.target.id,
        nameF: nameF,
        showSelectConfirm: !this.state.showSelectConfirm
      })
    }
  }

  chooseName(evt) {
    evt.preventDefault()
    this.setState({ showSelectConfirm: false })

    let key
    //search names to see if group (theme)
    this.props.allNames.forEach(nameObj => {
      if (nameObj.key === this.state.selectedKey) { //if single name
        this.props.removeNameFromList(this.state.selectedKey)
      } else {
        this.state.selectedKey.split(",").forEach(key => {
          this.props.allNames.forEach(nameObj => {
            if (nameObj.key === key.trim()) {
              this.props.removeNameFromList(nameObj.key)
            }
          })
        })
      }
    })

    this.setState({
      selectedName: '',
      selectedKey: '',
      selectedDescrip: '',
      nameF: ''
    })
  }

  randomPic() {
    //catbg#.png
    let num = 7
    //num = number of pics
    let arr = []
    for (let x=0; x < num; x++) {
      arr.push(`catbg${x}.png`)
    }

    let part = 10.0/num
    let pick = Math.random()*10
    let idx = Math.round(pick/part)

    return arr[idx]
  }


// --------------- RENDER ---------------
  render() {

    // console.log('state', this.state)
    // console.log('props', this.props)


    return (
      <div className="container">
        <div className="cat-bg"></div>

        {// --------------- sort dropdown ---------------
        }
        <div className="div-space" style={{ backgroundColor: this.state.headerDivColor }}>
          <form>
          <label>➣ &nbsp;
          <select onChange={this.handleChangeDropDown('sort')} defaultValue="alltags">

                <optgroup label="group size, by tag">
                <option value="alltags">all</option>
                {
                  this.props.allTags.map((tagObj, idx) => {
                    return (<option key={`tag-${idx}`} value={tagObj.tagName}>{tagObj.tagName}</option>)
                  })
                }
                </optgroup>

                {// <option value="alpha">alphabetical</option>
                // <option value="date">by date added</option>
}
          </select>
          </label>
          </form>
        </div>

        <div className= "slice2"></div>

        {// --------------- name list ---------------
        }

        <div className="cat-bg1">


            {
              this.props.allNames ?

              this.renderList(this.props.allNames)
               .map((nameArr, idx) => {
                  return (
                  <span key={idx}>
                    <div className="div-space almostwhite">
                      {this.formatListSection(nameArr)}
                    </div>
                    <div className="slice" style={{ background: `url(img/catbg${idx}.png) 20% 10%/100% auto` }}> &nbsp;</div>
                  </span>
                  )
                })

              : null
            }


        </div>
        <div className="almostwhite"></div>

        {// step1: ------------- add name ---------------
        }
        <div className="div-space almostwhite">
            <form onSubmit={this.handleAddNameSubmit}>
              <label>Add a Name: &nbsp;
                <br/>
                <input type="text" className="nameadd" id="addName" value={this.state.addName} onChange={this.handleChange('addName')} onClick={this.showHint} />
              </label>
                { this.state.dirty && !this.state.warnDuplicate ?
                <div className="small"><img src="img/arrow.svg" /> To enter related names, separate by commas.  To enter a single name containing a comma, surround the name with quotes.<br/>

                  <textarea
                    id="nameadd-descrip"
                    className="nameadd"
                    maxLength="100"
                    placeholder="optional: add a short description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}/>
                </div>

                : null
                }
                { this.state.warnDuplicate &&
                  <div className="small">Hey, {this.state.duplicateMsg} already on the list!</div>
                }

              {
                this.state.selectedTags ?
                this.renderTags(this.state.selectedTags)
                : null
              }


                <input id="submit-btn-cat" type="submit" defaultValue=""/>
                <br />



            </form>
        </div>

        <div className="div-space slice3">
            {
              this.renderTags(this.props.allTags)
            }
        </div>

        { // --------------- nameselect panel ---------------
          this.state.showSelectConfirm &&

          <div className="selectConfirm" id="selectConfirm">
            <div id="selectConfirm-text">
              {this.state.selectedDescrip ?
                <p className="block selectConfirm">{this.state.selectedDescrip}</p>
                : null}
              <p className="block selectConfirm">Would you like to use the {this.state.nameF}? &nbsp;
              <span className="small">This will take the {this.state.nameF.split(' ')[0]} off the list.</span>
              </p>
            </div>

            <button className="name-yes" onClick={this.chooseName}>Yes, I'm using {this.state.nameF.split(' ')[0] ==='name' ? 'it' : 'them'}! </button>
            <button className="name-no" onClick={this.selectName} id="close">No, not today</button>

          </div>
        }

        { // --------------- ctrl panel ---------------
          this.state.showCtrlPanel &&

          <div className="ctrl" id="ctrlMenu2">
            <form onSubmit={this.handleCtrlSubmit}>
              <label>Add a New Tag: <br />

                <input type="text" name="newTag" id="ctrl1" value={this.state.newTag} className="tag-ctrl" onChange={this.handleChange('newTag')} />
              </label>

              <label>{ !this.state.showColorPicker ? (this.state.sampleTagColor === 'grey' ? 'Click to Pick a Color:' : 'Tag preview:') : 'Click tag again when done.' }</label> <br/>

                <button className="tag" style={{ backgroundColor: this.state.sampleTagColor }} id="ctrl2" onClick={this.clickSampleTag}>{this.state.newTag}</button>
                { this.state.showColorPicker &&
                  <ChromePicker
                    color={this.state.sampleTagColor}
                    onChangeComplete={this.handleChangeComplete}
                  />
                }
                <br />
                <br />
                <input type="button" defaultValue="cancel" className="ctrlbtn-tag" id="ctrlClose" />
                <input type="submit" defaultValue="add" className="ctrlbtn-tag"/>

            </form>
          </div>
        }

      </div>)
  }

})
