import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { swaggerSpec } from './config/swagger'; 

import authRoutes from './routes/AuthRoute';
import usuarioRoutes from './routes/UsuarioRoute';
import candidatoRoutes from './routes/CandidatoRoute';
import entrevistadorRoutes from './routes/EntrevistadorRoute';
import entrevistaRoutes from './routes/EntrevistaRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/candidatos', candidatoRoutes);
app.use('/entrevistadores', entrevistadorRoutes);
app.use('/entrevistas', entrevistaRoutes);

export default app;
