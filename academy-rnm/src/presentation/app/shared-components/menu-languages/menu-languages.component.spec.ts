import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MenuComponent } from './menu-languages.component';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicModule } from '@ionic/angular';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach((async() => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [ IonicModule.forRoot(), TranslatePipe,],
      providers:[
        provideHttpClient( withFetch()),
        provideTranslateService({
          loader: provideTranslateHttpLoader({
          prefix: '/assets/i18n/',
          suffix: '.json',
        }),
          fallbackLang: 'es',
          lang: 'es'
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
