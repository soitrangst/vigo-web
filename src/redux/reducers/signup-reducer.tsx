import { SIGNUP } from "../constants"

const initalSignup = {
    response: "",
    loading: true,
    error:false
}

export default function (state = initalSignup, action:any) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case SIGNUP.SIGNUP_LOAD_SUCCESS:
            return { ...state,loading: false, response };
        case SIGNUP.SIGNUP_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}