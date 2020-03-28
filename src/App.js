import React, { Component } from 'react';
import Layout from "./components/Layouts"
import BurgerBuilder from "./containers/BurgerBuilder"
import Checkout from "./containers/Checkout"
import {Route,Switch,withRouter,Redirect} from "react-router-dom"
import  Orders from "./containers/Orders"
import Auth from "./containers/Auth"
import {connect} from "react-redux";
import Logout from './containers/Logout';
import * as actions from "./store/auth"


class App extends Component {


  componentDidMount(){
    this.props.onTryAutoSignup();
  }


  render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
           <Route path="/checkout" component={Checkout} />
           <Route path="/orders" component={Orders} />
           <Route path="/logout" component={Logout} />
           <Route path="/" component={BurgerBuilder} />
           <Redirect to="/" />
           </Switch>
      );
    }


    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup : ()=>dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated : state.auth.token !== null
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
