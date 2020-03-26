import mongoose, { Schema } from 'mongoose';

const UsuarioSchema: Schema = new Schema({
  email: { type: String, required:  [true, 'El email es requerido'], unique: [true, 'El email debe ser unico'] },
  nombre: { type: String, required: [true, 'El nombre es requerido'], unique: true },
  descripcion: { type: String, required: [true, 'El descripcion es requerido'] },
  estado: { type: Boolean, required: true, default: true },
  UsuarioCreacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: false },
  FechaCreacion: { type: Boolean, required: false },
  UsuarioModificacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: false },
  FechaModificacion: { type: Boolean, required: false }
});

export default mongoose.model('Usuario', UsuarioSchema);