import React, { useState } from 'react'

import {  Button } from 'semantic-ui-react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button data-cy={props.buttonLabel.replace(' ', '-')} primary onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button data-cy='cancel' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable