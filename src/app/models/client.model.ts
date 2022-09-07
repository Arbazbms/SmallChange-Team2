import { Identification } from "./identification.model";
export class Client {
    constructor(
    public    clientId : string,
    public    email:string,
    public    DOB : string,
    public    country: string,
    public    postalCode:string,
    public    identity : Identification){
    }
    }
