import React from "react";
import styles from "./Hero.module.css"
import { useAppContext } from "../../../context/contextProvider";
import { Fireworks } from 'fireworks/lib/react'
import useWindowSize from "../../../hooks/useWindowSize";
import { SearchableText } from "../../common";

function HeroSection() {
    const {navHeight} = useAppContext();
    const windowSize = useWindowSize();
    let fxProps = {
        count: 3,
        interval: 1000,
        colors: ["#cc3333", "#4CAF50", "#81C784", "#FFD700", "#FF5722", "#FF69B4", "#FFA500", "#FFD700", "#FF69B4", "#FFA500"],
        calc: (props, i) => ({
          ...props,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          particleTimeout: 50000 //Math.random() * 700 + 300,
        })
      }
    return (
        <header className={styles.hero} style={{height: `calc(100vh - ${navHeight}px)`, paddingBottom: navHeight}}>
            {windowSize.width > 750 && <Fireworks {...fxProps} />}
            <img src="/hero-image.jpg" className={styles.bg} />
            <h1><SearchableText text="FestiPlan" /></h1>
            <p><SearchableText text="Bringing festivities to life, one plan at the time!" /></p>
        </header>
    )
}

export default HeroSection;