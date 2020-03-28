import React, {Component} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import classes from "./Auth.css";
import * as actions from "../store/auth";
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import {Redirect} from "react-router-dom";


class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched: false
            }
        },
        isSignup : true
    }


    inputChangedHandler = (event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
            }
        }
        this.setState({controls : updatedControls});
    }


    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
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

    switchAuthModeHandler = ()=>{
        this.setState((prevValue)=>{
            return {
                isSignup : !prevValue.isSignup
            }
        })
    }

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id : key,
                config : this.state.controls[key]
            })
        }

        let form = formElementArray.map((formElement)=>{
            return (
                <Input 
                    key ={formElement.id} elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value} invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                />
                
            )
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }


        let authRedirect = null;

        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked = {this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath : ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state =>{
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(Auth);