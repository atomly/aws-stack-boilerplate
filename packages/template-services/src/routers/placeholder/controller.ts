// Libraries
import { Request, Response } from 'express';

interface PlaceholderRequestBody {
  test: string;
}

export class PlaceholderController {
  static async post(req: Request, res: Response, next: (t: unknown) => unknown): Promise<void> {
    try {
      const { test } = req.body as PlaceholderRequestBody;

      res.status(200).json({ test });
    } catch (err) {
      next(err);
    }
  }
}
