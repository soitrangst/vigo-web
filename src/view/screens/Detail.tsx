import React, { useEffect, useState } from 'react';

//libs

//libs
import { Constant } from '../../service/infastructural/constant';
import { ToastCustomSuccess } from '../../service/infastructural/toast';
import { StorageService } from '../../service/storageService';
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

    const data: Booking = storageService.get(Constant.bookingData.isData)

    const [tickets, setTickets] = useState<Array<Tickets>>([])


    useEffect(() => {
        if (data) {

            const ticketList: Array<Tickets> = data.seats.map((e) => {
                return {
                    movie: data.movie,
                    date: data.date,
                    seats: { ...e }
                }
            })
            console.log(ticketList);
            setTickets(ticketList)
        }
    }, [])

    const complete = () => {
        ToastCustomSuccess("Saved")
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