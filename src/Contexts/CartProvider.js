import React, { useReducer } from 'react'

import CartContext from './cart-context'

const CART_ACTIONS = {
	ADD: 'add',
	REMOVE: 'remove',
}

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'add':
			let updatedItems = state.items.concat(action.item)
			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			)
			const existingCartItem = state.items[existingCartItemIndex]

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				}
				updatedItems = [...state.items]
				updatedItems[existingCartItemIndex] = updatedItem
			} else {
				updatedItems = state.items.concat(action.item)
			}

			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount
			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			}
		default:
			return state
	}
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	)
	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: CART_ACTIONS.ADD, item: item })
	}
	const removeItemToCartHandler = (id) => {
		dispatchCartAction({ type: CART_ACTIONS.REMOVE, id: id })
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartProvider
