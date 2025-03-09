import { build } from "@deco/dev/tailwind";
await build();
import "./main.ts";
if (Deno.args.includes("build")) {
  Deno.exit(0);
}
