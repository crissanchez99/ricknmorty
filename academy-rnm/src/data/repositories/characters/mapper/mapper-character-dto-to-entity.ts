import { CharacterDTO } from './../../../datasources/characters/remote/character-dto';
import { MapperService } from "../../../../../src/core/core-interface/mapper/mapper-service";
import { CharacterEntity } from "../../../../../src/domain/entities/characters/character-entity";

export class CharacterDtoToEntityMapperService extends MapperService<CharacterDTO, CharacterEntity>{
  public override mapFrom(entity: CharacterEntity): CharacterDTO {
    return{
      id: 0,
      name: entity.name,
      status: entity.status,
      species: entity.species,
      type: '',
      gender: entity.gender,
      origin: entity.location,
      location: entity.location,
      image: entity.image,
      episode: entity.episode,
      url: '',
      created: '',
    }
  }

  public mapTo(character: CharacterDTO, page?: number): CharacterEntity{
    return{
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      location: character.location,
      image: character.image,
      episode: character.episode,
      page: page ?? 0,
      isFavorite: false
      } satisfies CharacterEntity;
  }
}

