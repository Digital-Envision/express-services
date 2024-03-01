import { Request, Response, NextFunction } from "express";

/**
 * Helper function to set default response JSON for all API routes.
 */
export function setDefaultResponse(req: Request, res: Response, next: NextFunction) {
    res.locals.defaultResponse = {
        success: true,
        message: "Default response",
        data: null,
    };
    next();
}