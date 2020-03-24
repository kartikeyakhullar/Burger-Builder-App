import React, { Component } from "react"
import Aux from "../hoc/Aux"
import Burger from "../components/Burger"
import BuildControls from "../components/BuildControls"
import Modal from "../components/Modal"
import OrderSummary from "../components/OrderSummary"
import axios from "../axios-instance"
import Spinner from "../components/Spinner"
import withErrorHandler from "../hoc/withErrorHandler"


const INGREDIENT_PRICES = {
    salad: 0.5, 
    meat: 1.3, 
    bacon: 0.7, 
    cheese: 0.4
};

class BurgerBuilder extends Component {

    state = {
        ingredient : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount (){
        axios.get('https://react-my-burger-47f48.firebaseio.com/orders/ingredients.json').then((response)=>{
            this.setState({ingredient : response.data})
        }).catch((err)=>{
            this.setState({error:true})
        })
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
        this.setState({loading:true});
        // console.log("Continue purchasing!!");
        const order = {
            ingredient : this.state.ingredient,
            price : this.state.totalPrice,
            customer : {
                name : 'Kartikeya Khullar',
                address : {
                    street : 'Safdarjang Enclave',
                    zipcode : '110029',
                    country : 'India'
                },
                email : 'test@gmail.com'
            },
            deliveryMethod : 'Prime'
        }
        axios.post('/orders.json',order).then((response)=>{
            this.setState({loading:false,purchasing:false});
        }).catch(err=>{this.setState({loading:false,purchasing:false})});
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        


        

        let burger = this.state.error ? <p>Ingredients can't be loaded!!</p>:<Spinner />

        if(this.state.ingredient){
            burger = (
                <Aux>
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

            orderSummary = (
                <OrderSummary 
                price = {this.state.totalPrice}
                ingredients={this.state.ingredient} 
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}/>
            );
        }

        if(this.state.loading){
            orderSummary = <Spinner />;

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

export default withErrorHandler(BurgerBuilder,axios);