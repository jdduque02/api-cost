import rateLimit from 'express-rate-limit'

export const RateLimit = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutos
    max: 100, // limita cada dispositivo a 100 peticiones por windowMs
    message: 'Demasiadas peticiones desde este dispositivo',
    keyGenerator: (req) => req.headers['x-access-token'] || req.ip
});