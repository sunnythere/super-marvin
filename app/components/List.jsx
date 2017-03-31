import React from 'react'

export default (props) => {
    console.log('props in LIST ', props)

  return (

    <div id="visitorList-div">

        { props.visitors ?
              props.visitors.map(visitor => {

            let costTotal
              const group = visitor.partySize.length > 1 ? true : false
              const groupArr = group ? visitor.partySize.split('-') : null
              const groupLast = group && (groupArr[0] === groupArr[1]) ? true : false
              costTotal += visitor.cost

              return (
                <div className="visitor-row" key={visitor.count}>
                  <div className="div-inner">
                    {visitor.count}
                  </div>
                  <div className="div-inner">
                  {visitor.checkInTime}
                  </div>
                  <div className="div-inner">
                  {visitor.checkOutTime}
                  </div>
                  <div className="div-inner">
                  {visitor.totalTime}
                  </div>
                  <div className="div-inner">
                  {visitor.minor ? 'minor' : ''}
                  </div>
                  <div className="div-inner">
                  {visitor.under3 ? 'under3' : ''}
                  </div>
                  <div className="div-inner">
                  {visitor.cost}
                  </div>
                  <div className="div-inner">
                  {visitor.totalCost ? `${visitor.totalCost} (${visitor.partySize.slice(0,1)})` : ''}
                  </div>

                </div>)
            })

          : <p>nothing to see here</p>
        }

        </div>

  )
}
