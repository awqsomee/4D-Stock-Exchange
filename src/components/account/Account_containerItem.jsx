import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount, updateAccount } from '../../actions/user'
import { store } from '../../redux'
import { setAccountUser, setUser } from '../../redux/slice'
import PageLoader from '../UI/loader/PageLoader'
import Alert from '../UI/ModalBox/alert/Alert'
import './account.css'

const Account_containerItem = (props) => {
  const [isOverTime, setIsOverTime] = useState(false)
  const dispatch = useDispatch()
  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState()
  const [isInputUsername, setIsInputUsername] = useState(false)
  const [isInputSurname, setIsInputSurname] = useState(false)
  const [isInputName, setIsInputName] = useState(false)
  const [isInputPatronymic, setIsInputPatronymic] = useState(false)
  const [isInputBirthday, setIsInputBirthday] = useState(false)
  const [isInputEmail, setIsInputEmail] = useState(false)
  const [isInputPhoneNumber, setIsInputPhoneNumber] = useState(false)
  const [isInputPassport, setIsInputPassport] = useState(false)
  const fullname = new Map([
    ['surname', account?.name.split(' ')[0]],
    ['name', account?.name.split(' ')[1]],
    ['patronymic', account?.name.split(' ')[2]],
  ])
  // const ref = useRef()

  const sumName = () => {
    setAccount({
      ...account,
      name: `${fullname.get('surname')}` + ' ' + `${fullname.get('name')}` + ' ' + `${fullname.get('patronymic')}`,
    })
  }

  console.log('fn', fullname)
  console.log('account', account)
  useEffect(() => {
    setIsLoading(true)
    dispatch(getAccount())
      .then((data) => setAccount(data))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const UpdateAccount = async (account) => {
    setIsLoading(true)
    console.log('acc', account)
    await dispatch(updateAccount(account))
    if (store.getState().toolkit.alertStatus == 200) {
      props.setmodalBoxDepositTrue(true)
    } else {
      props.setmodalBoxDepositFalse(true)
    }
    setIsLoading(false)
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
      {!isLoading ? (
        <div>
          <div className="account__item">
            <div className="account__item__first_column">
              <div
                className="account__avatar"
                onMouseEnter={() => setIsOverTime(true)}
                onMouseLeave={() => setIsOverTime(false)}
              >
                {account?.avatar ? (
                  <div className={rootClasses.join(' ')} />
                ) : (
                  <div className={rootClasses.join(' ')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" fill="none">
                      <g clipPath="url(#clip0_102_1934)">
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
                {isOverTime ? (
                  <div className="upload" onMouseEnter={(e) => e.stopPropagation()}>
                    Загрузить фото
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="account__item__first_column">
              <div className="account__item__input field__input" onClick={() => setIsInputUsername(true)}>
                {!isInputUsername ? (
                  <div>{account?.username}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputUsername(false)}>
                    <input
                      className="search"
                      style={{ fontSize: '36px' }}
                      value={account?.username}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        setAccount({ ...account, username: event.target.value })
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          </div>

          <div className="account__item">
            <div className="account__item__column">
              <div className="field">Имя</div>
              <div className="field">Фамилия</div>
              <div className="field">Отчество</div>
              <div className="field">Дата рождения</div>
            </div>
            <div className="account__item__column">
              <div className="field" onClick={() => setIsInputName(true)}>
                {!isInputName ? (
                  <div>{fullname.get('name')}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputName(false)}>
                    <input
                      className="search"
                      value={fullname.get('name')}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        fullname.set('name', event.target.value)
                        sumName()
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>

              <div className="field field__input" onClick={() => setIsInputSurname(true)}>
                {!isInputSurname ? (
                  <div>{fullname.get('surname')}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputSurname(false)}>
                    <input
                      className="search"
                      value={fullname.get('surname')}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        fullname.set('surname', event.target.value)
                        sumName()
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
              <div className="field field__input" onClick={() => setIsInputPatronymic(true)}>
                {!isInputPatronymic ? (
                  <div>{fullname.get('patronymic')}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputPatronymic(false)}>
                    <input
                      className="search"
                      value={fullname.get('patronymic')}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        fullname.set('patronymic', event.target.value)
                        sumName()
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>

              <div className="field field__input" onClick={() => setIsInputBirthday(true)}>
                {!isInputBirthday ? (
                  account?.birthday ? (
                    <div>{account?.birthday}</div>
                  ) : (
                    <div style={{ opacity: '0.2' }}>Установите дату рождения</div>
                  )
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputBirthday(false)}>
                    <input
                      className="search"
                      value={account?.birthday}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        setAccount({ ...account, birthday: event.target.value })
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          </div>

          <div className="account__item">
            <div className="account__item__column">
              <div className="field">E-mail</div>
              <div className="field">Контактный номер</div>
              <div className="field">Паспортные данные</div>
            </div>
            <div className="account__item__column">
              <div className="field field__input" onClick={() => setIsInputEmail(true)}>
                {!isInputEmail ? (
                  <div>{account?.email}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputEmail(false)}>
                    <input
                      className="search"
                      value={account?.email}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        setAccount({ ...account, email: event.target.value })
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
              <div className="field field__input" onClick={() => setIsInputPhoneNumber(true)}>
                {!isInputPhoneNumber ? (
                  <div>{account?.phoneNumber}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputPhoneNumber(false)}>
                    <input
                      className="search"
                      value={account?.phoneNumber}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        setAccount({ ...account, phoneNumber: event.target.value })
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
              <div className="field field__input" onClick={() => setIsInputPassport(true)}>
                {!isInputPassport ? (
                  <div>{account?.passportNumber}</div>
                ) : (
                  <ClickAwayListener onClickAway={() => setIsInputPassport(false)}>
                    <input
                      className="search"
                      value={account?.passportNumber}
                      onBlur={(e) => {
                        UpdateAccount(account)
                      }}
                      onChange={(event) => {
                        event.stopPropagation()
                        setAccount({ ...account, passportNumber: event.target.value })
                      }}
                    ></input>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          </div>

          <div className="account__item">
            <div className="account__item__column">
              <div className="field">Платежная система</div>
              <div className="field">Номер карты</div>
              <div className="field">Срок действия карты</div>
            </div>
            <div className="account__item__column">
              <div className="field field__input">{account?.paySystem}</div>
              <div className="field field__input">{account?.cardsNumber}</div>
              <div className="field field__input">{account?.validity}</div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoader style={{ justifyContent: 'center', alignItems: 'center' }} />
      )}
    </div>
  )
}

export default Account_containerItem
