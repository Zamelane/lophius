import { mediaManager } from "../mediaManager"

export class VideoManager {
  private media: mediaManager

  constructor(id: number) {
    this.media = new mediaManager(id)
  }
}