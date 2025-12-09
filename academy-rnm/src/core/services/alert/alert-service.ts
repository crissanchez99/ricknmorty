import { inject, Injectable } from "@angular/core";
import { AlertButton, AlertController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertService{
  private alertCtrl: AlertController = inject(AlertController);

  public async showAlert(header: string, buttons: AlertButton, message?: string, subHeader?: string): Promise<void>{
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }
}