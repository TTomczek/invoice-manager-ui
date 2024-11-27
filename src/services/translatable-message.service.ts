import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TranslatableMessageService {
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  public add(message: Message) {
    const translatedMessage: Message = {
      severity: message.severity,
      closable: message.closable,
      key: message.key,
      data: message.data,
      icon: message.icon,
      closeIcon: message.closeIcon,
      life: message.life,
      sticky: message.sticky,
      contentStyleClass: message.contentStyleClass,
      styleClass: message.styleClass,
      id: message.id,
      summary: this.translateService.instant(message.summary ?? ''),
      detail: this.translateService.instant(message.detail ?? '')
    }
    this.messageService.add(translatedMessage);
  }

  public clear(key?: string) {
    this.messageService.clear(key);
  }

  public addAll(messages: Message[]) {
    messages.forEach(message => this.add(message));
  }
}
