import {logger, Plugin} from "../../parser-server/src";
import { loadLibrary } from "./loadLibrary";
import { setup } from "./setup";

export const config: Plugin = {
  name: 'TMDB',
  version: '0.1.0',
  allowedMediaTypes: ['film', 'serial', 'anime'],
  loadLibrary: loadLibrary,
  setup: setup,
  loadMediaDetails: async () => {}
}