import { Component, inject } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.use('es')}
}
