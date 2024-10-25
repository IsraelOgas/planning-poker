import { Status } from "./status";

export interface Game {
  id: string;
  name: string;
  average: number;
  gameStatus: Status;
  gameType?: GameType | GameType.Fibonacci;
  isAllowMembersToManageSession?: boolean;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewGame {
  name: string;
  gameType: string;
  isAllowMembersToManageSession?: boolean;
  createdBy: string;
  createdAt: Date;
}

export enum GameType {
  Fibonacci = "Fibonacci",
  ShortFibonacci = "ShortFibonacci",
  TShirt = "TShirt",
}
