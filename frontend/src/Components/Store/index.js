
import {createStore} from 'redux'

const initialState = {
    user:{},
    cart:[],
    kickOut:false
} 

const counterReducer = (state = initialState, action) =>{
    if(action.type === 'clear-user'){
            state.user = {}
    }
    else if(action.type === 'kick-out'){
        state.kickOut = true
    }
    else if(action.type === 'clean-kick-out'){
        state.kickOut = false
    }
    else if(action.type === 'input'){
            state.user = action.payload.addUser
        
        }
    else if(action.type === 'add-item'){

            const newCart = [...state.cart]
            newCart.push({'course':action.payload.detailCourse})
            state.cart = newCart
            console.log(action.payload.detailCourse)
            console.log(state)
        }
        else if(action.type === 'insert-item'){

            const newCart = []
            newCart.push({'course':action.payload.finalCart})
            state.cart = newCart
            console.log(state)
        }
    else if(action.type === 'remove-item'){
        
        console.log(action.payload.id)
        const item = action.payload.id
        state.cart = state.cart.filter((each)=>each.course.id !== item)
        console.log(state.cart)
    }
    else if(action.type === 'clear-item'){
        state.cart = [] 
        console.log('clear')
    }
    
    return state
}


const store = createStore(counterReducer)

export default store