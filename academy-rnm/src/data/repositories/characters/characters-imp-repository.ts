import { inject, Injectable } from "@angular/core";
import { combineLatest, firstValueFrom, from, map, Observable } from 'rxjs';
import { CharacterImpLocalDataSource } from "../../../data/datasources/characters/local/character-imp-local-data-source";
import { CharacterImpRemoteDataSource } from "../../../data/datasources/characters/remote/character-imp-remote-data-source";
import { CharacterLocalDataSource } from "../../../data/datasources/characters/source/character-local-data-source";
import { CharacterRemoteDataSource } from "../../../data/datasources/characters/source/character-remote-data-source";
import { CharacterRepository } from "../../../domain/repositories/characters/characters-repository";
import { CharacterEntity } from '../../../domain/entities/characters/character-entity';
import { CharacterDTO, CharactersDTO } from "../../../data/datasources/characters/remote/character-dto";
import { CharacterDBO } from "../../../data/datasources/characters/local/character-dbo";
import { CharacterDtoToEntityMapperService } from "./mapper/mapper-character-dto-to-entity";
import { CharacterDboToEntityMapperService } from "./mapper/mapper-character-dbo-to-entity";

@Injectable({
  providedIn: 'root'
})
export class CharacterImpRepository extends CharacterRepository{
  private remoteDataSource: CharacterRemoteDataSource = inject(CharacterImpRemoteDataSource);
  private localDataSource: CharacterLocalDataSource = inject(CharacterImpLocalDataSource);
  private mapperDtoToEntity: CharacterDtoToEntityMapperService = new CharacterDtoToEntityMapperService();
  private mapperDboToEntity: CharacterDboToEntityMapperService = new CharacterDboToEntityMapperService();

  public checkIfCharactersExists(charactersRemote: CharacterDTO[], charactersLocal: CharacterDBO[] | null, page: number): boolean{
    let exists: boolean = false;
    for (let i = 0; i < charactersRemote.length; i++) {
      exists = (charactersRemote[i].id === charactersLocal![i].id) ? true : false;
    }
    return exists;
  }

  public getCharacters(page: number): Observable<CharacterEntity[]>{
    const dbo: Observable<CharacterDBO[] | null> = from(this.getCharactersFromLocal(page));
    const dto: Observable<CharactersDTO> = this.remoteDataSource.getCharactersByPage(page);
    let charactersEntity: CharacterEntity[] = [];

    return combineLatest([dbo, dto]).pipe(map(([local, remote]: [CharacterDBO[] | null, CharactersDTO]): CharacterEntity[] => {

      if(local?.length ?? 0 > 0){
        const exists: boolean = this.checkIfCharactersExists(remote.results, local, page);
        charactersEntity = local!.map(this.mapperDboToEntity.mapTo);

        return exists ? charactersEntity : [];
      }else{
        let charactersDbo: CharacterDBO[] = this.mapFromDtoToDbo(remote, page);
        this.setCharactersLocal(charactersDbo?.filter(element => element.page === page) ?? []);
        charactersEntity = charactersDbo.map(this.mapperDboToEntity.mapTo);

        return charactersEntity?.filter(element => element.page === page) ?? [];
      }
    }))
  }

  private mapFromDtoToDbo(remote: CharactersDTO, page: number): CharacterDBO[] {
    let charactersDbo: CharacterDBO[] = [];

    remote.results.forEach((remote) => {
      const characterEntity: CharacterEntity = this.mapperDtoToEntity.mapTo(remote, page);
      charactersDbo.push(this.mapperDboToEntity.mapFrom(characterEntity));
    })

    return charactersDbo;
  }

  public async getCharactersFromLocal(page: number): Promise<CharacterDBO[] | null>{
    let data = await this.localDataSource.getCharacters();
    if(data instanceof Array){
      return data?.filter(element => element.page === page) ?? [];
    }
    return null;
  }

