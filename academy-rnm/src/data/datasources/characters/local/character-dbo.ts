export interface CharacterDBO{
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: LocationDBO;
  image: string;
  episode: string[];
  page: number;
  isFavorite: boolean;
}

export interface LocationDBO{
  name: string;
  url: string;
}
