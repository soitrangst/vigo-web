import { BOOKING } from "../constants"

const initBooking = {
    response: '',
    loading: true,
    error:false
}

export default function (state = initBooking, action:any) {
    const response = action.booking;
    const err = action.error;
    switch (action.type) {
        case BOOKING.BOOKING_LOAD:
            return { ...state };
        case BOOKING.BOOKING_LOAD_SUCCESS:
            return { ...state,loading: false, response };
        case BOOKING.BOOKING_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}