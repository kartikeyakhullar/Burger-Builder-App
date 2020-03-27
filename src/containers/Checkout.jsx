import  React, { Component } from "react";
import {Route,Redirect} from "react-router-dom";
import ContactData from "./ContactData"
import  {connect} from "react-redux"
// import * as actions from "../store/orderActions"

import CheckoutSummary from "../components/CheckoutSummary"

class Checkout extends Component {

   
   
    


    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    

    render(){
        let summary = <Redirect to="/" />
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients = {this.props.ings}
                CheckoutCanceled={this.checkoutCanceledHandler}
                CheckoutContinued={this.checkoutContinuedHandler}
                 />
                 <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
                 </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);