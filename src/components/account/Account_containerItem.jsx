import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from '../../redux'
import { setUser } from '../../redux/slice'
import './account.css'

const Account_containerItem = (props) => {
  const user = store.getState(setUser).toolkit.currentUser
  // const [user, setUser] = useEffect()
  // const dispatch = useDispatch()
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

  return (
    <div className="account">
      <div className="account__item">
        <div className="account__item__first_column">
          <rect style={{ background: '#fff', minHeight: '100%' }}>dkdkdkd</rect>
        </div>
        <div className="account__item__first_column">
          <div>{user?.name}</div>
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
