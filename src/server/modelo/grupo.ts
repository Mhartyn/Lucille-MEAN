import mongoose, { Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const grupoSchema: Schema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es requerido'], unique: true },
  descripcion: { type: String, required: [true, 'El descripcion es requerido'] },
  activo: { type: Boolean, required: true, default: true },
  //UsuarioCreacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: true },
  FechaCreacion: { type: Date, required: true, default: Date.now },
  UsuarioModificacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: false },
  FechaModificacion: { type: Date, required: false }
});

grupoSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' });

export default mongoose.model('Grupo', grupoSchema);