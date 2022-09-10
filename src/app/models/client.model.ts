
import { Identification } from "./identification.model";
export class Client {
    constructor(
    public id:number,
    public    clientId : string,
    public    email:string,
    public    username:string,
    public    DOB : string,
    public    country: string,
    public    postalCode:string,
    public    password:string,
    public    identity : Identification){
    }
    }
