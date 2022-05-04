import React, { useRef, useState } from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './CardUtils'
import './CreditCard.css'



const CreditCard = (props) => {

  console.log('run')
  const user = useSelector(state => state.user)
  const address= useRef()
  const phoneNumber = useRef()

  const navigate = useNavigate();


  const cart = useSelector((state) => state.cart);


  const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const dispatch = useDispatch()

    const onSubmit =async()=>{
      props.startLoading()
      let addCourses = []
      cart.map(each=>console.log(addCourses.push(each.course.id)))
      
        try {
            const response = await fetch('http://localhost:5000/api/enroll', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
               buyer:user.name,
               date:date,
               totalQuantity:props.totalQ,
               totalPrice:props.totalP,
               course:cart,
               address:address.current.value,
               phoneNumber:phoneNumber.current.value
              })
            });
      
            const responseData = await response.json();
            if(!response.ok){
              throw new Error(responseData.message)
            }
            
            const responseTwo = await fetch('http://localhost:5000/api/cus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              customer:user.id,
               courses:addCourses
              })
            });

            const responseDataTwo = await responseTwo.json();
            if(!responseTwo.ok){
              throw new Error(responseDataTwo.message)
            }
            console.log(responseDataTwo)
            
            props.endLoading()
            props.showSuc()
          } catch (err) {
            console.log(err.message)
            props.endLoading()
          }
    }


return (
  <Styles>
    
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
        valid
      }) => {
        return (
            <>
          <form onSubmit={handleSubmit} className='visa-form'>
            <Card
              number={values.number || ''}
              name={values.name || ''}
              expiry={values.expiry || ''}
              cvc={values.cvc || ''}
              focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div>
                <input ref={address} placeholder='Address'/>
            </div>
            <div>
                <input className='phone' ref={phoneNumber} type='number' placeholder='Phone number'/>
            </div>
            
            <div className="buttons">
              <button type='submit'  onClick={()=>console.log(valid)}>
                Enroll
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
           
          </form>
          </>
        )
      }}
    />
  </Styles>
)}

export default CreditCard
