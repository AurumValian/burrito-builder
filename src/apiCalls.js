export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (order) => {
  return fetch('http://localhost:3001/api/v1/orders',
    {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
      'Content-Type': 'application/json'
      }
    }
  )
  .then(response => response.json())
  .catch(error => console.log(error))
}

export const deleteOrder = (orderId) => {
  return fetch(`http://localhost:3001/api/v1/orders/${orderId}`,
    {
      method: 'DELETE'
    })
    .catch(error => console.log(error));
}
