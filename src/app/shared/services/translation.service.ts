// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en'); // Define o idioma padrão
    this.translateService.use('en'); // Define o idioma inicial
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  getTranslation(key: string): string {
    return this.translateService.instant(key);
  }
}
