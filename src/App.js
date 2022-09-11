import React, { useState } from 'react'

import './App.css'
import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './Contexts/CartProvider'

const App = () => {
	const [cartIsShown, setCartIsShown] = useState(false)

	const showCartHandler = () => {
		setCartIsShown(true)
	}
	const hideCartHandler = () => {
		setCartIsShown(false)
	}

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	)
}

export default App
