import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { HomePageViewModel } from '../viewmodel/home-page.viewmodel';
import { ModalService } from '../../../../../../src/core/services/modal/modal';
import { ModalCharacterComponent } from '../../../../../../src/presentation/app/views/home/components/modal-character/modal-character.component';
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import { CharacterEntity } from '../../../../../../src/domain/entities/characters/character-entity';
import { ToastService } from '../../../../../../src/core/services/toast/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { ImagesRutes } from '../../../../../../src/core/enums/images-rutes';
import { AnimationConfigWithData } from 'lottie-web';
import { FavoriteCharactersComponent } from '../../../../../../src/presentation/app/views/home/components/favorite-characters/favorite-characters.component';
import { Animations } from '../../../../../../src/core/enums/animations-rutes';
import { HomeViewState } from '../viewmodel/home-state';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  private viewModel: HomePageViewModel = inject(HomePageViewModel);
  private modalService: ModalService = inject(ModalService);
  private toastService: ToastService = inject(ToastService);
  private translateService: TranslateService = inject(TranslateService);
  private currentPage: number = 0;
  private lastPage: number = 0;

  public viewState!: HomeViewState;
  protected readonly searchSignal: WritableSignal<string> = signal<string>('');
  protected readonly isFilterSignal: WritableSignal<boolean> = signal<boolean>(false);

  protected settingsIcon: string = ImagesRutes.settingsIcon;
  protected imageRickAndMorty: string = ImagesRutes.imageRickAndMorty;
  protected lenIcon: string = ImagesRutes.lenIcon;
  protected statusAlive: string = ImagesRutes.statusAlive;
  protected statusDead: string = ImagesRutes.statusDead;
  protected statusUnknown: string = ImagesRutes.statusUnknown;
  protected iconStatusAlive: string = ImagesRutes.iconStatusAlive;
  protected iconStatusDead: string = ImagesRutes.iconStatusDead;
  protected iconStatusUnknown: string = ImagesRutes.iconStatusUnknown;

  private animations: Animations = inject(Animations);
  protected notFound: Partial<AnimationConfigWithData<"svg">> = this.animations.options;

  get charactersResultSignal(): Signal<CharacterEntity[]> {
    return computed(() => {
      if(this.searchSignal() === 'None'){
        return this.viewState.characters();
      }else if(this.searchSignal() === 'Alive' || this.searchSignal() === 'Dead' || this.searchSignal() === 'unknown'){
        return this.viewState.characters().filter((character: CharacterEntity) => character.status.includes(this.searchSignal()));
      }else{
        return this.viewState.characters().filter((character: CharacterEntity) => character.name.toLowerCase().includes(this.searchSignal()));
      }
    });
  }

  constructor() {
    this.currentPage = 1;
    this.getCharacters(this.currentPage);
    this.viewModel.getFavoriteCharacters();
    this.viewState = this.viewModel.viewState;
  }

  ngOnInit() {
  }

  private getCharacters(page: number): void{
    this.viewModel.getCharacters(page);
  }

  async loadMoreCharacters(event: InfiniteScrollCustomEvent): Promise<void> {
    this.lastPage = await this.viewModel.getLastPage();
    await event.target.complete();

    if(!this.viewState.isFiltering()){
      if(this.currentPage < this.lastPage){
        this.currentPage++;
        this.getCharacters(this.currentPage);
        await event.target.complete();
      }else{
        event.target.complete();
        event.target.disabled = true;
      }
    }
  }

  protected async showCharacter(character: CharacterEntity): Promise<void>{
    const modal = await this.modalService.openModal(ModalCharacterComponent, character, 'modal-character', async (item)  => {
      this.saveCharacterFavorite(item);
        this.toastService.showToast(this.translateService.instant('message_toast_update_character'),  1000, 'toast_update_character');
    });
    await modal.present();
  }

  private async saveCharacterFavorite(character: CharacterEntity): Promise<void>{
    await this.viewModel.updateCharacter(character);
    await this.viewModel.addOrDeleteCharacterToFavorites(character);
    this.viewModel.getFavoriteCharacters();
  }

  protected async modalFavorites(): Promise<void>{
    const modal: HTMLIonModalElement = await this.modalService.openModal(FavoriteCharactersComponent, this.viewState.favoriteCharacters());
    await modal.present();
  }

  searchCharacterByName(event: Event): void{
    this.isFilterSignal.set(true);
    const target = event.target as HTMLIonSearchbarElement;

    this.searchSignal.set(target.value?.toLowerCase() || '');
    if(!target.value){
      this.isFilterSignal.set(false);
    }
  }

  filterByStatus(status: string): void{
    this.isFilterSignal.set(true);
    this.searchSignal.set(status);
    if(status === 'None'){
      this.isFilterSignal.set(false);
    }
  }

}
