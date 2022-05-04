import React from "react";

import './Payment.css'

const Payment =()=>{
    return(
        <>
        <div className="black-ground"></div>
        <div id="payment" className="Payment getEnded">
    <h2 >Payment Information</h2>
    
  <div className="each-radio credit-choice" >
    <div>    
    
    <label  >Credit Card</label>
    </div>
    <img src="../assets/Credit-Logo.png"  alt="" />
  
  </div>
  <div className="credit noshow-credit">
         
    <p >Card Number</p>
    
  </div>
  <div>
    <button id="but" className="sub no-disable" >Buy Now</button>
  </div>
  </div>
        </>
    )
}

export default Payment