import { MapperService } from "../../../../core/core-interface/mapper/mapper-service";
import { CharacterDBO } from "../../../../data/datasources/characters/local/character-dbo";
import { CharacterEntity } from "../../../../domain/entities/characters/character-entity";

export class CharacterDboToEntityMapperService extends MapperService<CharacterDBO, CharacterEntity>{
  public override mapFrom(character: CharacterEntity): CharacterDBO {
    return{
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      location: character.location,
      image: character.image,
      episode: character.episode,
      page: character.page,
      isFavorite: character.isFavorite
    } satisfies CharacterDBO;
  }
  public mapTo(character: CharacterDBO): CharacterEntity{
    return{
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      location: character.location,
      image: character.image,
      episode: character.episode,
      page: character.page,
      isFavorite: character.isFavorite
    } satisfies CharacterEntity;
  }
}