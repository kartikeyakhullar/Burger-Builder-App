import React from "react"
import classes from "./SideDrawer.css"
import Logo from "./Logo"
import NavigationItems from "./NavigationItems"
import Backdrop from "./Backdrop"
import Aux from "../hoc/Aux"

const sideDrawer = (props)=>{

    let attachedClasses = [classes.SideDrawer,classes.Close]

    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }

    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer;