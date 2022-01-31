import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [show,setShow]=useState(false)
    const [modal, setModal] = React.useState(false);
    const [input,setInput]=React.useState({
        email:'',
        adress:'',
        number:''
    })

    const handleInput=(e)=>{


        const name=e.target.name;
        const value=e.target.value;
      
      
      setInput((preInput)=>{
      return{
         ...preInput,
         [name]: value
      }
      })
      }

     
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async() => {
        // const {paymentID, address} = payment;
const Data={
    cart:cart,
    adress:input.adress,
    number:input.number
}
       console.log({Data})
        await axios.post('/api/payment', Data, 
        {
            headers: {Authorization: token}
        
        }
        ).then(()=>{
            console.log("successful")
        }).catch(e=>{
            console.log('your error to send data  '+e)
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }
























    const sendCheckout=async(e)=>{
        e.preventDefault();
        const Data={
          //   email:input.email,
            adress:input.adress,
            number:input.number,
            cart:cart
        }

 console.log(cart)
await axios.post('/api/check-out',Data,
  {
    //   method:'POST',
    headers: {
        Authorization: token
      
    }

}
).then(()=>{
  console.log("successful")
 

}).catch((e)=>{
  console.log("your error to send data  "+e)
})

// alert("You have successfully placed an order.")
alert("you have successfully placed an order")
  
setCart([])
addToCart([])
    }
















    const testing=()=>{
  
        const toggle = () => setModal(!modal);
      
        return (
          <>
             
        
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>ReactJS Reactstrap Modal Component</h4>
        <Button color="danger"
                onClick={toggle}>Click me to open Modal</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}>Sample Modal Title</ModalHeader>
                <ModalBody>
                    Sample Modal Body Text to display...
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Okay</Button>
                </ModalFooter>
            </Modal>
      </div>
            </>
        )
       
    }
    const toggle = () => setModal(!modal);

    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>Rs {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: Rs {total}</h3>
                {/* <StripeCheckout amount={total}
                onSuccess={tranSuccess}
                
                /> */}
                {/* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */}
                {/* <button onClick={testing}>Testing purpose</button> */}
                <Button color="danger"
                onClick={toggle}>Check out</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}>Shipping details</ModalHeader>
                <ModalBody>
                <Form>
        {/* <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" value={input.email} onChange={handleInput} placeholder="Enter your email" />
        </FormGroup> */}
        <FormGroup>
          <Label >Adress</Label>
          <Input type="text" name="adress" id="examplePassword" value={input.adress} onChange={handleInput} placeholder="Enter your adress" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">phone number</Label>
          <Input type="text" name="number" value={input.number} id="exampleEmail" onChange={handleInput} placeholder="Enter your phone number" />
        </FormGroup>
        </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={toggle}>cancel</Button>
                    <Button color="primary" onClick={(e)=>{
                    //   sendCheckout(e)
                     tranSuccess()
                       toggle()

                    }}>save</Button>
                </ModalFooter>
            </Modal>
            </div>
        </div>
    )
}

export default Cart
