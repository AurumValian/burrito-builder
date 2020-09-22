import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';

describe('OrderForm', () => {
  it('should display the name input and several buttons', () => {
    render(
      <OrderForm submitOrder={jest.fn()}/>
    )

    const nameField = screen.getByPlaceholderText('Name');

    const beansButton = screen.getByText('beans');
    const steakButton = screen.getByText('steak');
    const carnitasButton = screen.getByText('carnitas');
    const sofritasButton = screen.getByText('sofritas');
    const lettuceButton = screen.getByText('lettuce');
    const quesoButton = screen.getByText('queso fresco');
    const picoButton = screen.getByText('pico de gallo');
    const hotSauceButton = screen.getByText('hot sauce');
    const guacamoleButton = screen.getByText('guacamole');
    const jalapenosButton = screen.getByText('jalapenos');
    const cilantroButton = screen.getByText('cilantro');
    const sourCreamButton = screen.getByText('sour cream');

    expect(nameField).toBeInTheDocument();

    expect(beansButton).toBeInTheDocument()
    expect(steakButton).toBeInTheDocument()
    expect(carnitasButton).toBeInTheDocument()
    expect(sofritasButton).toBeInTheDocument()
    expect(lettuceButton).toBeInTheDocument()
    expect(quesoButton).toBeInTheDocument()
    expect(picoButton).toBeInTheDocument()
    expect(hotSauceButton).toBeInTheDocument()
    expect(guacamoleButton).toBeInTheDocument()
    expect(jalapenosButton).toBeInTheDocument()
    expect(cilantroButton).toBeInTheDocument()
    expect(sourCreamButton).toBeInTheDocument()
  })

  it('should be able to change the value of an input field', () => {
    render(
      <OrderForm submitOrder={jest.fn()}/>
    )

    const nameField = screen.getByPlaceholderText('Name');
    fireEvent.change(nameField, {target: {value: 'Smalls'}})
    expect(nameField.value).toBe('Smalls');
  })

  it('should clear input on submit', () => {
    render(
      <OrderForm submitOrder={jest.fn()}/>
    )

    const nameField = screen.getByPlaceholderText('Name');
    fireEvent.change(nameField, {target: {value: 'Smalls'}});

    expect(nameField.value).toBe('Smalls');

    const submitButton = screen.getByText('Submit Order');
    fireEvent.click(submitButton);

    expect(nameField.value).toBe('');
  })
})
