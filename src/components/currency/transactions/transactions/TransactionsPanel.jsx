import React, { useState } from 'react'

const TransactionsPanel = (props) => {
  const [activeAmount, setActiveAmount] = useState('transactions__panel__amount')
  const [activePrice, setActivePrice] = useState('transactions__panel__price')
  const [activeCost, setActiveCost] = useState()
  const [activeDate, setActiveDate] = useState()
  return (
    <div className="transactions__panel">
      <div className="transactions__panel__type" style={{ cursor: 'pointer' }}>
        <select
          className="select__filter"
          style={
            props.filter === 'Обмен валюты' ||
            props.filter === 'Обмен акций' ||
            props.filter === 'Пополнение баланса' ||
            props.filter === 'Вывод средств'
              ? { color: '#fff' }
              : { color: 'initial' }
          }
          value={props.filter}
          onChange={(e) => {
            props.setFilter(e.target.value)
          }}
        >
          <option value={''}>Тип операции</option>
          <option key={1} value={'Обмен валюты'}>
            Обмен валюты
          </option>
          <option key={2} value={'Обмен акций'}>
            Обмен акций
          </option>
          <option key={3} value={'Пополнение баланса'}>
            Пополнение
          </option>
          <option key={4} value={'Вывод средств'}>
            Вывод средств
          </option>
        </select>
      </div>
      <div
        className={props.filter === 'amount' ? 'transactions__panel__amountActive' : 'transactions__panel__amount'}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.setFilter('amount')
        }}
      >
        Количество
      </div>
      <div
        className={props.filter === 'price' ? 'transactions__panel__priceActive' : 'transactions__panel__price'}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.setFilter('price')
        }}
      >
        Цена
      </div>

      <div
        className={props.filter === 'cost' ? 'transactions__panel__costActive' : 'transactions__panel__cost'}
        style={{ cursor: 'pointer' }}
        onClick={() => props.setFilter('cost')}
      >
        Сумма операции
      </div>
      <div
        className={props.filter === 'date' ? 'transactions__panel__dateActive' : 'transactions__panel__date'}
        style={{ cursor: 'pointer' }}
        onClick={() => props.setFilter('date')}
      >
        Дата
      </div>
    </div>
  )
}

export default TransactionsPanel
