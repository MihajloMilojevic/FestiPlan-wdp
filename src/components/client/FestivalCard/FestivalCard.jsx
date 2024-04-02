import React, {useState} from 'react';
import styles from "./Festival.module.css";
import { Link } from 'react-router-dom';
import { SearchableText } from '../../common';

function FestivalCard({item: festival}) {
    const [activeImage, setActiveImage] = useState(0);
    const [intervalObj, setIntervalObj] = useState(null);
    function onHover() {
        if (festival.images.length > 1) {
            const interval = setInterval(() => {
                setActiveImage((prev) => (prev + 1) % festival.images.length);
            }, 1000 * 1.5);
            setIntervalObj(interval);
        }
    }
    function onHoverEnd() {
        clearInterval(intervalObj);
        setActiveImage(0);
        setIntervalObj(null);
    }

    return (
        <Link to={`/organizers/${festival.organizerId}/festivals/${festival.id}`}>
            <div className={styles.card} onMouseEnter={onHover} onMouseLeave={onHoverEnd}>
                <div className={styles.image_container}>
                    {
                        festival.images.map((image, index) => 
                            <img key={index} style={{zIndex: index+2}} src={image} alt={festival.name + (index + 1)} className={`${styles.image} ${index === activeImage ? styles.active : ""}`}/>
                        )
                    }
                </div>
                <h2 className={styles.text}><SearchableText text={festival.name} /></h2>
                <div className={styles.taglist}>
                    <p className={styles.tag}><SearchableText text={festival.price + "rsd"} /></p>
                    <p className={styles.tag}><SearchableText text={festival.type} /></p>
                </div>
            </div>
        </Link>
    );
}

export default FestivalCard;