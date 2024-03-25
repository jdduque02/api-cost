import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
const changeHistoryUser = Schema({
    _id: {
        type: String
    },
    modifiedVariable: {
        type: String,
        //required: true,
    },
    dateModification: {
        type: Date,
        //required: true,
    },
    valuePrevious: {
        type: String,
        //required: true,
    },
    valueNew: {
        type: String,
        //required: true
    }
});
/* Este modelo representa la información de los usuarios de tu aplicación.
user: El nombre de usuario o identificación del usuario.
password: La contraseña del usuario (debe almacenarse de manera segura, preferiblemente como un hash).
email: La dirección de correo electrónico del usuario.
numerphone: El número de teléfono del usuario.
created_at: La fecha y hora en que se creó la cuenta del usuario.
update_at: La fecha y hora de la última actualización de la cuenta del usuario.
last_conect: La fecha y hora de la última conexión del usuario.
role: El rol o nivel de acceso del usuario (por ejemplo, administrador, usuario regular).
imgProfile: Una ruta o enlace a la imagen de perfil del usuario.
_id: El identificador único del usuario.
 */
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    numberPhone: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    imgProfile: {
        type: String,
    },
    changeHistoryUser: [changeHistoryUser],
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    },
    state: {
        type: Boolean,
        default: true
    },
    last_conect: {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('user', userSchema);