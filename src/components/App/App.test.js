
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
jest.mock('../../apiCalls');
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';

describe('App', () => {
  it('should render the title, form, and orders on load', async () => {
    getOrders.mockResolvedValueOnce({orders: [{id: 1, name: 'Pat', ingredients: ['beans','lettuce','carnitas','queso fresco','jalapeno']}]})

    render(
      <App />
    )

    const title = screen.getByText('Burrito Builder');
    expect(title).toBeInTheDocument();

    const nameField = screen.getByPlaceholderText('Name');
    expect(nameField).toBeInTheDocument();

    const noOrders = screen.getByText('No orders yet!');
    expect(noOrders).toBeInTheDocument();

    const order = await waitFor(() => screen.getByText('Pat', {exact: false}));
    expect(order).toBeInTheDocument();
  })

  it('should load an order after the form has been submitted correctly', async () => {
    getOrders.mockResolvedValueOnce({orders: [{id: 1, name: 'Pat', ingredients: ['carnitas','queso fresco','jalapeno']}]})
    postOrder.mockResolvedValueOnce({id: 2, name: 'Sam', ingredients: ['lettuce', 'beans']})
    render(
      <App />
    )

    const order = await waitFor(() => screen.getByText('Pat', {exact: false}));
    expect(order).toBeInTheDocument();

    const nameField = screen.getByPlaceholderText('Name');
    const lettuceButton = screen.getByText('lettuce');
    const beansButton = screen.getByText('beans');

    fireEvent.change(nameField, {target: {value: 'Sam'}});
    fireEvent.click(lettuceButton);
    fireEvent.click(beansButton);

    const submitButton = screen.getByText('Submit Order');
    fireEvent.click(submitButton);

    const newOrder = await waitFor(() => screen.getByText('Sam', {exact: false}));
    expect(newOrder).toBeInTheDocument();
  })

  it('should remove an order from the screen after it has been deleted', async () => {
    getOrders.mockResolvedValueOnce({orders: [{id: 1, name: 'Pat', ingredients: ['carnitas','queso fresco','jalapeno']}]})
    deleteOrder.mockResolvedValueOnce('');
    render(
      <App />
    )

    const order = await waitFor(() => screen.getByText('Pat', {exact: false}));
    const deleteButton = await waitFor(() => screen.getByText('Order Ready!'));
    expect(order).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const message = await waitFor(() => screen.getByText('No orders yet!'))
    expect(message).toBeInTheDocument();
  })
})
