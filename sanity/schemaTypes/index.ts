import aboutSettings from "./aboutSettings";
import { contactSettings } from "./contactSettings";
import homeSettings from "./homeSettings";
import servicesSettings from "./servicesSettings";
import servicePage from "./servicePage";
import projectReference from "./projectReference";
import referencesSettings from "./referencesSettings";
import referencesPageSettings from "./referencesPageSettings";
import videoObject from "./videoObject";
import testimonial from "./testimonial";
import blogPost, { blogBody } from './blogPost';
import blogSettings from './blogSettings';


export const schemaTypes = [
  blogPost,
  blogBody,
  blogSettings,
  homeSettings,
  aboutSettings,
  servicesSettings,
  contactSettings,
  servicePage,
  referencesSettings,
  projectReference,
  referencesPageSettings,
  videoObject,
  testimonial,
  // other schemas...
];
