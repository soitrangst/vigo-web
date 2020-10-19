import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//libs

//libs
import { Constant } from '.././service/infastructural/constant';
import { SuccessToast } from '.././service/infastructural/toast';
import { StorageService } from '.././service/storageService';


import Empty from './Empty';
import { Booking } from './Home';
import { Reservation } from './Seat';
import TicketScreen from './Tickets';


const storageService = new StorageService()

export interface Tickets {
    movie: string,
    date: string,
    seats: Reservation,
}


const Detail: React.FC = () => {

    const dataStore: Booking | Boolean = storageService.get(Constant.bookingData.isData)
    const { bookingReducer } = useSelector((state): any => state)

    const [tickets, setTickets] = useState<Array<Tickets>>([])


    const updateDate = (data:Booking) => {
        const ticketList: Array<Tickets> = data.seats.map((e) => {
            return {
                movie: data.movie,
                date: data.date,
                seats: { ...e }
            }
        })
        setTickets(ticketList)
    }

    useEffect(() => {
        const data: Booking = bookingReducer.response
        if (data) {
            storageService.set(Constant.bookingData.isData, true)
            storageService.set(Constant.bookingData.data, data)
            updateDate(data)
        }
        if (dataStore) {
            updateDate(dataStore as Booking)
        }
    }, [])

    const complete = () => {
        SuccessToast("Saved")
    }


    return (
        <React.Fragment>
            { tickets.length === 0 ? (
                <Empty />
            )
                :
                <div className="page row">

                    {tickets.length > 0 && (
                        <TicketScreen tickets={tickets} />
                    )
                    }
                    {tickets.length > 0 && (
                        <div className="button">
                            <button className="btn" onClick={complete}>Hoàn tất</button>
                        </div>
                    )}

                    {tickets.length === 0 && (
                        <Empty />
                    )}
                </div>
            }
        </React.Fragment>

    );
}

export default Detail;