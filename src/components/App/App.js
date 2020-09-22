import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      orders: []
    }


    this.submitOrder = this.submitOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({orders: orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  submitOrder(order) {
    postOrder(order)
      .then(response => {
        const orders = this.state.orders.slice();
        orders.push(response);
        this.setState({orders: orders});
      })
  }

  removeOrder(e) {
    const orderId = Number(e.target.closest(".order").id);
    deleteOrder(orderId)
      .then(response => {
        let orders = this.state.orders.slice();
        orders = orders.filter(order => {
          return order.id !== orderId
        })
        this.setState({orders: orders})
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm  submitOrder={this.submitOrder}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;
