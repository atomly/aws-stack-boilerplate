// Libraries
import { VerifyCallback, StrategyOptions, InternalOAuthError } from 'passport-oauth2';
import { Request } from 'express';

export interface GoogleTokenStrategyOptions extends Omit<Omit<StrategyOptions, 'authorizationURL'>, 'tokenURL'> {
  authorizationURL?: string;
  tokenURL?: string;
}

export interface GoogleProfile {
  provider: 'google';
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [{ value: string }];
  _raw: string | Buffer | undefined;
  _json: unknown;
}

export interface GoogleOAuth2ResponseBody {
  id: string;
  sub: string;
  name: string;
  family_name: string;
  given_name: string;
  email: string;
}

export type VerifyFunction = (accessToken: string, refreshToken: string, profile: GoogleProfile, verified: VerifyCallback) => void;

export type VerifyFunctionWithRequest = (req: Request, accessToken: string, refreshToken: string, profile: GoogleProfile, verified: VerifyCallback) => void;

export type DoneFunction = (error: InternalOAuthError | null, profile?: GoogleProfile) => void;
