import React, { useEffect } from "react";
import { useAppContext } from "../../../context/contextProvider";
import styles from "./Login.module.css";
import toast from "react-hot-toast";

export default function Login() {
    const {modal, data, setUser} = useAppContext()

    function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        for(const user of data.users) {
            if(user.username === username && user.password === password) {
                setUser(user);
                modal.close();
                toast.success(`Successfully logged in as ${user.name} ${user.surname}!\n Welcome back!`);
                return;
            }
        }
        toast.error("Invalid username or password. Please try again.");
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className={styles.inputs}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" />
                </div>
            </div>
            <div className={styles.buttons}>
                <button type="submit">Login</button>
                <button type="button" onClick={modal.close}>Cancel</button>
            </div>
        </form>
    );
}

export const loginWrapperClassName = styles.wrapper;