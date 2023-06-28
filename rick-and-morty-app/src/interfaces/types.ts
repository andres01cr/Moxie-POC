export interface Character {
    id: string;
    name: string;
    image: string;
    status: string
  }
  
export interface Episode {
    id: string;
    name: string;
    characters: Character[];
  }
  
export interface CharacterDetailsProps {
    characterId?: string;
}

export interface Error {
    loading?: string;
    message?: string;
}

export interface EpisodeDetailsProps {
    episodeId?: string;
  }

  export interface CharacterListProps {
    characterId?: string;
  }  