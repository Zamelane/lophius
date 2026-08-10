import { type App } from "@@/apps/server/src/types";

import { treaty } from '@elysia/eden'
import { API_URL } from "../config/env";

const client = treaty<App>(API_URL);

export { client };