  public async setCharactersLocal(characters: CharacterEntity[]): Promise<void>{
    let allCharactersLocalDBO: CharacterDBO[] | null = await this.localDataSource.getCharacters() ?? [];

    if(allCharactersLocalDBO){
      characters.forEach((character: CharacterEntity) => allCharactersLocalDBO.push(this.mapperDboToEntity.mapFrom(character)));
      await this.localDataSource.setCharacters(allCharactersLocalDBO);
    }
  }

  public async updateCharacter(character: CharacterEntity): Promise<void>{
    const charactersDbo: CharacterDBO[] | null = await this.localDataSource.getCharacters();
    const charactersEntity: CharacterEntity[] | null = [];
    if(charactersDbo){
      charactersDbo.forEach(characterDbo => charactersEntity.push(this.mapperDboToEntity.mapTo(characterDbo)));
      charactersEntity.forEach(async char => {
         if(character.id === char.id){
          char.isFavorite = character.isFavorite;
          await this.updateCharactersLocal(charactersEntity);
        }
      })
    }
  }

  private async updateCharactersLocal(characters: CharacterEntity[]): Promise<void>{
    let charactersDbo: CharacterDBO[] = [];
    characters.forEach((character: CharacterEntity) => charactersDbo.push(this.mapperDboToEntity.mapFrom(character)));
    await this.localDataSource.setCharacters(charactersDbo);
  }

  async addCharacterToFavorites(favoriteCharacter: CharacterEntity): Promise<void>{
    const characterDbo: CharacterDBO = this.mapperDboToEntity.mapFrom(favoriteCharacter);
    let favoriteCharactersDbo: CharacterDBO[]| null = await this.localDataSource.getFavoriteCharacters();

    if(favoriteCharactersDbo){
      if(!this.checkIfCharacterIsFavorite(characterDbo, favoriteCharactersDbo)){
        favoriteCharactersDbo.push(characterDbo);
        await this.localDataSource.setFavoriteCharacters(favoriteCharactersDbo);
      }
    }else{
      favoriteCharactersDbo = [];
      favoriteCharactersDbo.push(characterDbo);
      await this.localDataSource.setFavoriteCharacters(favoriteCharactersDbo);
    }
  }

  private checkIfCharacterIsFavorite(characterDbo: CharacterDBO, charactersDbo: CharacterDBO[]): boolean{
    return !!charactersDbo.find(dbo => dbo.id === characterDbo.id);
  }

  async deleteCharacterFromFavorites(character: CharacterEntity): Promise<void>{
    let favoriteCharactersDbo: CharacterDBO[]| null = await this.localDataSource.getFavoriteCharacters();
    let index: number = -1;
    if(favoriteCharactersDbo){
      favoriteCharactersDbo.forEach(favorite => {
        if(favorite.id === character.id){
          index = favoriteCharactersDbo.indexOf(favorite);
        }
      })
      favoriteCharactersDbo.splice(index, 1);
      this.localDataSource.setFavoriteCharacters(favoriteCharactersDbo);
    }
  }

  getFavoriteCharacters(): Observable<CharacterEntity[]>{
    return from(this.localDataSource.getFavoriteCharacters()).pipe(map(dbo => {
      let charactersEntity: CharacterEntity[] = [];
      if(dbo && dbo instanceof Array) {
        dbo.forEach((value: CharacterDBO) => charactersEntity.push(this.mapperDboToEntity.mapTo(value)));
      }
      return charactersEntity;
    }))
  }

  public async getLastPage(): Promise<number>{
    const dto: Observable<CharactersDTO> = this.remoteDataSource.getCharactersByPage(1);
    let lastPageApi: number | null = await this.localDataSource.getLastPage();

    if(!lastPageApi){
      lastPageApi =  await firstValueFrom(dto.pipe(map((remote: CharactersDTO) => {return remote.info.pages})));
      this.localDataSource.setLastPage(lastPageApi);
    }
    return typeof lastPageApi === "number" ? lastPageApi : -1;
  }
}
