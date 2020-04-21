import path from 'path';
import { Router, static as staticDir } from 'express';

const webRouter = Router();

webRouter.use(staticDir(path.join(__dirname, '../public')));

export default webRouter;
