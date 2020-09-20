import { EStatuses } from './errors';

export interface IError {
  name: string
  description: string
  message?: string
  details?: string
  cause?: string
  downtime_end_date?: Date
}

export type ErrorMap = {
  [key in EStatuses]: IError;
}

export interface IThrowErrorOptions extends Pick<IError, 'message' | 'details' | 'cause' | 'downtime_end_date'> {
  status?: EStatuses
  shouldDisplayMessageInProduction?: boolean
}

export interface IThrowError {
  status: EStatuses;
  statusText: string;
  type: string;
  body: IError;
}
