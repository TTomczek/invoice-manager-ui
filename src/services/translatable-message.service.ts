import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class TranslatableMessageService {
    private messageService = inject(MessageService);
    private translateService = inject(TranslateService);

    public add(message: Message) {
        if (message.key !== undefined && message.key !== '') {
            message.key = this.translateService.instant(message.key);
        }
        if (message.summary !== undefined && message.summary !== '') {
            message.summary = this.translateService.instant(message.summary);
        }
        if (message.detail !== undefined && message.detail !== '') {
            message.detail = this.translateService.instant(message.detail);
        }
        this.messageService.add(message);
    }

    public clear(key?: string) {
        this.messageService.clear(key);
    }

    public addAll(messages: Message[]) {
        messages.forEach((message) => this.add(message));
    }
}
