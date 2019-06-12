import userRoutes from './user/user.routes';
import uploadRoutes from './upload/upload.routes';

export default app => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/upload', uploadRoutes);
};
