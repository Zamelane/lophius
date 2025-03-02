import { run, logger } from "./src";

run().then(
  (p) => logger.info(`Server listening at 127.0.0.1:${p}`)
)