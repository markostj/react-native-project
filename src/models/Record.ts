export interface Record {
    date: string;
    place: string;
    league: string;
    round: string;
    homeTeam: string;
    awayTeam: string;
    referee: string;
    firstAssistant: string;
    secondAssistant: string;
    delegate: string;
    homeRepresentative: string;
    awayRepresentative: string;
    homeYellow: string;
    awayYellow: string;
    homeRed: string;
    awayRed: string;
    remarks: string;
    comentReferee: string;
    result: string;
}

export class Record {
    constructor() {
        this.date = '';
        this.place = '';
        this.league = '';
        this.round = '';
        this.homeTeam = '';
        this.awayTeam = '';
        this.referee = '';
        this.firstAssistant = '';
        this.secondAssistant = '';
        this.delegate = '';
        this.homeRepresentative = '';
        this.awayRepresentative = '';
        this.homeYellow = '';
        this.awayYellow = '';
        this.homeRed = '';
        this.awayRed = '';
        this.remarks = '';
        this.comentReferee = '';
        this.result = '';
    }
}
