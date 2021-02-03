// import node_modules
import { resolve } from "path"

// main
export const DotEnv = {
  CONFIG_OPTIONS: { path: resolve(process.cwd(), ".env") },
} as const
