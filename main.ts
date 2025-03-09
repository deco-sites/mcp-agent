import "deco/runtime/htmx/FreshHeadCompat.ts";
import { Deco } from "@deco/deco";
import { mcpServer } from "@deco/mcp";
import { Hono } from "@hono/hono";
import { Layout } from "./_app.tsx";
import manifest, { Manifest } from "./manifest.gen.ts";
import { bindings as HTMX } from "@deco/deco/htmx";

const app = new Hono();
const deco = await Deco.init<Manifest>({
  manifest,
  bindings: HTMX({
    Layout,
  }),
});
const envPort = Deno.env.get("PORT");

app.use(
  "/*",
  mcpServer(deco, {
    include: ["site/loaders/helloWorld.ts", "site/loaders/randomNumber.ts"],
  }),
);
app.all("/*", async (c) => c.res = await deco.fetch(c.req.raw));

Deno.serve({ handler: app.fetch, port: envPort ? +envPort : 8000 });
