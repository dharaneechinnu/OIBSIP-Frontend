import React from 'react';
import Nav from '../Nav/Nav';
import './Custom.css';
import { useParams } from 'react-router-dom';

const Custom = ({
 
    selectedBase,
    handleAddToCart,
    handleQuantityChange,
    handleSelectBase,
    handleSelectCheese,
    handleToggleVeggie,
    handleSelectSauce,
    bases,
    selectedSauce,
    sauces,
    selectedCheese,
    cheeses,
    veggies,
    selectedVeggies,
    quantity,
    setSelectedBase,
    setSelectedSauce,
    setSelectedCheese,
    setQuantity,
    handleCartClick,
    handleLogout
}) => {
   
    const { pizzaName } = useParams();
    const handleAddToCartWithNotification = () => {

       
        handleAddToCart(pizzaName); 
        setSelectedBase('');
        setSelectedSauce('');
       setSelectedCheese('');
        setQuantity(1)
    };

    return (
        <>        
          
          
            <div className="center-content">
            <div className="nav"> <Nav handleCartClick={handleCartClick} handleLogout={handleLogout}/></div>
                <div className="custom-container">
                    <h2 className='custom_Title'>Custom Pizza your<br/> {pizzaName}</h2>
                   
                 
                    <div className="custom-options">
                        <div className="custom-option">
                            <h3>Select Pizza Base:</h3>
                            <select value={selectedBase} onChange={handleSelectBase} required>
                                <option value="">Select base</option>
                                {bases.map((base, index) => (
                                    <option key={index} value={base.name}>
                                        {base.name} - ₹{base.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="custom-option">
                            <h3>Select Sauce:</h3>
                            <select value={selectedSauce} onChange={handleSelectSauce} required>
                                <option value="">Select sauce</option>
                                {sauces.map((sauce, index) => (
                                    <option key={index} value={sauce.name}>
                                        {sauce.name} - ₹{sauce.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="custom-option">
                            <h3>Select Cheese:</h3>
                            <select value={selectedCheese} onChange={handleSelectCheese} required>
                                <option value="">Select cheese</option>
                                {cheeses.map((cheese, index) => (
                                    <option key={index} value={cheese.name}>
                                        {cheese.name} - ₹{cheese.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="custom-option">
                            <h3>Select Veggies (Optional):</h3>
                            {veggies.map((veggie, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedVeggies.includes(veggie.name)}
                                        onChange={() => handleToggleVeggie(veggie.name)}
                                    />
                                    {veggie.name} - ₹{veggie.price}
                                </label>
                            ))}
                        </div>
                        <div className="custom-option">
                            <h3>Select Quantity:</h3>
                            <input
    type="number"
    value={quantity}
    min="1"
    maxLength={8}
    onChange={handleQuantityChange}
    required
/>



                            <button onClick={() => { handleAddToCartWithNotification();  }} className='addtocarts'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Custom;
