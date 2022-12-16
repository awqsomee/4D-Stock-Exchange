import React, { useEffect, useRef } from 'react'
import ClickAwayListener from 'react-click-away-listener'

const InputAccount = (props) => {
  const Input = useRef(null)
  useEffect(() => {
    if (Input?.current) {
      Input.current.addEventListener('keydown', function (event) {
        if (event.key == 'Enter') {
          Input.current.blur()
        }
      })
      Input.current.focus()
    }
  }, [Input])

  return (
    <ClickAwayListener onClickAway={() => props.setIsInput(false)}>
      <input
        ref={Input}
        className="search"
        style={{ fontSize: '36px' }}
        value={props.value}
        onBlur={(e) => {
          if (props.fullname) {
            if (e.target.value != '') {
              const updatedAccount = {
                ...props.account,
                name:
                  `${props.fullname.get('surname')}` +
                  ' ' +
                  `${props.fullname.get('name')}` +
                  ' ' +
                  `${props.fullname.get('patronymic')}`,
              }
              props.UpdateAccount(updatedAccount)
            } else props.setFullname(new Map([...props.fullname, ['name', props.account?.name.split(' ')[1]]]))
          } else props.UpdateAccount(props.account)
        }}
        onChange={(event) => {
          if (props.fullname) {
            event.stopPropagation()
            if (props.value === 'username') props.setAccount({ ...props.account, username: event.target.value })
            else if (props.value === props.fullname.get('name')) {
              props.fullname.set('name', event.target.value)
              props.sumName()
            } else if (props.value === props.fullname.get('name')) {
              props.fullname.set('name', event.target.value)
              props.sumName()
            } else if (props.value === props.fullname.get('name')) {
              props.fullname.set('name', event.target.value)
              props.sumName()
            }
          } else props.setAccount({ ...props.account, username: event.target.value })
        }}
      ></input>
    </ClickAwayListener>
  )
}

export default InputAccount
