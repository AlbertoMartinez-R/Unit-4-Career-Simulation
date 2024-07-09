import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <li key={item.id}>
      <p>{item.name} - ${item.price} x {item.quantity}</p>
      <div>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;