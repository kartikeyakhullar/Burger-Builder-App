import React, { Component } from 'react';
import Layout from "./components/Layouts"
import BurgerBuilder from "./containers/BurgerBuilder"
import Checkout from "./containers/Checkout"
import {Route,Switch} from "react-router-dom"
import  Orders from "./containers/Orders"

class App extends Component {


  render() {
    return (
      <div>
        <Layout>
        <Switch>
           <Route path="/checkout" component={Checkout} />
           <Route path="/orders" component={Orders} />
           <Route path="/" component={BurgerBuilder} />
           </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
