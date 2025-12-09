import { Injectable, inject } from '@angular/core';
import { CharacterLocalDataSource } from "../source/character-local-data-source";
import { LocalStorageService } from "../../../../core/services/local-storage/local-storage-service";
import { CharacterDBO } from './character-dbo';
import { KeysLocalStorage } from '../../../../core/enums/key-local-storage';

@Injectable({
  providedIn: 'root'
})
export class CharacterImpLocalDataSource extends CharacterLocalDataSource{
  private localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly keyCharacters: number = KeysLocalStorage.keyCharacters;
  private readonly keyFavotites: number = KeysLocalStorage.keyFavotites;
  private readonly keyPage: number = KeysLocalStorage.keyPage;

  async getCharacters(): Promise<CharacterDBO[] | null> {
    return await this.localStorage.getItems(String(this.keyCharacters));
  }

  async setCharacters(characters: CharacterDBO[]): Promise<void>{
    return await this.localStorage.setItems(String(this.keyCharacters), characters);
  }

  async getLastPage(): Promise<number | null>{
    return await this.localStorage.getItem(String(this.keyPage));
  }

  async setLastPage(lastPage: number): Promise<void>{
    return await this.localStorage.setItem(String(this.keyPage), lastPage);
  }

  async getFavoriteCharacters(): Promise<CharacterDBO[] | null>{
    return await this.localStorage.getItems(String(this.keyFavotites));
  }

  async setFavoriteCharacters(favoriteCharacter: CharacterDBO[]): Promise<void>{
    return await this.localStorage.setItems(String(this.keyFavotites), favoriteCharacter);
  }

}

