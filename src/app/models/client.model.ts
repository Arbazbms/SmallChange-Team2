
import { Identification } from "./identification.model";
export class Client {
    constructor(

    public    clientId : string,
    public    email:string,
    public    password:string,
    public    date_of_birth : string,
    public    country: string,
    public    postal:string,
    public    id : Identification[],
    public token:String
    ){}
 
    }
