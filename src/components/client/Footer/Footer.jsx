import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <img src="/Logo.svg" alt="Logo" />
            </div>
            <ul className={styles.list}>
                <li className={`${styles.link}`}>Login</li>
                <li className={`${styles.link}`}>Register</li>
                <li className={`${styles.link}`}><Link to="/admin">Admin</Link> </li>
            </ul>
            <div className={styles.contact}>
                <p className={styles.link}><a href="mailto:milojevicm374@gmail.com">milojevicm374@gmail.com</a></p>
                <p className={styles.link}><a href="tel:+381649781191">+381/64-97-811-91</a></p>
            </div>
        </footer>
    );
};

export default Footer;