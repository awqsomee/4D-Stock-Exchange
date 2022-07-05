module.exports = (stock) => {
  let currentTime = new Date()
  let stockTimezoneOffset = Number(stock.timezone.slice(3, 6))
  let openTime = new Date()
  openTime.setTime(
    Date.parse(
      `${currentTime.getUTCMonth()} ${currentTime.getUTCDate()} ${currentTime.getUTCFullYear()} ${Number(
        stock.marketOpen.slice(0, 2)
      )}:${Number(stock.marketOpen.slice(3, 5))}:00 GMT${stockTimezoneOffset}00`
    )
  )
  let closeTime = new Date()
  closeTime.setTime(
    Date.parse(
      `${currentTime.getUTCMonth()} ${currentTime.getUTCDate()} ${currentTime.getUTCFullYear()} ${Number(
        stock.marketClose.slice(0, 2)
      )}:${Number(stock.marketClose.slice(3, 5))}:00 GMT${stockTimezoneOffset}00`
    )
  )
  //
  // Если нужно насильно включить торги
  //
  // currentTime.setTime(
  //   Date.parse(
  //     `${currentTime.getUTCMonth()} ${currentTime.getUTCDate()} ${currentTime.getUTCFullYear()} 14:${Number(
  //       stock.marketOpen.slice(3, 5)
  //     )}:00 GMT${stockTimezoneOffset}00`
  //   )
  // )
  //
  // console.log(openTime)
  // console.log(currentTime)
  // console.log(closeTime)
  if (currentTime > openTime && currentTime < closeTime) {
    return true
  } else return false
}
