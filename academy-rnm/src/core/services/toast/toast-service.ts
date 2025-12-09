import { inject, Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService{
  private toastController: ToastController = inject(ToastController);

  public async showToast(message: string, duration: number = 3000, cssClass: string = ''){
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      cssClass: cssClass
    })
    await toast.present();
  }
}
