import fs from 'node:fs';
import path from 'node:path';

const validateFileExistence = (pathFile) => {
    try {
        return fs.statSync(pathFile).isFile();
    } catch (e) {
        return false;
    }
}
const typeFile = (route, text) => {
    fs.writeFile(route, text, (err) => {
        if (err) return err;
        return;
    })
}
const seeFile = (route) => {
    let file = '';
    if (!validateFileExistence(route)) {
        fs.writeFile(route, '', (err) => {
            if (err) return err;
            return
        });
    } else {
        file = fs.readFileSync(route, 'utf8');
    }
    return file;
}
export const RecordLog = (data, module) => {
    const dateFile = new Date();
    let day = dateFile.getUTCDate();
    if (day < 10) day = '0' + day;
    let month = dateFile.getUTCMonth() + 1;
    if (month < 10) month = '0' + month;
    const nameFile = `${dateFile.getFullYear()}-${month}-${day}.txt`;
    const route = path.join(`../src/logs/${module}/${nameFile}`);
    let SeeFile;
    try {
        SeeFile = seeFile(route);
    } catch (error) {
        return error;
    }
    SeeFile = `${SeeFile}\n${data}`;
    try {
        typeFile(route, SeeFile);
    } catch (error) {
        return error;
    }
    return nameFile;
}