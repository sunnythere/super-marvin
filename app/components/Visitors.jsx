import React from 'react'
import { addToVisitorLog } from '../reducers/visitors'



export default (props) => {


  return(

    <div className="div-inner-container">
      {
        props.visitors ?
        props.visitors.map((visitor, idx) => {

          const group = visitor.partySize.length > 1 ? true : false
          const groupArr = group ? visitor.partySize.split('-') : null
          const groupLast = group && (groupArr[0] === groupArr[1]) ? true : false

         return (

            <div className="visitor-row" key={idx+1} onContextMenu={props.handleContextMenu}>

              <form onSubmit={props.checkOut}
                    onKeyPress={props.checkEnter}
                    name={idx+1}>

                <div className="div-inner">
                    {//visible count# is one more than index
                    }
                  <input id="visitorCount" type="number" name="idNum" defaultValue={idx+1}  className="readOnly" readOnly />
                </div>

                <div className="div-inner">
                  <input type="text" className="hspace-1b" defaultValue={visitor.checkInTime ? visitor.checkInTime : ''} name="startTime" readOnly />
                </div>
{
  //--------- name/minor/under3 ---------
}
                <div className="div-inner">

                  <input type="text" name={idx+1} value={visitor.name ? visitor.name: ''} onChange={props.handleChangeName} onBlur={props.onBlurNameField} className="name-field" />
                </div>



              { !visitor.checkedOut ?

              <div className="div-inner hspace-1a space-top">
                <label>minor?</label>
                &nbsp;
                  <input type="checkbox" name={idx+1}
                    checked={visitor.minor}
                    onChange={props.handleChangeMinor}  value={visitor.minorVal}/>

                    { visitor.minor &&

                      (group ?
                        <span>
                          <br />
                          <label>under 3?</label>
                          &nbsp;
                          <input type="checkbox" name={idx+1}
                            checked={visitor.under3}
                            onChange={props.handleChangeUnder3} />
                        </span>
                      : <span>
                          <br />
                          <label className="red small">Adult<br/>
                            Signature??</label>
                        </span>
                      )

                    }
              </div>

              :
              <div className="div-inner hspace-1a space-top">
                {visitor.minor ? <p>minor</p> : null}
                <br/>
                {visitor.under3 ? <p>under 3</p> : null}
              </div>
              }


{
  //--------- ------------------ ---------
}

                <div className="div-inner">
                  { // if visitor is not part of group, and not checked out, or if visitor is last in the group
                    (!visitor.checkedOut && !group ||
                    !visitor.checkedOut && groupLast) ?
                  <input type="submit" id="checkoutBtn" defaultValue="checkout" name="checkoutBtn"/>
                  : null
                  }
                  { visitor.checkOutTime ?

                  <input type="text" className="hspace-2" name="leaveTime" defaultValue={visitor.checkOutTime} />

                  : null
                  }
                </div>

              { visitor.totalTime ?
                <div className="div-inner">

                  <input type="text" className="hspace-2a" name="totalTime" defaultValue={visitor.totalTime} />
                </div>
                : null
              }
{// ------------- COST -------------
}
              { visitor.checkedOut ?
                <div className="div-inner space-top">

                  <p>{ visitor.under3 ?
                    '$0'
                    : `\$${visitor.cost}`}</p>
                  { visitor.graceAvail && (group && groupLast || !visitor.under3) ?
                    <span>
                    &nbsp;
                    <input type="checkbox" name={visitor.count}
                    checked={visitor.applyGrace}
                    onChange={props.handleApplyGrace}  />

                      <span className="small">&nbsp; <label>5 min grace?</label></span>
                    </span>
                    : null
                  }
                { visitor.checkedOut && groupLast ?
                  <div className="div-inner">
                    <br/>
                    <p>Total: (${`${visitor.totalCost}`})</p>
                  </div>
                    : null
                }

                </div>
                : null
              }
{// ------------- -------- -------------
}
              </form>
          { !group || groupLast ?
            <hr className="hr-divider"/>
            : null
          }
              </div>

            )
          })

          : null

        }
        </div>

    )
  }
