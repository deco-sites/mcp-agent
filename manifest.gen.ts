// DO NOT EDIT. This file is generated by deco.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $$$$$$$$$$$0 from "./apps/deco/htmx.ts";
import * as $$$$$$$$$$$1 from "./apps/site.ts";
import * as $$$0 from "./loaders/helloWorld.ts";
import * as $$$1 from "./loaders/randomNumber.ts";
import * as $$$$$$0 from "./sections/ItWorks.tsx";
import * as $$$$$$1 from "./sections/Theme/Theme.tsx";

const manifest = {
  "loaders": {
    "site/loaders/helloWorld.ts": $$$0,
    "site/loaders/randomNumber.ts": $$$1,
  },
  "sections": {
    "site/sections/ItWorks.tsx": $$$$$$0,
    "site/sections/Theme/Theme.tsx": $$$$$$1,
  },
  "apps": {
    "site/apps/deco/htmx.ts": $$$$$$$$$$$0,
    "site/apps/site.ts": $$$$$$$$$$$1,
  },
  "name": "site",
  "baseUrl": import.meta.url,
};

export type Manifest = typeof manifest;

export default manifest;
