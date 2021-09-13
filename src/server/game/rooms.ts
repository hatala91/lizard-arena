import "@geckos.io/phaser-on-nodejs";
import { Client, Room } from "colyseus";
import Hero from "./hero";
import { HeroSchema } from "./schemas";

export default class HeroRoom extends Room<HeroSchema> {
  onCreate(): void {
    this.setState(new HeroSchema());

    const game = new Phaser.Game({
      type: Phaser.HEADLESS,
      width: 800,
      height: 600,
      autoFocus: false,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    });

    game.scene.add("hero", Hero);
    game.scene.start("hero");
  }

  onJoin(client: Client): void {
    this.state.addPlayer(client.sessionId);
  }

  onLeave(client: Client): void {
    if (this.state.hasPlayer(client.sessionId)) {
      this.state.deletePlayer(client.sessionId);
    }
  }
}
