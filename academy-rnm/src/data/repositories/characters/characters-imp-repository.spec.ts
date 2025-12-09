import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CharacterImpRepository } from "./characters-imp-repository"
import { CharacterImpRemoteDataSource } from "../../../data/datasources/characters/remote/character-imp-remote-data-source";
import { of } from "rxjs";
import { mockCharactersDBO, mockCharactersEntity, mockDataCharactersDTO } from "../../../../test/mocks/characters/characters.mock";
import { CharacterImpLocalDataSource } from "../../../data/datasources/characters/local/character-imp-local-data-source";
import { CharacterDBO } from "src/data/datasources/characters/local/character-dbo";
import { CharacterEntity } from "src/domain/entities/characters/character-entity";

describe(`CharacterImpRepository`, () => {
  let impRepository: CharacterImpRepository;
  let remoteDataSource: jest.Mocked<CharacterImpRemoteDataSource>;

  const mockPage = 1;
  const mockRemoteDataSorce = {
    getCharactersByPage: jest.fn()
  }

  const mockLocalDataSorce = {
    getCharacters: jest.fn(),
    setCharacters: jest.fn()
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterImpRepository,
        {provide: CharacterImpRemoteDataSource, useValue: mockRemoteDataSorce},
        {provide: CharacterImpLocalDataSource, useValue: mockLocalDataSorce}
      ],
    });
    impRepository = TestBed.inject(CharacterImpRepository);
    remoteDataSource = TestBed.inject(CharacterImpRemoteDataSource) as jest.Mocked<CharacterImpRemoteDataSource>;
  });

    it(`WHEN local has data and exists in remote THEN returns characters mapped to enitity.`, fakeAsync(() => {
      let response: CharacterEntity[] = [];

      remoteDataSource.getCharactersByPage.mockReturnValue(of(mockDataCharactersDTO));
      jest.spyOn(impRepository as any, "getCharactersFromLocal").mockResolvedValue(mockCharactersDBO);
      jest.spyOn(impRepository as any, "checkIfCharactersExists").mockResolvedValue(false);
      jest.spyOn(impRepository["mapperDboToEntity"], "mapTo").mockImplementation((dbo: CharacterDBO) => dbo as CharacterEntity);

      impRepository.getCharacters(mockPage).subscribe(result => {
        response = result
      })

      tick();

      expect(response.length).toEqual(mockCharactersDBO.length);
    }));

    it(`WHEN local doesn't have data THEN sets the characters in local and returns characters mapped to entity`, fakeAsync(() => {
      let response: CharacterEntity[] = [];

      remoteDataSource.getCharactersByPage.mockReturnValue(of(mockDataCharactersDTO));
      jest.spyOn(impRepository as any, "getCharactersFromLocal").mockResolvedValue(mockCharactersDBO);
      jest.spyOn(impRepository as any, "checkIfCharactersExists").mockResolvedValue(false);
      jest.spyOn(impRepository["mapperDboToEntity"], "mapTo").mockImplementation((dbo: CharacterDBO) => dbo as CharacterEntity);
      jest.spyOn(impRepository as any, "mapFromDtoToDbo").mockReturnValue(mockCharactersDBO);
      const mockSetLocal = jest.spyOn(impRepository as any, "setCharactersLocal");
      jest.spyOn(impRepository["localDataSource"], "setCharacters").mockReturnValue(Promise.resolve());

      impRepository.getCharacters(mockPage).subscribe(result => {
        response = result;
      });

      tick();
      impRepository.setCharactersLocal(mockCharactersEntity);
      expect(mockSetLocal).toHaveBeenCalledWith(mockCharactersDBO)
      expect(response.length).toEqual(mockDataCharactersDTO.results.length);

    }));

})