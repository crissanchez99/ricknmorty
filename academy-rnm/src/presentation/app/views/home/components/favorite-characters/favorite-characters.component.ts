import { CharacterEntity } from '../../../../../../domain/entities/characters/character-entity';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { TranslatePipe } from '@ngx-translate/core';
import { ImagesRutes } from '../../../../../../core/enums/images-rutes';
import { ModalService } from '../../../../../../core/services/modal/modal';

@Component({
  selector: 'app-modal-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrls: ['./favorite-characters.component.scss'],
  imports: [IonicModule, TranslatePipe],
})
export class FavoriteCharactersComponent  implements OnInit {
  @Input() item: CharacterEntity[] = [];
  private modalService: ModalService = inject(ModalService);
  protected statusAlive: string = ImagesRutes.statusAlive;
  protected statusDead: string = ImagesRutes.statusDead;
  protected statusUnknown: string = ImagesRutes.statusUnknown;

  constructor() {
  }

  ngOnInit() {}

  closeModal(){
    this.modalService.closeModal(this.item);
  }
}

