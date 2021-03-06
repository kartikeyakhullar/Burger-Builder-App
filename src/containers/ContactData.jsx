import React,{Component} from "react"
import Button from "../components/Button"
import classes from "./ContactData.css"
import axios from "axios"
import Spinner from "../components/Spinner"
import Input from "../components/Input"
import {connect} from "react-redux"
import withErrorHandler from "../hoc/withErrorHandler"
import * as actions from "../store/orderActions"



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid : true,
                validation : {}
            }
        },
        formIsValid : false
    }

    orderHandler = (event)=>{
        
        console.log("Continue purchasing!!");
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredient : this.props.ings,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }
        console.log("Here we are...")
        this.props.onOrderBurger(order,this.props.token);
        event.preventDefault();

       
    }


    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }


    inputChangedHandler = (event,inputIdentifier)=>{
        // console.log(event.taget.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const upDatedFormElement = {...updatedOrderForm[inputIdentifier]};
        upDatedFormElement.value = event.target.value;
        upDatedFormElement.touched = true;
        upDatedFormElement.valid = this.checkValidity(upDatedFormElement.value,upDatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = upDatedFormElement;
        // console.log(upDatedFormElement);

        let formIsValid = true;
        for(let identifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[identifier].valid;
        }



        this.setState({orderForm : updatedOrderForm,formIsValid : formIsValid});
    }


    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map((formElement)=>{
                        return (
                            <Input key={formElement.id} elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value} invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                        )
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter contact details</h3>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDitpatchToProps = dispatch =>{
    return {
        onOrderBurger : (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}


export default connect(mapStateToProps,mapDitpatchToProps)(withErrorHandler(ContactData,axios));