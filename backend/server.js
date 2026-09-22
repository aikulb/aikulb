import app from './src/app.js';
import { config } from './src/config/unifiedConfig.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`⚡ AI KLUB Backend Microservice listening on http://localhost:${PORT}`);
});
