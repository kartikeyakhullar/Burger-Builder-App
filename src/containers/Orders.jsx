
import React,{Component} from "react"
import Order from "../components/Order"
import axios from "axios"
import withErrorHandler from "../hoc/withErrorHandler"
import * as actions from "../store/orderActions"
import {connect} from 'react-redux'
import Spinner from "../components/Spinner"

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = (
                this.props.orders.map((order)=>{
                    return (
                        <Order  key={order.id}
                        ingredients = {order.ingredient}
                        price = {Number.parseFloat(order.price).toFixed(2)}
                    />)
                })
            )
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
}



const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders : (token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));