import { Schema, type } from "@colyseus/schema";
import { HeroesState, PlayerState } from "../../common/types/states";

export class PlayerSchema extends Schema implements PlayerState {
  @type("string") id: string;
}

export class HeroSchema extends Schema implements HeroesState {
  @type([PlayerSchema]) players: PlayerState[];

  constructor() {
    super();

    this.players = [];
  }

  /**
   * Adds a new player object by ID.
   *
   * @param id Identification of the player
   */
  addPlayer(id: string): void {
    this.players.push(new PlayerSchema({ id }));
  }

  /**
   * Checks if a player identified by an ID exists.
   *
   * @param id Identification of the player to be found
   * @returns Boolean indicating presence of player
   */
  hasPlayer(id: string): boolean {
    return this.players.some((player) => player.id === id);
  }

  /**
   * Removes a player given an ID.
   *
   * @param id Identifiaction of the player to be removed.
   */
  deletePlayer(id: string): void {
    this.players = this.players.filter((player) => player.id !== id);
  }
}
