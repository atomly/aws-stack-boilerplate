/**
 * Originally forked from: [passport-token-google](https://github.com/katastreet/passport-token-google)
 * By [katastreet](https://github.com/katastreet).
 */

// Libraries
import {
  Strategy as OAuth2Strategy,
  StrategyOptions,
  InternalOAuthError,
  VerifyCallback,
} from 'passport-oauth2';
import { Request } from 'express';

// Types
import {
  GoogleTokenStrategyOptions,
  GoogleProfile,
  GoogleOAuth2ResponseBody,
  VerifyFunction,
  VerifyFunctionWithRequest,
  DoneFunction,
} from './types';

const googleAuthorizationURL = 'https://accounts.google.com/o/oauth2/auth';
const googleTokenURL = 'https://accounts.google.com/o/oauth2/token';
const googleTokenInfoURL = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

/**
 * The Google authentication strategy authenticates requests by delegating to
 * Google using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *
 *   - `clientID`      your Google application's client id
 *   - `clientSecret`  your Google application's client secret
 *   - `callbackURL`   URL to which Google will redirect the user after granting authorization
 *
 * Examples:
 *
 *    passport.use(
 *       new GoogleStrategy(
 *         {
 *           clientID: '123-456-789',
 *           clientSecret: 'shhh-its-a-secret'
 *           callbackURL: 'https://www.example.net/auth/google/callback'
 *         },
 *         function(accessToken, refreshToken, profile, done) {
 *           User.findOrCreate(..., function (err, user) {
 *             done(err, user);
 *           });
 *         },
 *       )
 *    );
 *
 * @param {Object} options - Strategy Options.
 * @param {Function} verify - Verify Function.
 * @api public
 */
export class GoogleTokenStrategy extends OAuth2Strategy {
  /**
   * Internal parameter of the OAuth2Strategy constructor.
   *
   * [node_modules/passport-oauth2/lib/strategy.js]
   */
  private _passReqToCallback: StrategyOptions['passReqToCallback'];

  /**
   * Internal parameter of the OAuth2Strategy constructor.
   *
   * [node_modules/passport-oauth2/lib/strategy.js]
   */
  private _skipUserProfile: StrategyOptions['skipUserProfile'];

  /**
   * Internal parameter of the OAuth2Strategy constructor.
   *
   * [node_modules/passport-oauth2/lib/strategy.js]
   */
  private _verify: VerifyFunction | VerifyFunctionWithRequest;

  public name: string;

  constructor(
    options: GoogleTokenStrategyOptions,
    verify: VerifyFunction | VerifyFunctionWithRequest,
  ) {
    const oAuthOptions = options;
    oAuthOptions.authorizationURL = options.authorizationURL ?? googleAuthorizationURL;
    oAuthOptions.tokenURL = options.tokenURL ?? googleTokenURL;
    // OAuth2Strategy.call(this, options, verify);
    super(oAuthOptions as StrategyOptions, verify as VerifyFunction);
    this.name = 'google-token';
  }

  public authenticate(
    req: Request,
    // options?: Partial<StrategyOptions> = {},
  ): void {
    if (req.query?.error) {
      // TODO: Error information pertaining to OAuth 2.0 flows is encoded in the
      //       query parameters, and should be propagated to the application.
      return this.fail();
    }
  
    const accessToken = req.body ?
      req.body.access_token ?? req.query.access_token ?? req.headers.access_token :
      req.headers.access_token ?? req.query.access_token;

    const refreshToken = req.body ?
      req.body.refresh_token ?? req.query.refresh_token ?? req.headers.refresh_token :
      req.headers.refresh_token ?? req.query.refresh_token;

    this.loadUserProfile(
      accessToken,
      (err, profile) => {
        if (err) { return this.fail(err?.message); };
    
        const verified: VerifyCallback = (
          err,
          user,
          info,
        ): void => {
          if (err) { return this.error(err); }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!user) { return this.fail(info as any); }
          this.success(user, info);
        };
    
        if (this._passReqToCallback) {
          (this._verify as VerifyFunctionWithRequest)(req, accessToken, refreshToken, profile!, verified);
        } else {
          (this._verify as VerifyFunction)(accessToken, refreshToken, profile!, verified);
        }
      },
    );
  }

  public userProfile(
    accessToken: string,
    done: DoneFunction,
  ): void {
    // const googleProfileURL = `${googleTokenInfoURL}?id_token=${accessToken}`;

    this._oauth2.get(
      googleTokenInfoURL,
      accessToken,
      function (
        err,
        body,
        // _res,
      ) {
        if (err) {
          return done(new InternalOAuthError('Failed to fetch user profile.', err));
        }
    
        try {
          const json: GoogleOAuth2ResponseBody = JSON.parse(body as string);
    
          const profile: GoogleProfile = {
            provider: 'google',
            id: json.id || json.sub,
            displayName: json.name,
            name: {
              familyName: json.family_name,
              givenName: json.given_name,
            },
            emails: [{ value: json.email }],
            _raw: body,
            _json: json,
          };
    
          done(null, profile);
        } catch(e) {
          done(e);
        }
      },
    );
  }

  private loadUserProfile(
    accessToken: string,
    done: DoneFunction,
  ): void {
    if (typeof this._skipUserProfile == 'function' && this._skipUserProfile.length > 1) {
      // async
      this._skipUserProfile(
        accessToken,
        (err: InternalOAuthError, skip: unknown): void => {
          if (err) { return done(err); }
          if (!skip) { return this.loadIt(accessToken, done); }
          return this.skipIt(done);
        },
      );
    } else {
      const skip: unknown = (typeof this._skipUserProfile == 'function') ?
        this._skipUserProfile() :
        this._skipUserProfile;
      if (!skip) {
        return this.loadIt(accessToken, done);
      }
      return this.skipIt(done);
    }
  }

  private loadIt(
    accessToken: string,
    done: DoneFunction,
  ): void {
    return this.userProfile(accessToken, done);
  }

  private skipIt(done: DoneFunction): void {
    return done(null);
  }
}
