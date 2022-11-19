import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch } from 'react-redux'
import { store } from '../../redux'
import { setUser } from '../../redux/slice'
import Alert from '../UI/ModalBox/alert/Alert'
import './account.css'

const Account_containerItem = (props) => {
  const user = store.getState(setUser).toolkit.currentUser
  const [isInput, setIsInput] = useState(false)
  const [value, setValue] = useState(user?.name)
  const [alert, setAlert] = useState(false)
  const ref = useRef()
  // const [user, setUser] = useEffect()
  const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetchData()
  //     .then((data) => setUser(data))
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [])

  // const fetchData = () => {
  //   const data = getUser()
  //   return data
  // }

  const changeHandler = (value) => {
    setValue(value)
  }

  // const event = new KeyboardEvent('keypress', {
  //   key: 'enter',
  // })

  return (
    <div className="account">
      <Alert visible={alert} setVisible={setAlert}>
        <div>Изменения успешно сохранены</div>
      </Alert>
      <div className="account__item">
        <div className="account__item__first_column">
          <rect style={{ background: '#fff', minHeight: '100%' }}>dkdkdkd</rect>
        </div>
        <div className="account__item__first_column">
          <div
            className="account__item__imput"
            onClick={() => setIsInput(true)}
          >
            {!isInput ? (
              <div>{value}</div>
            ) : (
              <ClickAwayListener onClickAway={() => setIsInput(false)}>
                <input
                  value={value}
                  onChange={(event) => {
                    event.stopPropagation()
                    changeHandler(event.target.value)
                  }}
                ></input>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>

      <div className="account__item">
        <div className="account__item__column">
          <div>Имя</div>
          <div>Фамилия</div>
          <div>Дата рождения</div>
        </div>
        <div className="account__item__column">
          <div>{user?.name}</div>
          <div>{user?.surname}</div>
          <div>{user?.bd}</div>
        </div>
      </div>

      <div className="account__item">
        <div className="account__item__column">
          <div>E-mail</div>
          <div>Контактный номер</div>
          <div>Паспортные данные</div>
        </div>
        <div className="account__item__column">
          <div>{user?.email}</div>
          <div>{user?.phone}</div>
          <div>2222 2222</div>
          {/* <div>{user?.passport}</div> */}
        </div>
      </div>

      <div className="account__item">
        <div className="account__item__column">
          <div>Платежная система</div>
          <div>Номер карты</div>
          <div>Срок действия карты</div>
        </div>
        <div className="account__item__column">
          <div>{user?.paySystem}</div>
          <div>{user?.cardsNumber}</div>
          <div>{user?.validity}</div>
        </div>
      </div>
    </div>
  )
}

export default Account_containerItem
