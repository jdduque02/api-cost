
//La `clase de exportación ValidationError extiende Error` define una clase de error personalizada llamada `ValidationError` que extiende la clase incorporada `Error`.
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidateError';
    }
}

//La clase `ConnectionError` define una clase de error personalizada llamada `ConnectionError` que extiende la clase incorporada `Error`. Tiene un constructor que toma un parámetro `message`, que se pasa al método `super()` para establecer el mensaje de error. También establece la propiedad `nombre` del error en 'ConnectionDBError'. Esta clase de error personalizada se puede utilizar para generar y detectar errores específicos relacionados con problemas de conexión de la base de datos en el código.
export class ConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionDBError';
    }
}

//La clase `AuthenticationError` define una clase de error personalizada llamada `AuthenticationError` que extiende la clase incorporada `Error`. Tiene un constructor que toma un parámetro `message`, que se pasa al método `super()` para establecer el mensaje de error. También establece la propiedad `nombre` del error en 'AuthenticationError'. Esta clase de error personalizada se puede utilizar para generar y detectar errores específicos relacionados con la autenticación en el código.
export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

//La clase `AuthorizationError` define una clase de error personalizada llamada `AuthorizationError` que extiende la clase incorporada `Error`. Tiene un constructor que toma un parámetro `message`, que se pasa al método `super()` para establecer el mensaje de error. También establece la propiedad `nombre` del error en 'AuthorizationError'. Esta clase de error personalizada se puede utilizar para generar y detectar errores específicos relacionados con la autorización en el código.
export class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
    }
}

//La `clase de exportación ServerError extiende Error` define una clase de error personalizada llamada `ServerError` que extiende la clase incorporada `Error`.
export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
}

//La clase `ResourceNotFoundError` es una clase de error personalizada que extiende la clase incorporada `Error`. Se utiliza para representar errores relacionados con un recurso que no se encuentra.
export class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFoundError';
    }
}
//La clase `RateLimitingError` es una clase de error personalizada que extiende la clase incorporada `Error`. Se utiliza para representar errores relacionados con la limitación de velocidad.
export class RateLimitingError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RateLimitingError';
    }
}

//La clase `ResponseFormatErrors` es una clase de error personalizada que extiende la clase incorporada `Error`. Se utiliza para representar errores relacionados con problemas de formato de respuesta.
export class ResponseFormatErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResponseFormatErrors';
    }
}

//La clase `NetworkConnectivityErrors` es una clase de error personalizada que extiende la clase incorporada `Error`. Se utiliza para representar errores relacionados con problemas de conectividad de red.
export class NetworkConnectivityErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkConnectivityErrors';
    }
}
//La clase `SecurityErrors` define una clase de error personalizada llamada `SecurityErrors` que extiende la clase incorporada `Error`. Se utiliza para representar errores relacionados con cuestiones de seguridad.
export class SecurityErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'SecurityErrors';
    }
}

//La clase `QueryErrors` define una clase de error personalizada llamada `QueryErrors` que extiende la clase incorporada `Error`. Se utiliza para representar errores que ocurren durante las operaciones de consulta. El constructor de la clase `QueryErrors` toma un parámetro `message`, que se pasa al método `super()` para establecer el mensaje de error. También establece la propiedad 'nombre' del error en 'QueryErrors'. Esta clase de error personalizada se puede utilizar para generar y detectar errores específicos relacionados con consultas en el código.
export class QueryErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryErrors';
    }
}
