import { createDataAttribute } from 'next-sanity';
import { dataset, projectId } from '../env';

export function blogEditingAttribute(id: string, path: string) {
  return createDataAttribute({ id, type: 'blogPost', path, projectId, dataset }).toString();
}
