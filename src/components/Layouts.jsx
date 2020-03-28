
import React, {Component} from "react";
import Aux from "../hoc/Aux";
import classes from "./Layouts.css"
import Toolbar from "./Toolbar"
import SideDrawer from "./SideDrawer"
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    

    render () {
        return (
            <Aux>
                <Toolbar 
                isAuth = {this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !== null
    }
}



export default connect(mapStateToProps)(Layout);