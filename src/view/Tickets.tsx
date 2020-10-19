import React from 'react';
import { Tickets } from './Detail';



import barCode from ".././assets/images/barcode.png";
import iconMoive from ".././assets/images/icon-moive.png"
import { Col, Row } from 'antd';

type PropsType = {
    tickets: Array<Tickets>
}

const TicketScreen: React.FC<PropsType> = (props: PropsType) => {

    const { tickets } = props


    return (
        <React.Fragment>

            {tickets.map((e) => {
                
                const key = e.seats.loc,
                    date = e.date,
                    movie = e.movie,
                    price = e.seats.price,
                    seat = e.seats.name,
                    type = e.seats.zone

                return (
                        <Col key={key} span={24}>
                            <div className="card col s12 m10 l7 row" >
                                <div className="card-body col l10 ">
                                    <div className="card-items">
                                        <div className="title ">
                                            <span>Vé xem phim</span>
                                        </div>

                                        <div className="item">
                                            <span className="label">Date</span>
                                            <div>
                                                <span> {date} </span>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <span className="label">Type</span>
                                            <div>
                                                <span> {type} </span>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <span className="label">Seat</span>
                                            <div>
                                                <span> {seat} </span>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <span className="label">Hall</span>
                                            <div>
                                                <span> Americano </span>
                                            </div>
                                        </div>


                                        <div className="item">
                                            <span className="label">Price</span>
                                            <div>
                                                <span> {price} </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="datted">
                                        <div className="point">
                                        </div>
                                        <div className="point">
                                        </div>
                                        <div className="point">
                                        </div>
                                        <div className="point">
                                        </div>
                                        <div className="point">
                                        </div>
                                        <div className="point">
                                        </div>
                                    </div>
                                    <div className="card-items">
                                        <div className="item title underline">
                                            <div className="icon__medium">
                                                <img src={iconMoive} alt="icon" />
                                            </div>
                                            <span>CINEMA HALL</span>
                                        </div>

                                        <div className="item underline center">

                                            <span className="label label__white"> {movie} </span>

                                        </div>

                                        <div className="item underline">

                                            <div className="item-child">
                                                <span className="label">Date</span>
                                                <div>
                                                    <span> {date} </span>
                                                </div>
                                            </div>

                                            <div className="item-child border__left">
                                                <span className="label">Time</span>
                                                <div>
                                                    <span> {date} </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="item underline">

                                            <div className="item-child">
                                                <span className="label">seat</span>
                                                <div>
                                                    <span>{seat}</span>
                                                </div>
                                            </div>

                                            <div className="item-child border__left">
                                                <span className="label">Hall</span>
                                                <div>
                                                    <span>Americano</span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="code col l2">
                                    <div className="code-item">
                                        <img src={barCode} alt="" />
                                    </div>
                                </div>
                            </div>

                        </Col>
                )
            })}
        </React.Fragment>
    );
}

export default TicketScreen;