// sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,

  schema: { types: schemaTypes },

  plugins: [
    deskTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
