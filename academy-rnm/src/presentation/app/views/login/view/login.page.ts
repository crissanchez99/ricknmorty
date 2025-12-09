import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesRutes } from '../../../../../core/enums/images-rutes';
import { LoginPageViewModel } from '../viewmodel/login-page.viewmodel';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/core/services/alert/alert-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  private viewModel: LoginPageViewModel = inject(LoginPageViewModel);
  private alertService: AlertService = inject(AlertService);
  private translateService: TranslateService = inject(TranslateService);
  private navigation: NavController = inject(NavController);

  protected logo: string = ImagesRutes.logoLogin;
  private formBuilder: FormBuilder = inject(FormBuilder);
  
  formLogin: FormGroup = this.formBuilder.group({
    userName: [``, [Validators.required]],
    password: [``, Validators.required]
  });

  get userName(): string {return this.formLogin.get('userName')?.value;}
  get password(): string {return this.formLogin.get('password')?.value;}

  constructor() { }

  ngOnInit() {
  }


  async onSubmit(): Promise<void>{
    if(this.formLogin.valid){
      const userExists = await this.viewModel.userLogin(this.userName, this.password);
      //console.log(`respuesta: `, userExists);
      if(userExists.valueOf()){
        this.navigation.navigateRoot('tabs/home');
      }else{
        this.showAlert();
      }
    }else{
      this.showAlert();
    }
  }

  private async showAlert(): Promise<void>{
    await this.alertService.showAlert(
      this.translateService.instant('login_page_alert.alert.header'),
      {
        text: this.translateService.instant('login_page_alert.alert.text_button')
      },
      this.translateService.instant('login_page_alert.alert.message')        
    )
  }



}
