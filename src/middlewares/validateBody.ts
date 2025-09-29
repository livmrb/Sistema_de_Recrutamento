import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const error = err as ZodError<any>;
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(issue => ({
          path: issue.path.join('.') || 'body',
          message: issue.message,
        }));

        return res.status(400).json({
          message: 'Erro de validação no body',
          errors: formattedErrors,
        });
      }
      next(err);
    }
  };
};

export default validateBody;
