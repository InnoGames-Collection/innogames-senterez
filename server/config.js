
var config = {
    db: {
        options: {
            db: {native_parser: true},
            server: {poolSize: 5},
        },
        uri: process.env.MONGO_URL || 'mongodb://127.0.0.1/senterez'
    },
    porthttp: process.env.PORT || 3311,
    multicore: false,
    https: process.env.USE_HTTPS !== 'false',
    trustProxy: process.env.TRUST_PROXY === 'true',
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
    debug: process.env.NODE_ENV !== 'production',
    jwtSecret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : 'senterez-dev-secret-change-in-production'),
    seedInitialAdmin: process.env.SEED_INITIAL_ADMIN === 'true',
    admin: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || null,
        email: process.env.ADMIN_EMAIL || 'admin@innosphere.et',
        name: process.env.ADMIN_NAME || 'Administrator'
    }
}

if (process.env.NODE_ENV === 'production' && !config.jwtSecret) {
    console.error('FATAL: JWT_SECRET must be set in production. See .env.example')
    process.exit(1)
}

module.exports = config;
