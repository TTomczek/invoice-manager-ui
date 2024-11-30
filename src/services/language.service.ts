import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate: TranslateService = inject(TranslateService);

  langChange = toSignal(this.translate.onLangChange);
}
