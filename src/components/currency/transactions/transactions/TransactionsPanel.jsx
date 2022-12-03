import React from 'react'

const TransactionsPanel = (props) => {
  return (
    <div className="transactions__panel">
      <div className="transactions__panel__type" style={{ cursor: 'pointer' }}>
        <select
          className="select__filter"
          value={props.filter}
          onChange={(e) => {
            props.setFilter(e.target.value)
          }}
        >
          <option value={''}>Тип операции</option>
          <option key={1} value={'Обмен валюты'}>
            Обмен валюты
          </option>
          <option key={2} value={'Пополнение баланса'}>
            Пополнение
          </option>
          <option key={3} value={'Вывод средств'}>
            Вывод средств
          </option>
        </select>
      </div>
      <div
        className="transactions__panel__amount"
        style={{ cursor: 'pointer' }}
        onClick={() => props.setFilter('amount')}
      >
        Количество
      </div>
      <div
        className="transactions__panel__price"
        style={{ cursor: 'pointer' }}
        onClick={() => props.setFilter('price')}
      >
        Цена
      </div>

      <div className="transactions__panel__cost" style={{ cursor: 'pointer' }} onClick={() => props.setFilter('cost')}>
        Сумма операции
      </div>
      <div className="transactions__panel__date" style={{ cursor: 'pointer' }} onClick={() => props.setFilter('date')}>
        Дата
      </div>
    </div>
  )
}

export default TransactionsPanel
