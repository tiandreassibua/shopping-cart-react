import { createContext, useState } from "react";
import { getProductData } from "./productStore";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    // [{id: 1, quantity: 1}]

    function getProductQuantity(productId) {
        const quantity = cartProducts.find(
            (cartProduct) => cartProduct.id === productId
        )?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) {
            setCartProducts([...cartProducts, { id, quantity: 1 }]);
        } else {
            // product is in cart
            // [{id: 1, quantity: 3}, {id: 2, quantity: 1}]
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            );
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts.filter((product) => {
                return product.id !== id;
            })
        );
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += productData.price * cartItem.quantity;
        });

        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        deleteFromCart,
        removeOneFromCart,
        getTotalCost,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
