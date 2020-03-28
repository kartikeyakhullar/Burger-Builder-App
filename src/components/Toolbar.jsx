import React from "react"
import classes from "./Toolbar.css"
import NavigationItems from "./NavigationItems"
import Logo from "./Logo"
import DrawerToggle from "./DrawerToggle"

const toolbar = (props)=>{
    return (
       <header className={classes.Toolbar}>
           <DrawerToggle clicked={props.drawerToggleClicked}/>
           <Logo height="80%"/>
           <nav className={classes.DesktopOnly}>
               <NavigationItems isAuthenticated = {props.isAuth}/>
           </nav>
       </header>
    )
}

export default toolbar;