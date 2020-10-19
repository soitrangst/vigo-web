import { SIGNIN,SIGNUP } from "../constants/index";
import { call, put, takeLatest } from "redux-saga/effects";

import { Signin,Signup } from "../api/index"

function* handleLoginLoad(payload:any) {
    try {
        const response = yield call(Signin, payload)
        yield (
            put({ type: SIGNIN.SIGNIN_LOAD_SUCCESS, response })
        )

    } catch (error) {
        yield put({ type: SIGNIN.SIGNIN_LOAD_FAIL, error })
    }
}

function* handleSignUpLoad(payload:any) {
    try {
        const response = yield call(Signup, payload)
        yield (
            put({ type: SIGNUP.SIGNUP_LOAD_SUCCESS, response })
        )

    } catch (error) {
        yield put({ type: SIGNUP.SIGNUP_LOAD_FAIL, error })
    }
}

export default function* watchLOGIN() {
    console.log("hello girl")
    yield takeLatest(SIGNIN.SIGNIN_LOAD, handleLoginLoad)
    yield takeLatest(SIGNUP.SIGNUP_LOAD, handleSignUpLoad)
}