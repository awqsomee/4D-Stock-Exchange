import axios from "axios";

const serverAddress = "http://localhost:5000";

export const registration = async (name, surname, email, password) => {
    try {
        console.log(`${serverAddress}/api/auth/registration`);
        const response = await axios.post(`${serverAddress}/api/auth/registration`, {
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
