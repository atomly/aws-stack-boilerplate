import { Router } from 'express';

/**
 * Composes all accepted routers into a single router, then returns it.
 * @param routers - Router arguments.
 */
export function composeRouters(...routers: Router[]): Router {
  const router: Router = Router();

  routers.forEach(r => { router.use(r); });

  return router;
}
