// Types
import { IResolvers } from '../../../types';
import { PlaceholderStatuses } from './placeholder';

export interface IEnumsResolverMap extends IResolvers {
  PlaceholderStatuses: typeof PlaceholderStatuses,
}
