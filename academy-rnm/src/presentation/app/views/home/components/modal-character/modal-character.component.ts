import { Component, inject, Input, OnInit, Output } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { TranslatePipe } from '@ngx-translate/core';
import { ModalService } from '../../../../../../core/services/modal/modal';
import { CharacterEntity } from '../../../../../../domain/entities/characters/character-entity';
import { ImagesRutes } from '../../../../../../core/enums/images-rutes';

@Component({
  selector: 'app-modal-character',
  templateUrl: './modal-character.component.html',
  styleUrls: ['./modal-character.component.scss'],
  imports:[
    IonicModule,
    TranslatePipe
  ]
})
export class ModalCharacterComponent implements OnInit {
  @Input() item!: CharacterEntity;
  @Output() favoritePress!: (char: CharacterEntity) => void;
  protected isFavorite: boolean = false;
  protected episode: string = '';

  private modalService: ModalService = inject(ModalService);

    protected statusAlive: string = ImagesRutes.iconStatusAlive;
    protected statusDead: string = ImagesRutes.iconStatusDead;
    protected statusUnknown: string = ImagesRutes.iconStatusUnknown;

  constructor() {
  }

  ngOnInit(){
    this.isFavorite = this.item.isFavorite;
    this.showFirstEpisodeCharacter();
  }

  showFirstEpisodeCharacter(){
    const episode = this.item.episode[0].split('');
    const firstDigit: number = parseInt(episode[episode.length-2]);
    const secondDigit: number = parseInt(episode[episode.length-1]);

    if(Number.isNaN(firstDigit)){
      this.episode = secondDigit.toString();
    }else{
      this.episode = `${firstDigit}${secondDigit}`;
    }
  }

  async closeModal(){
    //this.item.isFavorite = this.isFavorite;
    await this.modalService.closeModal(this.item);

  }

  async changeCharacterFavorite(){
    !this.isFavorite ? this.isFavorite = true: this.isFavorite = false;
    this.item.isFavorite = this.isFavorite;
    this.favoritePress(this.item);
  }
}
