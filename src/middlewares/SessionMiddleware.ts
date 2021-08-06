import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "routing-controllers";

export const SessionMiddleware = (config = { strict: false }) => (req: Request, res: Response, next: NextFunction): void => {
	const sessionId = <string> (req.headers['sessionid'] || '');
	if(config.strict && sessionId === '') {
		throw new UnauthorizedError('Invalid session Id');
	}
	if(sessionId) {
		req.sessionId = sessionId;
	}
	next();	
}