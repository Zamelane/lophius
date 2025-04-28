import {ParserPlugin} from "../../src/types.ts";
import {execute} from "@plugins/tmdb/execute.ts";

const TMDB: ParserPlugin = {
	name: 'TMDB',
	uid: 'GSIST',
	version: '0.1.1',
	execute
}

export default TMDB;