// src/middlewares/validateQuery.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

const validateQuery = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      const error = err as ZodError<any>;
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(issue => ({
          path: issue.path.join('.') || 'query',
          message: issue.message,
        }));

        return res.status(400).json({
          message: 'Erro de validação na query',
          errors: formattedErrors,
        });
      }
      next(err);
    }
  };
};

export default validateQuery;
