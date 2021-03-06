import mongoose, { Schema } from 'mongoose';
import IMaestroModel from './interfaces/iMaestroModel';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import IUsuarioModel from './interfaces/iUsuarioModel';

let ObjectId = mongoose.Schema.Types.ObjectId;

const UsuarioSchema: Schema = new Schema<IUsuarioModel>({
  nombre: { type: String, required: [true, 'El nombre es requerido'] },
  email: { type: String, required: [true, 'El email es requerido'], unique: true },
  password: { type: String, required: [true, 'La clave es requerido'] },
  google: { type: Boolean, required: true, default: false },
  rol: { type: String, required: true, default: 'USER' },
  img: { type: String, required: false },
  eliminado: { type: Boolean, required: true, default: false },
  usuarioCreacion: { type: ObjectId, ref: "Usuario", required: false },
  fechaCreacion: { type: Date, required: true, default: new Date() },
  usuarioModificacion: { type: ObjectId, ref: "Usuario", required: false },
  fechaModificacion: { type: Date, required: false }
})/* .pre('save', function(next : Function): any {
   if (this) {
     let doc = <IUsuarioModel>this;
     let now = new Date();

     if (!doc.fechaCreacion) {
       doc.fechaCreacion = now;
     }else{
       doc.fechaModificacion = now;
    }
   }
   next();
   return this;
 }) */;

UsuarioSchema.methods.toJSON = function() {
  let user = this;

  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UsuarioSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' });

export default mongoose.model<IMaestroModel>('usuario', UsuarioSchema, 'usuario', true);