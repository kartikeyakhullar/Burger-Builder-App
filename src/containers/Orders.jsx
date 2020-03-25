
import React,{Component} from "react"
import Order from "../components/Order"
import axios from "axios"
import withErrorHandler from "../hoc/withErrorHandler"

class Orders extends Component {


    state = {
        orders : [],
        loading : true
    }


    componentDidMount(){
        axios.get('https://react-my-burger-47f48.firebaseio.com/orders.json').then((res)=>{
            // console.log(res.data);
            const fetchedOrders = [];
            for(let  key in res.data){
                fetchedOrders.push({...res.data[key],id:key});
            }
            this.setState({loading:false,orders:fetchedOrders});
        }).catch((err)=>{
            this.setState({loading:false});
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map((order)=>{
                    return (
                        <Order  key={order.id}
                        ingredients = {order.ingredient}
                        price = {Number.parseFloat(order.price).toFixed(2)}
                    />)
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);