import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { addACat, oneCat } from '../reducers/feline'
import { calcAge } from '../util/age'

class AddCat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      b_nameValid: true,
      rescuer: '',
      b_records: true,
      breed: '',
      calendarType: 'date',
      dob: '',
      dob2: '',
      showCalendar: '',
      twoCals: false,
      hoverStyle: {},
      gender: '',
      colorArr: [],
      description: '',
      needsPartner: '',
      partnerCat: '',
      newPartnerCat: '',
      b_atCafe: false,
      adoptedYr: '',
      b_wallPic: false,
      b_staffGuidePic: false,
      vaccinations: '',
      weight: {},
      notes: '',
      status: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.clearFields = this.clearFields.bind(this)
    this.toggleCalendar = this.toggleCalendar.bind(this)
    this.isHovering = this.isHovering.bind(this)
    this.isNotHovering = this.isNotHovering.bind(this)
    this.handleChangePartner = this.handleChangePartner.bind(this)
    this.handleChangePartnerName = this.handleChangePartnerName.bind(this)
    this.handleAdditionPartnerName = this.handleAdditionPartnerName.bind(this
                                                                         )
    this.handleScroll = this.handleScroll.bind(this)

    this.handleChange = field => evt => {
        const { value } = evt.target
        if (value === 'dob') {
          console.log('value ', value)
          //this.setState({ [field]: value })
        } else {
          this.setState({ [field]: value })
        }
      }

    this.handleChangeDropDown = field => evt => {
      const { value } = evt.target
      this.setState({ [field]: value })
    }
  }


//(event, index, value) => this.setState({value});
handleChangeColor(evt) {
  const { value } = evt.target
  const newColorArr = this.state.colorArr.concat(value)
  this.setState({ colorArr: newColorArr })
}

handleSubmit(evt) {
  evt.preventDefault()
  let newCat = {
      name: this.state.name,
      rescuer: this.state.rescuer,
      gender: this.state.gender,
      colorArr: this.state.colorArr,
      description: this.state.description,
      needsPartner: this.state.needsPartner,
      partnerCat: this.state.partnerCat,
      notes: this.state.notes,
      breed: this.state.breed,
      dob: this.state.dob2 ? `${this.state.dob}-${this.state.dob2}` : this.state.dob,
    }
  this.props.addACat(newCat)
  this.props.oneCat(newCat)

    browserHistory.push('/onecat')

}


removeColor(idx) {
  const updatedColorArr = this.state.colorArr.slice(0,idx).concat(this.state.colorArr.slice(idx + 1))
  this.setState({ colorArr: updatedColorArr })
}

clearFields() {
  const stateKeysArr = Object.keys(this.getState())
  stateKeysArr.map((key) =>{
    if (key.slice(0,2) !== 'b_') this.setState({ [`${key}`]: '' })
  })
}

toggleCalendar(evt) {
  let calType = evt.target.name
  if (calType === 'date' || calType === 'week' || calType === 'month') {
    this.setState({
      calendarType: evt.target.name,
      twoCals: false
    })
  } else if (calType === 'year') {
    this.setState({
      calendarType: 'number',
      twoCals: false
    })
  } else if (calType === 'yearspan') {
    this.setState({
      calendarType: 'number',
      twoCals: true
    })
  }
}

isHovering() {
  this.setState({ hoverStyle: { cursor: 'pointer', borderBottom: '2px dotted rgb(40,40,40)'} })
}

isNotHovering() { this.setState({ hoverStyle: {} }) }

handleChangePartner(evt) {
  const { value } = evt.target
  if (value === 'yes') this.setState({ needsPartner: true })
  else if (value === 'no') this.setState({ needsPartner: false })
}

handleAdditionPartnerName(evt)  {
  const { value } = evt.target
  this.setState({ newPartnerCat: value })
}

handleChangePartnerName(evt) {
  const { value } = evt.target
  this.setState({ partnerCat: value })
}

handleScroll(evt) {
  evt.preventDefault()
  console.log('number, detail ', evt.detail)
  console.log('DOMAbstractView, view ', evt.view)
}

