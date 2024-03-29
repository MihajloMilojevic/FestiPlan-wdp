import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css"
import useWindowSize from "../../../hooks/useWindowSize";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch"

const Navbar = () => {
    const windowSize = useWindowSize();
    const [searchActive, setSearchActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();

    return (
        <nav className={styles.navbar}>
            <div>
                <Link title="FestiPlan Homepage" to="/" className={styles.block}>
                    <img className={styles.logo} src="/Logo-no-slogan-horizontal.svg" alt="Logo" />
                </Link>
            </div>
            <div className={styles.links_group}>
                {
                    windowSize.width > 600 ? (
                        <ul className={styles.list}>
                            <li className={`${styles.link} ${searchActive ? styles.search_active_other : ""}`}>Login</li>
                            <li className={`${styles.link} ${searchActive ? styles.search_active_other : ""}`}>Register</li>
                            <li className={`${styles.link} ${searchActive ? styles.search_active_other : ""}`}> <Link to="/admin">Admin</Link> </li>
                            <li
                                 className={`
                                    ${styles.link} 
                                    ${styles.block} 
                                    ${styles.search}
                                    ${searchActive ? styles.search_active_parent : ""}
                                `}
                            >
                                <div
                                    className={`
                                        ${styles.link} 
                                        ${styles.block} 
                                        ${styles.search} 
                                        ${searchActive ? styles.search_active : ""}
                                    `}
                                    onClick={() => {setSearchActive(true); inputRef.current.focus()}}
                                >
                                    {
                                        !inputValue && (
                                            <>
                                                <AiOutlineSearch title="Search on page" size={25} className={`pointer ${styles.block}`} />
                                                { searchActive ? "Search on page" : "Search"}
                                            </>
                                        )
                                    }
                                    
                                </div>
                                <input onBlur={() => {setSearchActive(false); setInputValue("")}} ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" className={`${styles.search_input} ${searchActive ? styles.search_input_active : ""}`} />
                            </li>
                        </ul>
                    ) : (
                        <AiOutlineMenu title="Open menu" size={30} className={`pointer ${styles.block}`} />
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;