
export interface Booking {
  name: string,
  email: string,
  phone: number,
  movie: string,
  date:Date,
  seat: [
    { id: string }
  ],
}