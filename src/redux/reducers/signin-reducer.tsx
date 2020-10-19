import { SIGNIN } from "../constants"

const initalSignin = {
    response: "",
    loading: true,
    error: false
}

export default function (state = initalSignin, action:any) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case SIGNIN.SIGNIN_LOAD:
            return { response: "", loading: true, error: false };
        case SIGNIN.SIGNIN_LOAD_SUCCESS:
            return { ...state, loading: false, response };
        case SIGNIN.SIGNIN_LOAD_FAIL:
            return { loading: false, error: true, response: err }
        default:
            return state;
    }
}