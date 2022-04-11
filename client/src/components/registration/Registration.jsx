import React from "react";
import { useState } from "react";
import "./registration.css";
import Input from "../../utils/input/Input";
import { registration } from "../../actions/user";

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    return (
        <div className="registration">
            <div className="registration__header"></div>
            <Input value={name} setValue={setName} type="text" placeholder="Иван" />
            <Input value={surname} setValue={setSurname} type="text" placeholder="Иванов" />
            <Input value={email} setValue={setEmail} type="email" placeholder="email@example.com" />
            <Input value={password} setValue={setpassword} type="password" placeholder="********" />
            <Input value={repeatPassword} setValue={setRepeatPassword} type="password" placeholder="********" />
            <button
                className="registration__button"
                onClick={() => {
                    if (password === repeatPassword) registration(name, surname, email, password);
                }}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Registration;
