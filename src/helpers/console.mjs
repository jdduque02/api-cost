
import pc from 'picocolors';
export class CustomLogger {
    //La función `static async log(message)` es un método de la clase `CustomLogger`. Se utiliza para registrar un mensaje en la consola si el entorno actual está configurado en 'DEV'.
    static log(message) {
        if (CustomLogger.isDev()) console.log(pc.blue(message));
    }

    //El método `error asíncrono estático (mensaje)` es parte de la clase `CustomLogger`. Se utiliza para registrar un mensaje de error en la consola si el entorno actual está configurado en 'DEV'.
    static error(message) {
        if (CustomLogger.isDev()) console.error(pc.red(message));
    }

    //El método `timeStart` es un método asincrónico estático de la clase `CustomLogger`. Se utiliza para iniciar un temporizador con el nombre de pila si el entorno actual está configurado en 'DEV'.
    static timeStart(name) {
        if (CustomLogger.isDev()) console.time(pc.yellow(name));
    }

    //El método `timeEnd` es un método asincrónico estático de la clase `CustomLogger`. Se utiliza para detener un temporizador que se inició con el método `timeStart`. Si el entorno actual está configurado como 'DEV', llamará al método `console.timeEnd` con el parámetro `name` proporcionado para detener el temporizador y registrar el tiempo transcurrido en la consola.
    static timeEnd(name) {
        if (CustomLogger.isDev()) console.timeEnd(pc.yellow(name));
    }
    //El método `static async debug(message)` es un método estático asíncrono de la clase `CustomLogger`. Se utiliza para registrar un mensaje de depuración en la consola si el entorno actual está configurado como 'DEV'.
    static debug(message) {
        if (CustomLogger.isDev()) console.debug(pc.green(message));
    }
    static dir(message) {
        if (CustomLogger.isDev()) console.dir(pc.gray(message));
    }
    // Función privada para verificar el entorno de desarrollo
    static isDev() {
        return process.env.APP_ENV === 'DEV';
    }
}