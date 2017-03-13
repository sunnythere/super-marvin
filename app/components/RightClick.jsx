import React from 'react'

export default (props) => {

  const style = {
    position: 'fixed',
    top: `${props.popUpY}px`,
    left: `${props.popUpX}px`,
    width: '155px',
    backgroundColor: 'white',
    border: '1px solid rgba(180,180,180,.8)',
    borderRadius: '5px',
    padding: '.3rem'

  }

  return(
   <div style={style}>
   <div className="context-menu-items" onClick={props.handleUndoCheckOut}>
      <span className="icon-space" ><img src="img/reversearrow.png"/>&nbsp; undo checkout</span>
    </div>
    <div className="context-menu-items" onClick={props.handleDelete}>
      <span className="icon-space" ><img src="img/trash.png"/>&nbsp; delete this entry</span>
    </div>
  </div>

  )

}
