import { TestBed } from "@angular/core/testing";
import { mockCharacterDTO, mockCharacterEntity } from "../../../../../test/mocks/characters/characters.mock";
import { CharacterEntity } from "../../../../domain/entities/characters/character-entity";
import { CharacterDtoToEntityMapperService } from "./mapper-character-dto-to-entity";
import { CharacterDTO } from "../../../../data/datasources/characters/remote/character-dto";

describe(`CharacterDboToEntityMapperService`, () => {
  let mapperService: CharacterDtoToEntityMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterDtoToEntityMapperService
      ],
    });
    mapperService = TestBed.inject(CharacterDtoToEntityMapperService);
  });

  it(`GIVEN a characterEntity THEN map to a characterDBO`, () => {
    let response: CharacterDTO = mapperService.mapFrom(mockCharacterEntity);
    expect(typeof response).toBe("object");
    expect(response).toEqual({
      id: mockCharacterEntity.id,
      name: mockCharacterEntity.name,
      status: mockCharacterEntity.status,
      species: mockCharacterEntity.species,
      type: '',
      gender: mockCharacterEntity.gender,
      origin: mockCharacterEntity.location,
      location: mockCharacterEntity.location,
      image: mockCharacterEntity.image,
      episode: mockCharacterEntity.episode,
      url: '',
      created: ''
    });

    const expectedTypes = {
      id: "number",
      name: "string",
      status: "string",
      species: "string",
      type: "string",
      gender: "string",
      origin: "object",
      location: "object",
      image: "string",
      episode: "object",
      url: "string",
      created: "string",
    }

    for(const type in expectedTypes){
      expect(typeof (response as any)[type]).toBe((expectedTypes as any)[type]);
    }

  });

  it(`GIVEN a characterDBO THEN map to a characterEntity`, () => {
    let response: CharacterEntity = mapperService.mapTo(mockCharacterDTO);
    expect(typeof response).toBe("object");
    expect(response).toEqual({
      id: mockCharacterDTO.id,
      name: mockCharacterDTO.name,
      status: mockCharacterDTO.status,
      species: mockCharacterDTO.species,
      gender: mockCharacterDTO.gender,
      location: mockCharacterDTO.location,
      image: mockCharacterDTO.image,
      episode: mockCharacterDTO.episode,
      page: 0,
      isFavorite: false
    });
    
    const expectedTypes = {
      id: "number",
      name: "string",
      status: "string",
      species: "string",
      gender: "string",
      location: "object",
      image: "string",
      episode: "object",
      page: "number",
      isFavorite: "boolean",
    }
    
    for(const type in expectedTypes){
      expect(typeof (response as any)[type]).toBe((expectedTypes as any)[type]);
    }

  });
})