import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      orders: []
    }

    this.submitOrder = this.submitOrder.bind(this);
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({orders: orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  submitOrder(order) {
    console.log(order)
    postOrder(order)
      .then(response => {
        const orders = this.state.orders.slice();
        orders.push(order);
        this.setState({orders: orders});
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm  submitOrder={this.submitOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
