import 'express';
declare global {
  namespace Express {
    interface Request {
      sessionId?: string;
    }
  }
}