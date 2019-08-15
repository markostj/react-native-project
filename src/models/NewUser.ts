export interface NewUser {
    name: string;
    email: string;
    password: string;
    birth: string;
    refereeCenter: string;
    number: string;
}

export class NewUser {
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.birth = '';
        this.refereeCenter = '';
        this.number = '';
    }
}
