import  React, { Component } from "react";
import {Route} from "react-router-dom";
import ContactData from "./ContactData"

import CheckoutSummary from "../components/CheckoutSummary"

class Checkout extends Component {

    state = {
        ingredients : null,
        totalPrice : 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price=0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1]
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredients, totalPrice : price});
    }

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
                ingredients = {this.state.ingredients}
                CheckoutCanceled={this.checkoutCanceledHandler}
                CheckoutContinued={this.checkoutContinuedHandler}
                 />
                 <Route path={this.props.match.url + '/contact-data'} render= {(props)=>{
                     return (
                         <ContactData ingredients = {this.state.ingredients} 
                         price = {this.state.totalPrice}
                             {...props}
                         />
                     )
                 }} />
            </div>
        )
    }
}

export default Checkout;