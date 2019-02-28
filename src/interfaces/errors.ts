import {Errback} from 'express';

export interface CustomErrback extends Errback {
  message: string;
  status: number;
}
