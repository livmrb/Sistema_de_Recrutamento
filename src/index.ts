import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import usuarioRoutes from './routes/UsuarioRoute';
import candidatoRoutes from './routes/CandidatoRoute';
import entrevistadorRoutes from './routes/EntrevistadorRoute';
import entrevistaRoutes from './routes/EntrevistaRoute';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/usuarios', usuarioRoutes);
app.use('/candidatos', candidatoRoutes);
app.use('/entrevistadores', entrevistadorRoutes);
app.use('/entrevistas', entrevistaRoutes);

export default app;
