export interface CharactersDTO{
  info: InfoDTO;
  results: CharacterDTO[];
}

export interface CharacterDTO{
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationDTO;
  location: LocationDTO;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface LocationDTO{
  name: string;
  url: string;
}

export interface InfoDTO{
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

