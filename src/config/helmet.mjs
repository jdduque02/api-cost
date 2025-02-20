export const configHelmet = {
    // Previene clickjacking
    frameguard: { 
        action: 'deny' 
    },
    
    // Establece Content-Security-Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    
    // Oculta el header X-Powered-By
    hidePoweredBy: true,
    
    // Previene sniffing de MIME Types
    noSniff: true,
    
    // Control de DNS Prefetch
    dnsPrefetchControl: {
        allow: false
    }
};