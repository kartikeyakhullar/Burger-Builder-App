import  React, { Component } from "react";
import {Route} from "react-router-dom";
import ContactData from "./ContactData"
import  {connect} from "react-redux"

import CheckoutSummary from "../components/CheckoutSummary"

class Checkout extends Component {

   
    
    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients = {this.props.ings}
                CheckoutCanceled={this.checkoutCanceledHandler}
                CheckoutContinued={this.checkoutContinuedHandler}
                 />
                 <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.ingredients
    }
}




export default connect(mapStateToProps)(Checkout);