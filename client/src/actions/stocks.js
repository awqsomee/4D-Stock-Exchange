// Не работает
export const getPrice = async () => {
  try {
    const response = await axios.get('https://gentle-sea-62964.herokuapp.com/api/auth/stock?symbol=AAPL', {
      headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
    })
    return response.data
  } catch (e) {
    alert(e.response.data.message)
  }
}
