import React from "react";
import styles from "./Hero.module.css"
import { useAppContext } from "../../../context/contextProvider";
import { Fireworks } from 'fireworks/lib/react'

function HeroSection() {
    const {navHeight} = useAppContext();
    let fxProps = {
        count: 3,
        interval: 1000,
        colors: ["#cc3333", "#4CAF50", "#81C784", "#FFD700", "#FF5722", "#FF69B4", "#FFA500", "#FFD700", "#FF69B4", "#FFA500"],
        calc: (props, i) => ({
          ...props,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          particleTimeout: Math.random() * 700 + 300,
        })
      }
    return (
        <header className={styles.hero} style={{height: `calc(100vh - ${navHeight}px)`, paddingBottom: navHeight}}>
            <Fireworks {...fxProps} />
            <img src="/hero-image.jpg" className={styles.bg} />
            <h1>FestiPlan</h1>
            <p>Find the best festivals around the world</p>
        </header>
    )
}

export default HeroSection;