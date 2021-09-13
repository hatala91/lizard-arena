import Phaser from "phaser";
import { HeroesState } from "../../../common/types/states";
import Server from "../services/server";

export default class Hero extends Phaser.Scene {
  private server!: Server;
  private playersMessage: Phaser.GameObjects.Text;

  init(): void {
    this.server = new Server();
  }

  async create(): Promise<void> {
    await this.server.join();

    this.server.onceStateChanged((state: HeroesState) => {
      const playerCount = state.players.length;

      this.playersMessage = this.add
        .text(400, 300, `Players connected: ${playerCount}`)
        .setOrigin(0.5);
    }, this);

    this.server.onStateChanged((state: HeroesState) => {
      const playerCount = state.players.length;
      this.playersMessage.setText(`Players connected: ${playerCount}`);
    });
  }
}
