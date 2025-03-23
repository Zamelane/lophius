import { Plugin } from "../../src";
import { loadLibrary } from "./loadLibrary";
import { setup } from "./setup";

export const config: Plugin = {
  name: 'TMDB',
  version: '0.1.0',
  allowedMediaTypes: ["kino", "anime"],
  loadLibrary: loadLibrary,
  setup: setup,
  loadMediaDetails: async () => {},
  checkUpdates: async () => false,
  update: async () => false
}