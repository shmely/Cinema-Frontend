import { Seat } from './Theater';

export interface CinemaTicket {
    _id?: string;
    movieName: string;
    date: Date;
    time: string;
    seat: Seat;
    hall: string,
    paymentId: string
}