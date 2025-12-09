import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEntity } from 'src/domain/entities/languages/language-entity';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-languages.component.html',
  styleUrls: ['./menu-languages.component.scss'],
  standalone: false,
})
export class MenuComponent  implements OnInit {
  private translate: TranslateService = inject(TranslateService);
  protected languages: LanguageEntity[] = []

  constructor() { }

  ngOnInit() {
    this.setLanguages();
  }

  protected setLanguages(){
    this.languages = [
      {
        language: 'es',
        img: 'assets/images/languages/spain-flag.svg',
        translation: 'languages.es'
      },
      {
        language: 'en',
        img: 'assets/images/languages/uk-flag.svg',
        translation: 'languages.en'
      }
    ]
  }

  protected changeLanguage(language: string){
    this.translate.use(language);
  }
}
