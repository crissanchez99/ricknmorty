import {EventEmitter, inject, Injectable} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CharacterEntity } from "src/domain/entities/characters/character-entity";

@Injectable({
  providedIn: 'root'
})
export class ModalService{
  private modalCtrl: ModalController = inject(ModalController);

  async openModal<T>(component: any, item: T | T[], cssClass?: string, favoritePress?: (char: CharacterEntity) => void): Promise<HTMLIonModalElement>{

    return await this.modalCtrl.create({
      component: component,
      componentProps: {
        item,
        favoritePress
      },
      cssClass: cssClass,
      showBackdrop: true,
    });
  }

  async closeModal<T>(item?: T): Promise<void>{
    await this.modalCtrl.dismiss({
      item
    })
  }
}
