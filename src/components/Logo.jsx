import React from "react"
import burger from "../assets/images/original.png"
import classes from "./Logo.css"

const logo = (props)=>{
    return (
       <div className={classes.Logo} style={{height:props.height}}>
           <img src={burger} alt="MyBurger"></img>
       </div>
    )
}

export default logo;