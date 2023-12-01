import Button from "react-bootstrap/Button";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productStore";

const CartProduct = (props) => {
    const cart = useContext(CartContext);
    const { id, quantity } = props.product;
    const product = getProductData(id);

    return (
        <>
            <h3>{product.title}</h3>
            <p>x{quantity}</p>
            <p>${(quantity * product.price).toFixed(2)}</p>
            <Button size="small" onClick={() => cart.deleteFromCart(id)}>
                Remove
            </Button>
            <hr />
        </>
    );
};

export default CartProduct;
