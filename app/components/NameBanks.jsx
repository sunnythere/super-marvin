import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getAllNames, getAllTags, addOneTag, addOneName, getOneName, deleteAName, removeNameFromList } from '../reducers/names'
import { connect } from 'react-redux'
import RightClick from './RightClick'


const mapState = (state) => ({
  allNames: state.names.names,
  allTags: state.names.tags
})

const mapDispatch = { getAllNames, getAllTags, addOneTag, addOneName, getOneName, deleteAName, removeNameFromList }


export default connect(mapState,mapDispatch)(class NameBank extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      addName: '',
      tagsFormatted: '',
      keyArr: [],
      selectedName: '',
      nameF: '',
      selectedTags: [],
      newTag: '',
      sort: 'groupSize',
      showSelectConfirm: false
    }

    this.checkEnter = this.checkEnter.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.keysReleased = this.keysReleased.bind(this)
    this.keysPressed = this.keysPressed.bind(this)
    this.ctrlPanelClose = this.ctrlPanelClose.bind(this)
    this.handleCtrlSubmit = this.handleCtrlSubmit.bind(this)
    this.warningClose = this.warningClose.bind(this)
    this.handleClickTag = this.handleClickTag.bind(this)
    this.renderTags = this.renderTags.bind(this)
    this.handleAddNameChange = this.handleAddNameChange.bind(this)
    this.handleAddNameSubmit = this.handleAddNameSubmit.bind(this)
    this.renderList = this.renderList.bind(this)
    this.renderListGroupSize = this.renderListGroupSize.bind(this)
    this.selectNamePop = this.selectNamePop.bind(this)
    this.chooseName = this.chooseName.bind(this)

    this.handleChange = (field) => (evt) => {
      evt.preventDefault()
      this.setState({ [field]: evt.target.value })
    }

    this.handleChangeDropDown = field => evt => {
      const { value } = evt.target
      this.setState({ [field]: value })
    }

  }


  componentDidMount() {
    this.props.getAllNames()
    this.props.getAllTags()

    window.addEventListener('keydown', this.keysPressed, false)
    window.addEventListener('keyup', this.keysReleased, false)
  }

  componentWillUnmount() {
    this.props.getAllNames()()
    this.props.getAllTags()()

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
    this.props.addOneTag({ tagName: this.state.newTag})
    this.setState({ newTag: '' })
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


  contextMenuClose(evt) {
    evt.preventDefault()
    if (evt.target.id !== 'popUp') {
      this.setState({
        showContextMenu: false,
        popUpIdx: null
      })
      window.removeEventListener('click', this.contextMenuClose, false)
   }
  }

  warningClose(evt) {
    evt.preventDefault()
    if(evt.target.id !== 'warning') {
      this.setState({ showWarning: false })
      window.removeEventListener('click', this.warningClose, false)
   }
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

  renderTags(tagsArr) {
    return tagsArr.map((tag, idx) => {
      return (<button key={`${tag.key}-${idx}`} className={`tag ${tag.color}`} id={tag.key} onClick={this.handleClickTag}>{tag.tagName}</button> )
    })
  }

  handleAddNameChange(evt) {
    evt.preventDefault()
    this.setState({ addName: evt.target.value })
  }

  handleAddNameSubmit(evt) {
    evt.preventDefault()

    const justTagNames = this.state.selectedTags.map(tagObj => tagObj.tagName)

    let name = this.state.addName.trim() //trim any surrounding white space
    if (name[0] === "\"" && name[name.length-1] === "\"" || name[0] === "\'" && name[name.length-1] === "\'") {
      //trim quotes
      name = [name.slice(1, name.length-1)]
    } else if (!name.includes(",")) {
      name = [name]
    } else {
      name = name.split(",")
    }

    name.forEach((oneName, idx) => {
      this.props.addOneName({
        name: oneName,
        tags: justTagNames,
        theme: name.length > 1 ? `${name[0]}-${name.length}` : null
      })
    })

    this.setState({
      keyArr: [],
      addName: '',
      selectedTags: []
    })
  }

  renderList(nameArr) {
    let arr = []
    let nameArrFilter = nameArr
    switch (this.state.sort) {

      case 'date':
        arr = nameArr.sort((a, b) => a.time - b.time)
        break
      case (this.props.allTags.includes(this.state.sort)):
        nameArrFilter = nameArr.filter(nameObj => {
            return nameObj.tags && nameObj.tags.includes(this.state.sort)
        })
      default:
      console.log('nameArrFilter' , nameArrFilter)
        nameArrFilter.forEach(nameObj => {
          if (!nameObj.theme) {
            arr[0] ? arr[0].push(nameObj) : arr[0] = [nameObj]
          } else {
            let size = Number(nameObj.theme[nameObj.theme.length-1])

            let match = false
            if (arr[size-1]) {
              arr[size-1].forEach(innerNameArr => {
                if (innerNameArr[0].theme === nameObj.theme) {
                  innerNameArr.push(nameObj)
                  match = true
                }
              })
              if (!match) arr[size-1].push([nameObj])
            } else {
              arr[size-1] = [[nameObj]]
            }

          }
            // [[1, 1, 1],
            //  [[ 2, 2 ], [ 2, 2 ]],
            //  [[ 3, 3, 3 ], [ 3, 3, 3 ]] ]
        })
    }
console.log('arr', arr)
    return arr
  }

  renderListGroupSize(arr) {
      let listTitle, show
      if (arr[0].name) { listTitle = "Singles" }
      else if (arr[0].length === 2) { listTitle = "Pairs" }
      else if (arr[0].length === 3) { listTitle = "Triplets" }
      else if (arr[0].length === 4) { listTitle = "Quartets" }
      else { listTitle = `Groups of ${arr[0].length + 1}` }

      let names = arr.map((nameGroup, idx) => {
        if (nameGroup.name) { show = nameGroup.name }
        else { //if array
          //show = nameGroup.map(name => name.name).sort().join(", ")
        }

        return (<a href="#" className="name-link" key={`${nameGroup}-${idx}`} onClick={this.selectNamePop}><li id={show}>{show}</li></a>)
      })

      return (
          <div key={`nameGroup-${arr[0].length}`}>
             <h4>{listTitle}</h4>
             <ul>{names}</ul>
          </div> )
  }

  selectNamePop(evt) {
    evt.preventDefault()

    const name = evt.target.id
    let nameF

    if (name.includes(", ")) {
      const names = name.split(", ")
      if (names.length === 2) {
        nameF = `names ${names[0]} and ${names[1]}`
      } else {
        let names1 = names.slice(0, names.length-1).join(", ")
        let names2 = names[names.length-1]
        nameF = `names ${names1}, and ${names2}`
      }
    } else { nameF = `name ${name}` }

    this.setState({
      selectedName: evt.target.id,
      nameF: nameF,
      showSelectConfirm: !this.state.showSelectConfirm
    })
  }

  chooseName(evt) {
    evt.preventDefault()
    this.setState({
      showSelectConfirm: !this.state.showSelectConfirm
    })

    let key
    this.state.selectedName.split(", ").forEach(name => {
      this.props.allNames.forEach(nameObj => {
        if (nameObj.name === name) {
          key = nameObj.key
        }
      })
      this.props.removeNameFromList(key)
    })

    this.setState({
      selectedName: '',
      nameF: ''
    })
  }


// --------------- RENDER ---------------
  render() {

console.log('props ', this.props)
console.log('state', this.state)


    return (
      <div className="container">

        <div className="div-space">

      <label>sort: </label>
      <select onChange={this.handleChangeDropDown('sort')} defaultValue="groupSize">

            <option value="groupSize">by group size</option>
            <option value="alpha">alphabetical</option>
            <optgroup label="by tag">
            {
              this.props.allTags.map((tag, idx) => {
                return (<option key={`tag-${idx}`} value={tag.tagName}>{tag.tagName}</option>)
              })
            }
            </optgroup>
            <option value="date">by date added</option>

          </select>

        </div>
        <div className="div-space">
        {// --------------- names ---------------
        }

            {
            //   this.props.allNames.length && this.state.sort === 'groupSize' ?

            //   <ul>
            //     {
            //       this.renderList(this.props.allNames)
            //         .map((name, idx) => {
            //         return (<a href="#" className="name-link" key={`${name}-${idx}`} onClick={this.selectNamePop}><li id={name.name}>{name.name}</li></a>)
            //       })
            //     }
            //   </ul>
            //   : null
             }

            {
              this.props.allNames.length ?
              this.renderList(this.props.allNames)
                .map((arr)=>{
                  return this.renderListGroupSize(arr)
                })
              : null
            }

        </div>

      <hr />

        <div className="div-space">
{// step1: ------------- add name ---------------
}
            <form onSubmit={this.handleAddNameSubmit}>
              <label>Add a Name: &nbsp;
                <br/>
                <input type="text" className="nameadd" id="addName" value={this.state.addName} onChange={this.handleAddNameChange}/>
              </label>

              {
                this.state.selectedTags ?
                this.renderTags(this.state.selectedTags): null
              }
              <br />
               <input className="submit-btn" type="submit" defaultValue="Add"/>
               <br />


              { this.renderTags(this.props.allTags)
              }


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
          <div className="ctrl" id="ctrlMenu2">
          Add a New Tag:
          <br />
          <form onSubmit={this.handleCtrlSubmit}>
            <input type="text" name="newTag" id="ctrl1" value={this.state.newTag} className="tag-ctrl" onChange={this.handleChange('newTag')} />
            <input type="submit" defaultValue="add" id="ctrlbtn"/>
          </form>
          </div>
        }

        {
          this.state.showSelectConfirm &&
          <div className="selectConfirm" id="selectConfirm">
          {

          }
          Would you like to use the {this.state.nameF}?
          <br/><span className="small">This will take the name(s) off the list.</span>
          <br />
          <button className="name-yes" onClick={this.chooseName}>Yes, I'm using it! </button>
          <button className="name-no" onClick={this.selectNamePop}>No, not today</button>
          </div>
        }

      </div>
    )
  }

})



