import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./ShoppingCard.css";
import "../Auth/Auth.css";
import CreditCard from "../CreditCard/CreditCard";
import Loading from "../Loading/Loading";
import SuccessDisplay from "../SuccessDisplay/SuccessDisplay";

const ShoppingCard = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const showCleaner =()=>{
    setShowSuc(false)
    dispatch({type:'clear-item'})
    props.pathChanger('display')
}

const showSuc =()=>{
  setShowSuc(true)
}

  

  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuc] = useState(false)
  const [firstRender, setFirstRender] = useState(false)

  const endLoading=()=>{
    setLoading(false)
  }

  const startLoading =()=>{
    setLoading(true)
  }

  const [showVisa ,  setShowVisa] = useState(false)

   


    const enrollPortalHandler =()=>{
      
      if(!user.id){
        console.log('nope')
        navigate('/login')
      }
      else{
        setShowVisa(true)
      }
    }

    const hideVisa =()=>{
      setShowVisa(false)
    }

  const [totalPrice, setTotalPrice] = useState(0);

  const [run, setRun] = useState(false);

  const removeItem = (id, price) => {
    dispatch({ type: "remove-item", payload: { id } });
    if(cart.length === 1){
    setTotalPrice((prev) => prev - +price -2);
    hideVisa()
    }
    else{
    setTotalPrice((prev) => prev - +price);
    }

  };

  const checkOutHandler = () => {
    setShowVisa(true)
  };

  const purchaseChecker = async()=>{
    if(user.id){
    setLoading(true)
    const response = await fetch(`http://localhost:5000/api/cus/${user.id}`, {
        method: 'GET'
      });

      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message)
      }
      console.log(responseData.getCourse.courses)
      let output = responseData.getCourse.courses
      let finalCart = cart.filter((each)=> {
        console.log(each.course.id)
        return !output.includes(each.course.id); 
      })

      
        console.log(finalCart)
        dispatch({type:'insert-item',payload:{finalCart}})
        setLoading(false)
        }
  }

  useEffect(() => {
    setFirstRender(true)
    cart.map((each) => {
      setTotalPrice((prev) => prev + +each.course.price);
    });
    if(cart.length > 0 && firstRender!==true){
      setTotalPrice((prev)=>prev + 2)
    }
  }, []);

  


  let body = cart.map((each) => {
    return (
      <div key={each.course.id} className="added-items-box">
        <div className="each-added-item">
          <div className="item-img-box">
            <img
              className="item-img"
              src={`http://localhost:5000/${each.course.image}`}
            />
          </div>
          <div className="item-info">
            <span className="item-name">{each.course.name}</span>
            <span className="item-price">$ {each.course.price}</span>
          </div>
          <div
            onClick={() => removeItem(each.course.id, each.course.price)}
            className="item-remove"
          >
            Remove
          </div>
        </div>
      </div>
    );
  });

  let bodyCheckOut
  
  if(cart.length > 0 ){
    if(!showVisa){
    bodyCheckOut = (
      <>
      <div>
        <button className="check-out-but" onClick={enrollPortalHandler}>Check out</button>
      </div>
    
    </>
    )}
  }
  

  return (
    <>
    
    <Loading loading={loading} />
            {<SuccessDisplay showSuccess={showSuccess} showCleaner={showCleaner}/>}
      <div>
        <div className="cart-container">
          <div className="cart-title">Shopping Cart</div>
          <div className="cart-box">
            <div className="added-items">
              <div className="total-items-count">
                {cart.length} {cart.length <2?'course':'courses'} in cart
              </div>

              {cart.length > 0 && body}
            </div>
            <div className="total-price-info">
              <div className="total-items-count">Total:
              {cart.length > 0 &&
              <div className="deli-fees">(included delivery fees)</div>}</div>
            
              <><div className="total-price">${totalPrice}</div></>
              {
                bodyCheckOut
              }
              {
                showVisa && <CreditCard endLoading={endLoading} showSuc={showSuc} startLoading={startLoading} showSuccess={showSuccess} showCleaner={showCleaner} pathChanger={props.pathChanger} totalQ={cart.length} totalP={totalPrice} />
              }
            </div>
          </div>
          {cart.length < 1 && <div className="empty-cart">😓 There aren't any items in cart yet!</div>
        }
        </div>
      </div>
    </>
  );
};

export default ShoppingCard;
