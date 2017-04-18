import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SMSComponent } from "./sms.component";
import { SMSService } from "./sms.service";

@NgModule({
    declarations: [
        SMSComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [SMSService]
})
export class SMSModule {

}