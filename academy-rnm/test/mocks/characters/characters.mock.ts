import { CharacterDBO } from "src/data/datasources/characters/local/character-dbo";
import { CharacterDTO, CharactersDTO } from "src/data/datasources/characters/remote/character-dto";
import { CharacterEntity } from "src/domain/entities/characters/character-entity";

export const mockDataCharactersDTO: CharactersDTO = {
  info: {
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: null
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "image-url",
      episode: [],
      url: "",
      created: ""
    }
  ]
}

export const mockCharacterDTO: CharacterDTO = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "image-url",
  episode: [],
  url: "",
  created: ""
}

export const mockCharactersDTO: CharacterDTO[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "image-url",
    episode: [],
    url: "",
    created: ""
  }
]

export const mockCharactersDBO: CharacterDBO[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    location: { name: "Earth", url: "" },
    image: "image-url",
    episode: [],
    page: 0,
    isFavorite: false
  } 
]

export const mockCharacterDBO: CharacterDBO = 
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    location: { name: "Earth", url: "" },
    image: "image-url",
    episode: [],
    page: 0,
    isFavorite: false
  } 


export const mockCharacterEntity: CharacterEntity = 
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    location: { name: "Earth", url: "" },
    image: "image-url",
    episode: [],
    page: 0,
    isFavorite: false
  } 


export const mockCharactersEntity: CharacterEntity[] = [ 
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    location: { name: "Earth", url: "" },
    image: "image-url",
    episode: [],
    page: 0,
    isFavorite: false
  } 
]