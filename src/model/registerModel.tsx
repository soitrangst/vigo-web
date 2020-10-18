export interface RegisterModel {
    first_name: string,
    last_name:string,
    phone?: number,
    image?: string,
    email: string,
    password: string,
    organization: Organization}

interface Organization {
    name: string ,
    email: string ,
    status: string,
    is_main: string
}