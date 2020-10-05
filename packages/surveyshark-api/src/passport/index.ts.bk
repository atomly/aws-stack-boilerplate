// Libraries
import { Request, Response } from 'express';
import passport from 'passport';
// import FacebookTokenStrategy from 'passport-facebook-token';

// Dependencies
import {
  GoogleTokenStrategy,
  GoogleProfile,
} from '../auth';
import { InternalOAuthError } from 'passport-oauth2';

//
// STRATEGIES
//

// FACEBOOK STRATEGY
// const FacebookTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
//   accessToken,
//   refreshToken,
//   profile,
// });

// passport.use(
//   new FacebookTokenStrategy(
//     {
//       clientID: 'your-facebook-app-id',
//       clientSecret: 'your-facebook-app-secret',
//     },
//     FacebookTokenStrategyCallback,
//   ),
// );

// GOOGLE STRATEGY
function googleTokenStrategyCallback(
  accessToken: string,
  refreshToken: string,
  profile: GoogleProfile,
  done: (
    eror: InternalOAuthError | undefined | null,
    params: { accessToken: string; refreshToken: string; profile: GoogleProfile; },
  ) => void,
): void {
  return done(
    null,
    {
      accessToken,
      refreshToken,
      profile,
    },
  );
};

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    googleTokenStrategyCallback,
  ),
);

//
// Promisified authenticate functions
//

// export const authenticateFacebook = (req, res) => new Promise((resolve, reject) => {
//     passport.authenticate('facebook-token', { session: false }, (err, data, info) => {
//         if (err) reject(err);
//         resolve({ data, info });
//     })(req, res);
// });

export function authenticateGoogle(req: Request, res: Response): Promise<{ data: unknown, info: unknown }> {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'google-token',
      { session: false },
      (err, data, info) => {
        if (err) {
          reject(err);
        }
        resolve({ data, info });
      },
    )(req, res);
  });
};
