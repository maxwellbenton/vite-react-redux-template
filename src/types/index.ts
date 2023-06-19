export type State = {
  app: AppData;
}

export type User = {
  name: string,
  location: {
    coordinates: {
      latitude: number | null,
      longitude: number | null
    }
  },
  settings: {
    dateFormat: string,
    defaultIsOutdoor: boolean | null,
    defaultWateringFrequency: number | null,
    defaultSunNeeds: number | null
  }
}

export type Garden = {
  id: string;
  name: string;
  plantIds: Array<string>;
  description: string;
  imageData: string;
}

export type Guild = {
  id: string;
  name: string;
  plantIds: Array<string>;
  description: string;
  imageData: string;
}

export type Group = {
  id: string;
  name: string;
  plantIds: Array<string>;
  description: string;
  imageData: string;
}

export type AppData = {
  user: User;
  plants: Array<Plant>;
  selectedPlantId: string | null;
  eventsLastCreatedAt: number;
  gardens: Array<Garden>;
  guilds: Array<Guild>;
  groups: Array<Group>;
  events: Array<PlantEvent>;
}



export type Plant = {
  id: string;
  name: string;
  description: string;
  species: string,
  wateringFrequency: 0 | 25 | 50 | 75 | 100;
  sunNeeds: 0 | 50 | 100;
  imageData: string;
  age: 0 | 33.4 | 66.8 | 100;
  isAlive: boolean;
  isOutdoor: boolean;
  lastWatered: number;
  lastFertilized: number;
  planted: number;
  diseases: Array<string>;
  resistsDiseases: Array<string>;
  pests: Array<string>;
  detersPests: Array<string>;
  isNative: boolean;
  isKeystone: boolean;
  isImportant: boolean;
  isPerennial: boolean;
  isEdible: boolean;
  isMedicinal: boolean;
  zone: string;
  inGuild: boolean;
  guildId: string;
  isNitrogenFixer: boolean; 
  isAggressive: boolean;
  isInvasive: boolean;
  spreads: boolean;
  growsTall: boolean;
  isToxic: boolean;
  isPartlyToxic: boolean;
  isDangerous: boolean;
}

export type PlantEvent = {
  id: string;
  type: 'water' | 'fertilize' | 'repot' | 'rotate' | 'prune' | 'pesticide';
  plantId: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
}