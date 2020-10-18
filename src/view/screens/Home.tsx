import React, { useState, useEffect, useRef } from 'react';

import Seat, { Reservation } from "./Seat"


import M from "materialize-css"

import {ToastCustomWarning} from "../../service/infastructural/toast"

import { StorageService } from '../../service/storageService';
import { Constant, Url } from '../../service/infastructural/constant';
import { useHistory } from 'react-router-dom';


const storageSerivce = new StorageService()

interface User {
  name: string,
  email: string,
}

export interface Booking extends User {
  movie: string,
  date: string,
  seats: Array<Reservation>,
  totalPrice: number
}

function Home(): JSX.Element {

  const history= useHistory()

  const selectMovieRef = useRef(null)
  const selectDateRef = useRef(null)
  const collapsible = useRef(null)

  const [movie, setMovie] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [seats, setSeats] = useState<Array<Reservation>>([])
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>()
  const [totalPrice, setTotalPrice] = useState<number>()

  useEffect(() => {
    M.Collapsible.init(collapsible.current, { accordion: false })
    M.FormSelect.init(selectMovieRef.current,)
    M.FormSelect.init(selectDateRef.current)
  }, [])

  const updateTotalPrice = (e: Array<Reservation>): void => {
    if (e.length > 0) {
      setTotalPrice(
        e.reduce((a, l) => a += l.price, 0)
      )
      return
    }
    setTotalPrice(0)
  }

  const typeSeats = (): string => {
    return seats.map((e) => { return e.name }).join(',')
  }

  const updateSeat = (e: Array<Reservation>): void => {
    setSeats(e)
    updateTotalPrice(e)
  }

  const alertSelect = (e: any, name: string): void => {
    const element: HTMLElement = e.target.parentElement
    if (name === "date") {
      if (!movie) {
        ToastCustomWarning('Vui lòng chọn film')
      } else {
        element.classList.remove('disable')
      }
    }
    if (name === "seat") {
      if (!date) {
        ToastCustomWarning('Vui lòng chọn ngày')
      } else {
        element.classList.remove('disable')
      }
    }
  }

  const submit = ():void => {
    if(validate()){
      const dataform:Booking = {
        movie,
        date,
        seats,
        name:name.trim(),
        email:email.trim(),
        totalPrice
      }
      console.log();
      
      storageSerivce.set(Constant.bookingData.isData,true)
      storageSerivce.set(Constant.bookingData.data,dataform)
      history.push(Url.receive)
    }
  }

  const validate = ():boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!emailRegex.test(email)){
      
      ToastCustomWarning('Vui lòng nhập đúng email')
      return false
    }
    if(name.trim().length < 1){
      ToastCustomWarning('Vui lòng nhập tên')
      return false
    }
    if(!movie){
      
      ToastCustomWarning('Vui lòng chọn film')
      return false
    }
    if(!date){
      ToastCustomWarning('Vui lòng chọn ngày xem')
      return false
    }
    if(!totalPrice){
      ToastCustomWarning("Vui lòng chọn ghế")
      return false
    }
    return true
  }

  return (
    <div className="container">

      <div className="form__user">
        <form className="col s12">
          <div className="row">

            <div className="input-field col s12">
              <input  id="name" type="text"
                onChange={(e) => setName(e.target.value)} />
              <label htmlFor="name">Your name</label>
            </div>

            <div className="input-field col s12">
              <input  id="email" type="text"
                onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Your email</label>
            </div>

          </div>
        </form>
      </div>

      <ul ref={collapsible} className="collapsible">
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Sellect Movie</div>
          <div className="collapsible-body">
            <div className="input-field col s12">
              <select ref={selectMovieRef} onChange={(e) => setMovie(e.target.value)} >
                <option  >Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <label>Sellect your movie</label>
            </div>
          </div>
        </li>
        <li className='disable' onClick={(e) => alertSelect(e, "date")}>
          <div className="collapsible-header "><i className="material-icons">place</i>Sellect date </div>
          <div className="collapsible-body">
            <div className="input-field col s12">
              <select ref={selectDateRef} onChange={(e) => setDate(e.target.value)}>
                <option  >Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <label>Sellect your date</label>
            </div>
          </div>
        </li>
        <li className='disable' onClick={(e) => alertSelect(e, "seat")}>
          <div className="collapsible-header"><i className="material-icons">whatshot</i>Seats</div>
          <div className="collapsible-body">
            <Seat updateSeat={updateSeat} />
          </div>
        </li>
      </ul>

      <div className="bottom-content">
        <div className="product-details">

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Tên khách hàng</td>
                <td> {name} </td>
              </tr>
              <tr>
                <td className="label"> Email </td>
                <td>
                  {email}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Phim</td>
                <td> {movie} </td>
              </tr>
              <tr>
                <td className="label">Suất chiếu</td>
                <td>
                  {date}
                </td>
              </tr>
              <tr>
                <td className="label">Phòng chiếu</td>
                <td>Cinema 6</td>
              </tr>
              <tr className="block-seats" >
                <td className="label">Loại ghế</td>
                <td>{seats.length > 0 ? seats[0].zone : ''}</td>
              </tr>
              <tr className="block-seats" >
                <td className="label">Ghế</td>
                <td>{seats.length > 0 ? typeSeats() : ''}</td>
              </tr>
            </tbody>
          </table>

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Số lượng vé</td>
                <td> {seats.length > 0 ? seats.length : ''} </td>
              </tr>
              <tr>
                <td className="label"> Giá vé </td>
                <td>
                  {seats.length > 0 ? seats[0].price : ''}
                </td>
              </tr>
              <tr>
                <td className="label"> Tổng tiền </td>
                <td>
                  {totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="booking">
          <button className="btn" onClick={()=>submit()}>Book now</button>
        </div>
      </div>
    </div>
  )
}

export default Home;