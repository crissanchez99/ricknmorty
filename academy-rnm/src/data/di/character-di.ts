import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRepository } from 'src/domain/repositories/characters/characters-repository';
import { CharacterImpRepository } from '../repositories/characters/characters-imp-repository';
import { CharacterLocalDataSource } from '../datasources/characters/source/character-local-data-source';
import { CharacterImpLocalDataSource } from '../datasources/characters/local/character-imp-local-data-source';
import { CharacterRemoteDataSource } from '../datasources/characters/source/character-remote-data-source';
import { CharacterImpRemoteDataSource } from '../datasources/characters/remote/character-imp-remote-data-source';
import { GetCharactersUseCase } from 'src/domain/usecases/characters/get-characters-use-case';
import { UpdateCharacterUseCase } from 'src/domain/usecases/characters/update-character-use-case';
import { AddCharacterToFavoritesUseCase } from 'src/domain/usecases/characters/add-character-to-favorites-use-case';
import { DeleteCharacterFromFavoritesUseCase } from 'src/domain/usecases/characters/delete-character-from-favorites-use-case';
import { GetFavoriteCharactersUseCase } from 'src/domain/usecases/characters/get-favorite-characters-use-case';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    GetCharactersUseCase,
    UpdateCharacterUseCase,
    AddCharacterToFavoritesUseCase,
    DeleteCharacterFromFavoritesUseCase,
    GetFavoriteCharactersUseCase,
    {provide: CharacterRepository, useClass: CharacterImpRepository},
    {provide: CharacterLocalDataSource, useClass: CharacterImpLocalDataSource},
    {provide: CharacterRemoteDataSource, useClass: CharacterImpRemoteDataSource},
  ]
})
export class CharacterDI { }
