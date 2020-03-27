import mongoose, { Schema } from 'mongoose';

const UsuarioSchema: Schema = new Schema({
  email: { type: String, required:  [true, 'El email es requerido'], unique: true },
  nombre: { type: String, required: [true, 'El nombre es requerido'] },
  descripcion: { type: String, required: [true, 'El descripcion es requerido'] },
  activo: { type: Boolean, required: true, default: true },
  UsuarioCreacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: true },
  FechaCreacion: { type: Boolean, required: true, default: Date.now },
  UsuarioModificacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: false },
  FechaModificacion: { type: Boolean, required: false }
});

export default mongoose.model('Usuario', UsuarioSchema);