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
  const [isOverTime, setIsOverTime] = useState(false)
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

  const rootClasses = ['account__avatar__img', 'upload']
  if (isOverTime) {
    rootClasses.push('account__avatar__img__hover')
  }

  return (
    <div className="account">
      <Alert visible={alert} setVisible={setAlert}>
        <div>Изменения успешно сохранены</div>
      </Alert>
      <div className="account__item">
        <div className="account__item__first_column">
          <div
            className="account__avatar"
            onMouseEnter={() => setIsOverTime(true)}
            onMouseLeave={() => setIsOverTime(false)}
          >
            {user?.avatar ? (
              <div className={rootClasses.join(' ')} />
            ) : (
              <div className={rootClasses.join(' ')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" fill="none">
                  <g clipЗath="url(#clip0_102_1934)">
                    <path
                      d="M70 0C31.5137 0 0 31.5137 0 70C0 108.486 31.5137 140 70 140C108.486 140 140 108.486 140 70C140 31.5137 108.486 0 70 0ZM70 21C81.9137 21 91 30.1137 91 42C91 53.8863 81.9137 63 70 63C58.0863 63 49 53.9137 49 42C49 30.0863 58.0863 21 70 21ZM70 120.4C52.4863 120.4 37.0863 111.314 28 98C28 84 56 76.3137 70 76.3137C84 76.3137 112 84 112 98C102.914 111.314 87.5137 120.4 70 120.4Z"
                      fill="#E9EEF2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_102_1934">
                      <rect width="140" height="140" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
            {isOverTime ? <div className="upload">Загрузить фото</div> : ''}
            {/* {user?.avatar ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" fill="none">
                <g clipЗath="url(#clip0_102_1934)">
                  <path
                    d="M70 0C31.5137 0 0 31.5137 0 70C0 108.486 31.5137 140 70 140C108.486 140 140 108.486 140 70C140 31.5137 108.486 0 70 0ZM70 21C81.9137 21 91 30.1137 91 42C91 53.8863 81.9137 63 70 63C58.0863 63 49 53.9137 49 42C49 30.0863 58.0863 21 70 21ZM70 120.4C52.4863 120.4 37.0863 111.314 28 98C28 84 56 76.3137 70 76.3137C84 76.3137 112 84 112 98C102.914 111.314 87.5137 120.4 70 120.4Z"
                    fill="#E9EEF2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_102_1934">
                    <rect width="140" height="140" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <div />
            )} */}
          </div>
        </div>
        <div className="account__item__first_column">
          <div className="account__item__imput" onClick={() => setIsInput(true)}>
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
