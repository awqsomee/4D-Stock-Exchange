import axios from 'axios';
const serverAddress = 'https://gentle-sea-62964.herokuapp.com';
export const registration = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${config.get(serverAddress)}/api/auth/registration`, {
      email,
      password,
      name,
      surname,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${serverAddress}/api/auth/login`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};
