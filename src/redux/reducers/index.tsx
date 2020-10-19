import { combineReducers } from 'redux';
import signinReducer from "./signin-reducer";
import signupReducer from "./signup-reducer";
import bookingReducer from "./booking-reducer"

const rootReducer = combineReducers({
    signinReducer,
    signupReducer,
    bookingReducer
})



export type RootState = ReturnType<typeof rootReducer>
export default rootReducer