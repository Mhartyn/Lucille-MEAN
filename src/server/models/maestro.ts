import mongoose, { Schema } from 'mongoose';

const maestroSchema: Schema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es requerido'], unique: true },
  descripcion: { type: String, required: [true, 'El descripcion es requerido'] },
  estado: { type: Boolean, required: true, default: true },
  UsuarioCreacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: true },
  FechaCreacion: { type: Boolean, required: true, default: Date.now },
  UsuarioModificacion: { type: mongoose.Types.ObjectId, ref: "Usuario", required: false },
  FechaModificacion: { type: Boolean, required: false }
});

export default mongoose.model('Maestro', maestroSchema);