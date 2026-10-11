// sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { resolve } from './sanity/presentationResolver';
import BlogGuide from './sanity/BlogGuide';
import { BookOpen } from 'lucide-react';

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: 'PSBL · Sisällönhallinta',

  schema: { types: schemaTypes, templates: templates => templates.filter(template => template.schemaType !== 'blogSettings') },
  tools: tools => [...tools, { name: 'kirjoittajan-ohje', title: 'Kirjoittajan ohje', icon: BookOpen, component: BlogGuide }],
  document: {
    actions: (actions, context) => context.schemaType === 'blogSettings'
      ? actions.filter(action => !['delete', 'duplicate', 'unpublish'].includes(action.action || ''))
      : actions,
  },

  plugins: [
    deskTool({ structure, title: 'Sisältö' }),
    ...(process.env.NODE_ENV === 'development' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
    presentationTool({
      title: 'Esikatselu',
      resolve,
      previewUrl: {
        initial: '/blogi/',
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
});
