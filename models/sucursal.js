const {Schema, model} = require('mongoose');

const SucursalSchema = new Schema({
    departamento: {
        type: String,
        required: [true, 'El departamento es obligatorio']
    },
    direccion: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    empresa: {
        type: Array,
        default: []
    }
});

module.exports = model('Sucursal', SucursalSchema);