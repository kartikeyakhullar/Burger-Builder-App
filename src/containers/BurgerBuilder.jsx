import React, { Component } from "react"
import Aux from "../hoc/Aux"
import Burger from "../components/Burger"
import BuildControls from "../components/BuildControls"
import Modal from "../components/Modal"
import OrderSummary from "../components/OrderSummary"


const INGREDIENT_PRICES = {
    salad: 0.5, 
    meat: 1.3, 
    bacon: 0.7, 
    cheese: 0.4
};

class BurgerBuilder extends Component {

    state = {
        ingredient : {
            cheese : 0,
            salad : 0,
            bacon : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice:newPrice, ingredient:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice:newPrice, ingredient:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
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
        console.log("Continue purchasing!!");
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }



        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price = {this.state.totalPrice}
                    ingredients={this.state.ingredient} 
                    purchaseCancelled={this.purchaseCancelHandler} 
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.state.ingredient}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    purchasable = {this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;