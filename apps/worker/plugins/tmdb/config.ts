import { ParserPluginConfig } from "src/types";

export const TMDBConfig: ParserPluginConfig = {
  name: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  concurrent: 10,
  maxInMinute: 40 * 60,
}