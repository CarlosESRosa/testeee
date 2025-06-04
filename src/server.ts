import app from './app';
import { config } from './config/env';
import { initializeModels } from './config/database';

const PORT = config.PORT || 3000;

(async () => {
    try {
        await initializeModels();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Server startup error:', err);
        process.exit(1);
    }
})(); 