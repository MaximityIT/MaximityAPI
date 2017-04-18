import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";

@Injectable()
export class SMSService {

    constructor(private http: Http, private errorService: ErrorService) {
    }

    sendSMS() {
        const params = {
            'src': '1111111111',
            'dst' : '85366387334',
            'text' : "Hello, how are you?"
        }
        const body = JSON.stringify(params);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/smsapi' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    
}