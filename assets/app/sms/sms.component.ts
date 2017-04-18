import { Component } from "@angular/core";

import { SMSService } from "./sms.service";

@Component({
    selector: 'app-sms',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button type="button" class="btn btn-danger" (click)="onSend()">Send</button>
        </div>
    `
})

export class SMSComponent {
    constructor(private smsService: SMSService) {}

    onSend() {
        this.smsService.sendSMS()
                .subscribe(
                    data => console.log(data)
                    //error => console.error(error)
                );
    }
}