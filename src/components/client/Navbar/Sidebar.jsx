import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch"
import styles from "./Sidebar.module.css";


function Sidebar({active, height, width, searchActive, setSearchActive, inputValue, setInputValue}) {
    const inputRef = useRef();
    return (
        <div 
            className={`${styles.sidebar} ${active ? styles.active : ""}`} 
            style={{height, width}}
        >
            <ul className={styles.list}>
                <li className={`${styles.link}`}>Login</li>
                <li className={`${styles.link}`}>Register</li>
                <li className={`${styles.link}`}><Link to="/admin">Admin</Link> </li>
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
                    <input onBlur={() => setSearchActive(!!inputValue)} ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" className={`${styles.search_input} ${searchActive ? styles.search_input_active : ""}`} />
                </li>
                </ul>
        </div>
    );
};

export default Sidebar;