import { Injectable } from '@angular/core';

import { AlertMessage } from './alert-message';

@Injectable()
export class AlertMessageService {
    public messages: AlertMessage[];
    
    constructor() {
        this.messages = [];
    }

    public addMessage(newType: string, newMessage: string): void {
        let tempMessage = new AlertMessage();
        tempMessage.type = newType;
        tempMessage.message = newMessage;

        this.messages.push(tempMessage);
    }
}
