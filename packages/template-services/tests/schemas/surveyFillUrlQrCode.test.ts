import AJV from 'ajv';
import postSchema from '../../src/routers/survey_fill_url_qr_code/schemas/post.json';

let ajv: AJV.Ajv;

describe('survey QR code schemas', () => {
  beforeEach(() => {
    ajv = new AJV({ jsonPointers: true, allErrors: true });
  });

  describe('POST route schema should correctly validate JSON objects', () => {
    it('should correctly validate an invalid object', () => {
      const invalidObject = {
        surveyId: 'invalid UUID',
        baseUrl: 'invalid URL',
      };

      const isValid = ajv.validate(postSchema, invalidObject);

      expect(isValid).toBe(false);

      console.debug('Errors: ', ajv.errors);
    });

    it('should correctly validate a valid object', () => {
      const validObject = {
        surveyId: '770b6b3f-4bcd-4b1f-ad12-08853b4be301',
        baseUrl: 'http://example.com/',
      };

      const isValid = ajv.validate(postSchema, validObject);

      expect(isValid).toBe(true);

      console.debug('Errors: ', ajv.errors);
    });
  });
});
