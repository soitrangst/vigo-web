import { Booking } from "../../view/Home";
import {
    SIGNIN, SIGNUP,BOOKING
} from "../constants";

const checkAuth = (user:any) => ({
    type: SIGNIN.SIGNIN_LOAD,
    user
})

const signUp = (user:any) => ({
    type: SIGNUP.SIGNUP_LOAD,
    user
})

const booking = (booking:Booking) => ({
    type: BOOKING.BOOKING_LOAD_SUCCESS,
    booking
})

export {
    checkAuth, signUp,booking
}