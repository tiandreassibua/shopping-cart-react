import { useState } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

const NavbarComponent = () => {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productsCount = cart.items.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>
                        Cart ({productsCount} Items)
                    </Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            <h1>Items in your cart</h1>
                            {cart.items.map((product, idx) => (
                                <CartProduct key={idx} product={product} />
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            {/* <Button variant="success">Purchase items!</Button> */}
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </Modal.Body>
                {productsCount > 0 && (
                    <Modal.Footer>
                        <Button variant="success">Purchase items!</Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};

export default NavbarComponent;
