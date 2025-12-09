import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RickNMortyService } from './rick-n-morty-api';
import { provideHttpClient } from '@angular/common/http';
import { CharacterDTO, CharactersDTO } from 'src/data/datasources/characters/remote/character-dto';
import { mockDataCharactersDTO } from '../../../../test/mocks/characters/characters.mock';

describe('RickNMortyService', () => {

  let service: RickNMortyService;
  let httpMock: HttpTestingController;

  const page = 8;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        RickNMortyService,
      ],
    });

    service = TestBed.inject(RickNMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('WHEN request characters THEN return characters', fakeAsync(() => {
    let response!: CharactersDTO;

    service.getCharactersByPage(page).subscribe(res => {
      response = res;
    });

    const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/?page=${page}`);
    req.flush(mockDataCharactersDTO);

    tick();
    
    expect(response.results.length).toBe(1);
  }));

  it(`WHEN request characters THEN return method get`, fakeAsync(() => {
    service.getCharactersByPage(page).subscribe();
    const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/?page=${page}`);
    expect(req.request.method).toBe('GET');
    tick();
  }));

  it(`WHEN request characters THEN return a CharctersDTO with correct structure`, fakeAsync(() => {
    let response!: CharactersDTO;
    
    service.getCharactersByPage(page).subscribe(res => {
      response = res;
    });

    const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/?page=${page}`);
    req.flush(mockDataCharactersDTO);
    tick();

    expect(response.info.count).toBe(826);
    expect(response.info.pages).toBe(42);
    expect(response.info.next).toBeTruthy();
    expect(Array.isArray(response.results)).toBeTruthy();

    const character: CharacterDTO = response.results[0];

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
      expect(typeof (character as any)[type]).toBe((expectedTypes as any)[type]);
    }
  }));

});