render() {
    console.log('LOCAL STATE ', this.state)

    const colorChoices= [ 'black',
                          'white',
                          'grey',
                          'orange',
                          'brown tabby',
                          'grey tabby',
                          'orange tabby',
                          //'spots',
                          'tortie',
                          'calico' ]

    const colorDropDown = colorChoices.sort().map((color, idx) => {
                    let colorName = color.includes(' ') ? color.split(' ').join('') : color

                    return ({ text: color,
                              name: colorName,
                              value: colorName,
                              image: { avatar: true,
                                       src: `/img/fur${colorName}.png`} })
                    })

    const allCatsNameList = this.props.allCats.map(cat =>{
      return ({ text: cat.name,
                name: cat.name,
                value: cat.key })
    })


    const style = {
      column: { padding: '0px' },
      row: { padding: '.5rem 0'},
      rowCalMenu: { padding: '.5rem 0 0 0', textAlign: 'bottom'},
      rowCal: { padding: '0 0 .5rem 0'},
      columnCalMenu: { 'paddingLeft': 0, 'verticalAlign': 'bottom'},
      inputW: { width: '16rem'},
      textW: { width: '20rem'},
      columnRadio: { width: '100px' },
      height: { height: '100%'},
      topPadding: { padding: '.8rem'},
      colorDiv: { minHeight: '4rem', width: '60%', padding: '0px'},
      span: { display: 'inline-block', margin: '.5rem'},
      xsmall: { textSize: 'x-small' }
    }

    const d = new Date()
    const thisYear = d.getFullYear()



  return (
    <div onScroll={this.handleScroll} className="div-container-mobile">

      <h3>Add a Cat</h3>
<form>
{/* --------------------name---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">
      Cat's Name
    </label>
  </div>
  <div className="fifty-lg hundred-sm">
    <input
        type="text"
        placeholder="name here"
        value={this.state.name}
        onChange={this.handleChange("name")}
        />
  </div>
<br />
{/* -------------------rescuer-------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">
      Rescuer's Name
    </label>
  </div>
  <div className="fifty-lg hundred-sm">
    <input
        type="text"
        placeholder="rescuer"
        value={this.state.rescuer}
        onChange={this.handleChange("rescuer")}
        />
  </div>
<br />
{/* --------------------dob---------------------- */}
  <div className="right-align fifty-lg dob-spacer hundred-sm">
    <label htmlFor="name" className="label">
       DOB
    </label>
  </div>
  <div className="fifty-lg hundred-sm">
                <a href='#' onClick={this.toggleCalendar}
                  name='date'
                  className='xsmall'>exact date</a>
                &nbsp; | &nbsp;
                <a href='#'
                  onClick={this.toggleCalendar}
                  name='week'
                  className='xsmall'>approx. week</a>
                &nbsp; | &nbsp;
                <a href='#'
                  onClick={this.toggleCalendar}
                  name='month'
                  className='xsmall'>approx. month</a>
                &nbsp; | &nbsp;
                <a href='#'
                  onClick={this.toggleCalendar}
                  name='year'
                  className='xsmall'>year</a>
                &nbsp; | &nbsp;
                <a href='#'
                  onClick={this.toggleCalendar}
                  name='yearspan'
                  className='xsmall'>year range</a>
    { this.state.calendarType !== 'number' &&
    <input
      type={this.state.calendarType}
      value={this.state.dob}
      onChange={this.handleChange("dob")}
    />
    }

      { this.state.calendarType === 'number' &&
      <input
        type={this.state.calendarType}
        min={1990}
        max={thisYear}
        value={this.state.dob}
        onChange={this.handleChange("dob")}
        placeholder='Approx Year'
      />
      }

      { this.state.twoCals &&
      <input
        type={this.state.calendarType}
        min={1990}
        max={thisYear}
        value={this.state.dob2}
        onChange={this.handleChange("dob2")}
        placeholder='Approx Year'
      />
      }

  </div>
<br />

{/* --------------------age---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">
      Age:
    </label>
  </div>
  <div className="fifty-lg hundred-sm">
      <div id="age-div">
        {calcAge(this.state.dob)}
      </div>
  </div>
<br />

{/* --------------------gender---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">   Gender
    </label>
  </div>
  <div className="fifty-lg">

    <div className="dropdown-div fifty-lg hundred-sm">
      <select onChange={this.handleChangeDropDown('gender')}
              defaultValue='gender'>

        <option value="M">M</option>
        <option value="F">F</option>
      </select>
    </div>

  </div>
<br />

{/* --------------------breed---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">   Breed
    </label>
  </div>
  <div className="fifty-lg">

    <div className="dropdown-div fifty-lg hundred-sm">
      <select onChange={this.handleChangeDropDown('breed')}>
        <option selected>Breed</option>
        <option value="shortahir">American Shorthair Mix</option>
       <option value="longhair">American Longhair Mix</option>
      </select>
    </div>

  </div>
<br />
{/* --------------------color---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="breed" className="label">   Color
    </label>
  </div>
  <div className="fifty-lg hundred-sm">

    <div className="dropdown-div inline">
      <select onChange={this.handleChangeDropDown('color')}>
        <option selected>Color</option>
        <option value="shortahir">American Shorthair Mix</option>
        <option value="longhair">American Longhair Mix</option>
      </select>
    </div>

  </div>
<br />

              {
              // this.state.colorArr && this.state.colorArr.map( (color, idx) => {

              //   let colorName = color.includes(' ') ? color.split(' ').join('') : color
              //   let img =`img/fur${colorName}.png`
              //     return (
              //       <span style={style.span} key={idx}>
              //         <Label image size='medium'>
              //           <Image avatar spaced='right'
              //           src={img} />
              //           {color}
              //           <Icon name='delete' onClick={() =>this.removeColor(idx)}/>
              //         </Label>
              //       </span>
              //     )
              // })
              }

{/* --------------------phys descrip---------------------- */}
  <div className="right-align fifty-lg textarea-spacer hundred-sm">
    <label htmlFor="physdescrip" className="label">
      Additional Physical Description?
    </label>
  </div>
  <div className="fifty-lg hundred-sm">

        <textarea className="pt-input"  dir="auto"
          onChange={this.handleChange("description")}
          value={this.state.description}
          placeholder='ie., bright blue eyes, white spot on toe, puffy striped tail, etc...'
          />
  </div>
  <br />
{/* --------------------partner---------------------- */}
  <div className="right-align fifty-lg partner-spacer hundred-sm">
    <label htmlFor="partner" className="label">
      Needs a Partner?
    </label>
  </div>
  <div className="fifty-lg hundred-sm">
    &nbsp; &nbsp;
    no <input type="radio" name="partner" value="no" onClick={this.handleChangePartner}/>
    yes <input type="radio" name="partner" value="yes" onClick={this.handleChangePartner}/>

  { this.state.needsPartner &&
  <div>
    <label htmlFor="partner" className="label">   Any Cat in Particular?
    </label>

      <div className="dropdown-div inline">
        <select onChange={this.handleChangeDropDown('color')}>
          <option selected>Choose One</option>
          <option value="shortahir">American Shorthair Mix</option>
          <option value="longhair">American Longhair Mix</option>
        </select>
      </div>
  </div>
  }

  </div>
<br />
{/* --------------------status---------------------- */}
  <div className="right-align fifty-lg hundred-sm">
    <label htmlFor="name" className="label">   Color:
    </label>
  </div>
  <div className="fifty-lg hundred-sm">

    <div className="dropdown-div inline">
      <select onChange={this.handleChangeDropDown('color')}>
        <option selected>Status</option>
        <option value="atCafe">At Cafe</option>
        <option value="inFoster">In Foster Home</option>
        <option value="adopted">Adopted</option>
        <option value="angel">Angel</option>
      </select>
    </div>
  </div>
<br />

{/* ---------------additional notes------------------ */}
   <div className="right-align fifty-lg hundred-sm textarea-spacer">
  <label htmlFor="name" className="label">   Notes?
      </label>
  </div>
  <div className="fifty-lg hundred-sm">


      <textarea className="pt-input"  dir="auto"
        onChange={this.handleChange("description")}
        value={this.state.description}
        placeholder="ie., shy, friendly, (other cat's) sibling..."
        />
  </div>
<br />
{/* ---=-=-=-=-=-=-=-=----buttons----=-=-=-=-=-=-=-=--- */}
  <button type="button" className="pt-button pt-intent-danger">
    Reset
    <span className="pt-icon-standard pt-icon-refresh pt-align-right"></span>
  </button>
  <button type="button" className="pt-button pt-intent-success">
    Next step
    <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
  </button>

</form>
</div>
)}

}

/* --------------------container---------------------- */
const mapState = (state) => ({
  allCats: state.feline.cats
})

const mapDispatch = { addACat, oneCat }

export default connect(mapState, mapDispatch)(AddCat)
