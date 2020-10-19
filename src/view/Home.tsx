import React, { useState, useEffect, useRef } from 'react';

import Seat, { Reservation } from "./Seat"



import { WarningToast } from ".././service/infastructural/toast"

import { StorageService } from '.././service/storageService';
import { Constant, Url } from '.././service/infastructural/constant';
import { useHistory } from 'react-router-dom';
import { Collapse, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { booking } from '../redux/actions';



const { Panel } = Collapse;
const { Option } = Select;

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

  const history = useHistory()
  const dispatch = useDispatch()


  const [movie, setMovie] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [seats, setSeats] = useState<Array<Reservation>>([])
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>()
  const [totalPrice, setTotalPrice] = useState<number>()

  useEffect(() => {
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
        WarningToast('Vui lòng chọn film')
      } else {
        element.classList.remove('disable')
      }
    }
    if (name === "seat") {
      if (!date) {
        WarningToast('Vui lòng chọn ngày')
      } else {
        element.classList.remove('disable')
      }
    }
  }

  const submit = (): void => {
    if (validate()) {
      const dataform: Booking = {
        movie,
        date,
        seats,
        name: name.trim(),
        email: email.trim(),
        totalPrice
      }
      dispatch(booking(dataform))
      history.push(Url.receive)
    }
  }

  const validate = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!emailRegex.test(email)) {

      WarningToast('Vui lòng nhập đúng email')
      return false
    }
    if (name.trim().length < 1) {
      WarningToast('Vui lòng nhập tên')
      return false
    }
    if (!movie) {

      WarningToast('Vui lòng chọn film')
      return false
    }
    if (!date) {
      WarningToast('Vui lòng chọn ngày xem')
      return false
    }
    if (!totalPrice) {
      WarningToast("Vui lòng chọn ghế")
      return false
    }
    return true
  }

  return (
    <div className="container">

      <div className="form__user">

        <div className="input-field">
          <label htmlFor="name">Your name</label>
          <Input id="name" type="text"
            autoComplete="false"
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-field">
          <label htmlFor="email">Your email</label>
          <Input id="email" type="text"
            autoComplete="false"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

      </div>

      <Collapse accordion>

        <Panel header="Sellect Movie" key="1">
          <Select placeholder="Sellect your movie"
            className="panel-select"
            onChange={(value: string) => setMovie(value)} >
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Panel>

        <Panel
          header={<div onClick={(e) => alertSelect(e, "date")}>Sellect date</div>} key="2"
          disabled={!movie}
        >
          <Select
            className="panel-select"
            placeholder="Sellect your date"
            onChange={(value: string) => setDate(value)}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option12">Option 2</Option>
            <Option value="option13">Option 3</Option>
          </Select>
        </Panel>

        <Panel header="Seats" key="3"
          extra={<div onClick={(e) => alertSelect(e, "seat")}></div>}
          disabled={!date}
        >
          <Seat updateSeat={updateSeat} />
        </Panel>
      </Collapse>

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
          <button className="btn" onClick={() => submit()}>Book now</button>
        </div>
      </div>
    </div>
  )
}

export default Home;