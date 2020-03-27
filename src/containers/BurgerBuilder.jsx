import React, { Component } from "react"
import Aux from "../hoc/Aux"
import Burger from "../components/Burger"
import BuildControls from "../components/BuildControls"
import Modal from "../components/Modal"
import OrderSummary from "../components/OrderSummary"
import axios from "../axios-instance"
import Spinner from "../components/Spinner"
import withErrorHandler from "../hoc/withErrorHandler"
import { connect } from "react-redux";
import * as actions from "../store/burgerBuilder"
import * as actions_2 from "../store/orderActions"





class BurgerBuilder extends Component {

    state = {
        purchasing : false
        
    }

    componentDidMount (){
        console.log(this.props);
        this.props.onInitingredients();
       
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }
    
    purchaseHandler = ()=>{
        console.log("Button clicked!!");
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = ()=>{
        console.log("Button clicked!!");
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{
        this.props.onInitpurchase();
        this.props.history.push('/checkout');

    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        


        

        let burger = this.props.error ? <p>Ingredients can't be loaded!!</p>:<Spinner />

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        ordered = {this.purchaseHandler}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary 
                price = {this.props.price}
                ingredients={this.props.ings} 
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}/>
            );
        }

        


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded : (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitingredients : ()=>dispatch(actions.initIngredients()),
        onInitpurchase : ()=>dispatch(actions_2.purchaseInit())
        
    }
}






export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));