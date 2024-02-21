/* eslint-disable react/jsx-no-duplicate-props */
import React, {  useEffect, useState } from "react";
import Login from "./Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register/Register";
import Api from './Api/Api';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Forget from "./Forget/Forget";
import Restpassword from "./Forget/RestPassword";
import Custom from "./Home/Custom";
import Cart from "./Cart/Cart";
import Nav from "./Nav/Nav";
import Order from "./ViewOrder/Order";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp,setOTP]=useState('')
  const [name, setName] = useState('');
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [quantity, setQuantity] = useState(1); 
  const [userId, setUserId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const history = useNavigate();
  const[PlaceOrder,setPlaceorder]= useState([])
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await Api.post('/Auth/login', { email, password });
        const { userId, role, accessToken } = response.data;

        if (role === "User" || role === "admin") {
            console.log(response.data);
            console.log('User ID:', userId);
            
            // Store user ID and access token in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('accessToken', accessToken);

            // Redirect based on user role
            if (role === "User") {
                history('/home');
            } else if (role === "admin") {
                history('/admin');
            }
        }
    } catch (error) {
        console.error('Error in API call:', error);
    }
};

const handleLogout = () => {
    // Remove stored data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('placeOrder');
    
    // Redirect to login page
    history('/');
};

  const handleSign = async (e) => {
    e.preventDefault();
    try {
      await Api.post('/Auth/reg', { name, email, password });
      history('/');
    } catch (err) {
      console.log(err);
    }
  };

  const [totalamount, settotalamount] = useState(0);

  
  useEffect(() => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.totalPrice;
    });
    settotalamount(total);
  }, [cartData]);

  const handlePayment = async () => {
    try {
      const amountInPaisa = totalamount ;
      const response = await Api.post("/apis/orders",{amount:amountInPaisa});
      const { data } = response.data;
  
      const options = {
        key: "rzp_test_epPmzNozAIcJcC", 
        amount: data.amount,
        currency: "INR",
        name: "Pizza-App",
        description: "Purchase Description",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await Api.post("/apis/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if(verifyResponse.status === 200) {
              console.log(verifyResponse.data.message);
              handlePlaceOrder();
            }
          } catch (error) {
            console.error("Error frontrnd verifying payment:", error);
          }
        },
        theme: {
          color: "#F37254",
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Error frontrnd initiating payment:", error);
    }
  };
  
  

  const bases = [
    { name: 'Thin Crust', price: 1 },
    { name: 'Regular Crust', price: 1 },
    { name: 'Deep Dish', price: 1 },
    { name: 'Stuffed Crust', price: 1 },
    { name: 'Gluten-Free Crust', price: 1 }
  ];
  const sauces = [
    { name: 'Tomato Sauce', price: 1 },
    { name: 'Pesto Sauce', price: 1 },
    { name: 'Barbecue Sauce', price: 1 },
    { name: 'Alfredo Sauce', price: 1 },
    { name: 'Buffalo Sauce', price: 1 }
  ];
  const cheeses = [
    { name: 'Mozzarella', price: 1 },
    { name: 'Cheddar', price: 1 },
    { name: 'Parmesan', price: 1 },
    { name: 'Provolone', price: 1 },
    { name: 'Gouda', price: 1 }
  ];
  const veggies = [
    { name: 'Mushrooms', price: 1 },
    { name: 'Onions', price: 1 },
    { name: 'Bell Peppers', price: 1 },
    { name: 'Olives', price: 1 },
    { name: 'Spinach', price: 1 }
  ];

  const calculateTotalPrice = () => {
    let price = 0;
    price += bases.find((base) => base.name === selectedBase)?.price || 0;
    price += sauces.find((sauce) => sauce.name === selectedSauce)?.price || 0;
    price += cheeses.find((cheese) => cheese.name === selectedCheese)?.price || 0;
    price += selectedVeggies.reduce((acc, veggie) => {
      const veggiePrice = veggies.find((v) => v.name === veggie)?.price || 0;
      return acc + veggiePrice;
    }, 0);
    setTotalPrice(price * quantity);
  };

  const handleSelectBase = (e) => {
    setSelectedBase(e.target.value);
    calculateTotalPrice();
  };

  const handleSelectSauce = (e) => {
    setSelectedSauce(e.target.value);
    calculateTotalPrice();
  };

  const handleSelectCheese = (e) => {
    setSelectedCheese(e.target.value);
    calculateTotalPrice();
  };

  const handleToggleVeggie = (veggie) => {
    setSelectedVeggies((prevVeggies) =>
      prevVeggies.includes(veggie)
        ? prevVeggies.filter((item) => item !== veggie)
        : [...prevVeggies, veggie]
    );
    calculateTotalPrice();
  };


  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);

    // Calculate total price
    const basePrice = selectedBase ? bases.find(base => base.name === selectedBase)?.price || 0 : 0;
    const saucePrice = selectedSauce ? sauces.find(sauce => sauce.name === selectedSauce)?.price || 0 : 0;
    const cheesePrice = selectedCheese ? cheeses.find(cheese => cheese.name === selectedCheese)?.price || 0 : 0;
    const veggiePrice = selectedVeggies.reduce((total, veggieName) => {
        const veggie = veggies.find(veggie => veggie.name === veggieName);
        return total + (veggie ? veggie.price : 0);
    }, 0);

    const newTotalPrice = (basePrice + saucePrice + cheesePrice + veggiePrice) * newQuantity;
    setTotalPrice(newTotalPrice);
};

  const handleCartClick = async () => {
      handleClick(userId)
  };
  const handleClick = async(userId) => {
    try {
      console.log(userId);
      const response = await Api.get(`/api/cartData/${userId}`)
      console.log("get cart : ", response.data);
      setCartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAddToCart = async (pizzaName) => {
    try {
      const orderData = {
        pizzaName:pizzaName,
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        veggies: selectedVeggies,
        quantity: quantity,
        userId: userId,
        totalPrice: totalPrice
      };
  
      console.log(orderData);
  
      const response = await Api.post('/api/postcart', orderData);
  
      if (response.status === 200) {
        console.log('Item added to cart successfully');
        
        calculateTotalPrice();
        
        handleClick(userId);
        history('/home')
      } else {
        console.error('Failed to add item to cart:', response.data);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

 
  const handlePlaceOrder = async () => {
    try {
        const orderDetails = [];  
        for (const cartItem of cartData) {
            const orderData = {
                pizzaName: cartItem.pizzaName,
                userId: userId,
                base: cartItem.base,
                sauce: cartItem.sauce,
                cheese: cartItem.cheese,
                veggies: cartItem.veggies,
                quantity: cartItem.quantity,
                totalPrice: cartItem.totalPrice
            };
            orderDetails.push(orderData);
          
            const response = await Api.post('/api/pizza', orderData);
            if (response.status === 200) {
                
               const {data} =  await Api.delete('/api/cart', userId)
                 if(data.status)
                 {
                  console.log('Order placed successfully for item:', cartItem);
                console.log("success");
                  console.log("Delete cart")
                  console.log('Cart data cleared');
                  history(`/ViewOrder`);
                 }
               
             
            } else {
                console.error('Failed to place order for item:', cartItem);
             
            }
        }
    } catch (error) {
        console.error('Error placing order:', error);
    }
};




const handleStatusChange = async (orderId, newStatus, updateStatusLocally) => {
  try {
      await Api.put(`api/order/${orderId}`, { status: newStatus });
      updateStatusLocally(orderId, newStatus); 
  } catch (error) {
      console.error("Error updating status:", error);
  }
};





  
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login 
          handleSubmit={handleSubmit} 
          setName={setName} 
          setEmail={setEmail} 
          setPassword={setPassword} />} 
        />

        <Route path="/reg" element={<Register 
          handlesign      ={handleSign}
          setName         ={setName}
          setEmail        ={setEmail}
          setPassword     ={setPassword}
         
          password={password}
          email ={email}
          otp={otp}
          setOTP={setOTP}
          name={name}
          />} 
        />
             
        <Route path="/home" element={<Home
         
          setUserId={setUserId}
          cartData={cartData}
          handleCartClick={handleCartClick}
          totalPrice={totalPrice}
          setCartData={setCartData}
          handlePlaceOrder={handlePlaceOrder}
          handleLogout={handleLogout}
          />} 
        />
       

       <Route
  path="/Custom/:pizzaName"
  element={
    <Custom
      setSelectedBase={setSelectedBase}
      setSelectedSauce={setSelectedSauce}
      setSelectedCheese={setSelectedCheese}
      setQuantity={setQuantity}
      selectedBase={selectedBase}
      handleQuantityChange={handleQuantityChange}
      handleSelectBase={handleSelectBase}
      bases={bases}
      selectedSauce={selectedSauce}
      handleSelectSauce={handleSelectSauce}
      sauces={sauces}
      selectedCheese={selectedCheese}
      handleSelectCheese={handleSelectCheese}
      cheeses={cheeses}
      veggies={veggies}
      selectedVeggies={selectedVeggies}
      handleToggleVeggie={handleToggleVeggie}
      quantity={quantity}
      handleAddToCart={handleAddToCart}
      handleLogout={handleLogout}
    />
  }
/>

        <Route path="/admin" element={<Admin handleStatusChange={handleStatusChange} />} />
        <Route path="/cart" element={<Cart 
           handleCartClick={handleCartClick}
        totalPrice={totalPrice}
        totalamount={totalamount}
        handlePlaceOrder={handlePlaceOrder}
        handlePayment={handlePayment}
        cartData={cartData}
        setCartData={setCartData}
        handleLogout={handleLogout}
        />} />
        <Route path="/nav" element={<Nav 
         handleCartClick={handleCartClick}
         handleLogout={handleLogout}
        />}/>
        <Route path="/ViewOrder" element={<Order setPlaceorder={setPlaceorder} userId={userId} PlaceOrder={PlaceOrder}  handleLogout={handleLogout}  handleCartClick={handleCartClick}  updateStatusLocally={handleStatusChange} />} />
        <Route path="/Auth" element={<Forget />} />
        <Route path="/Auth/respwd" element={<Restpassword />} />
      </Routes>   
    </>    
  );
}

export default App;