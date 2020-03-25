import React,{Component} from "react"
import Button from "../components/Button"
import classes from "./ContactData.css"
import axios from "axios"
import Spinner from "../components/Spinner"

class ContactData extends Component {
    state = {
        email : '',
        name : '',
        address : {
            streetCode : '',
            zipCode : ''
        },
        loading : false
    }

    orderHandler = (event)=>{
        event.preventDefault();
                this.setState({loading:true});
        // console.log("Continue purchasing!!");
        const order = {
            ingredient : this.props.ingredient,
            price : this.props.price,
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
        axios.post('https://react-my-burger-47f48.firebaseio.com/orders.json',order).then((response)=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(err=>{this.setState({loading:false})});

       
    }


    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading){
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

export default ContactData;