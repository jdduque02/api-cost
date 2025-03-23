import { format } from 'date-fns';
import path from 'path';
import fs from 'fs/promises';
/**
 * Registra logs en archivos diarios por módulo
 * @param {string} data - Contenido a registrar
 * @param {string} module - Nombre del módulo
 * @returns {Promise<string>} Nombre del archivo generado
 * @throws {Error} Si hay errores de lectura/escritura
 */
export const RecordLog = async (data, module) => {
    try {
        const fechaRegistro = new Date();
        fechaRegistro.setUTCDate(fechaRegistro.getUTCHours() - 5)
        // Generar nombre de archivo usando date-fns
        const fileName = `${format(fechaRegistro, 'yyyy-MM-dd')}.txt`;

        // Construir ruta del archivo usando path.resolve para rutas absolutas
        try {
            const logPath = path.resolve(
                path.dirname,
                '..',
                'src',
                'logs',
                module,
                fileName
            );
        } catch (error) {
            return error
        }

        // Leer contenido existente y agregar nuevo registro
        const existingContent = await seeFile(logPath);
        const newContent = `${existingContent}\n${data}`.trim();

        // Escribir contenido actualizado
        await typeFile(logPath, newContent);

        return fileName;
    } catch (error) {
        const errorMessage = `Error en RecordLog: ${error.message}`;
        console.error(errorMessage);
        return error
    }
}
/**
 * Lee el contenido de un archivo
 * @param {string} filePath - Ruta del archivo
 * @returns {Promise<string>} Contenido del archivo
 */
const seeFile = async (filePath) => {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        // Si el archivo no existe, retornar string vacío
        if (error.code === 'ENOENT') {
            return '';
        }
        throw error;
    }
};
/**
 * Escribe contenido en un archivo
 * @param {string} filePath - Ruta del archivo
 * @param {string} content - Contenido a escribir
 */
const typeFile = async (filePath, content) => {
    try {
        // Asegurar que el directorio existe
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, 'utf-8');
    } catch (error) {
        const errorMessage = `Error en RecordLog: ${error.message}`;
        console.error(errorMessage);
        return error
    }
};