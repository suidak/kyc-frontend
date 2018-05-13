export class User {
    id:string;
    email: string;
    password: string;
    confirmPassword?: string;
    idSite:String;

    constructor(id:string='0' ,email: string='', password: string='',idSite:string) {
        this.id=id;
        this.email=email;
        this.idSite=idSite;

}
}
