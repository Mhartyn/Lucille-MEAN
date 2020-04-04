  import mongoose, { Schema } from 'mongoose';
  import { IMaestroModel } from './interfaces/iMaestroModel';
  import mongooseUniqueValidator from 'mongoose-unique-validator';
  
  let ObjectId = mongoose.Schema.Types.ObjectId;

  const MaestroSchema: Schema = new Schema<IMaestroModel>({
    nombre: { type: String, required: [true, 'El nombre es requerido'], unique: true },
    descripcion: { type: String, required: [true, 'El descripcion es requerido'] },
    tipo: { type: Number, required: [true, 'El tipo es requerido'] },
    eliminado: { type: Boolean, required: true, default: false },
    usuarioCreacion: { type: ObjectId, ref: "Usuario", required: true },
    fechaCreacion: { type: Date, required: true },
    usuarioModificacion: { type: ObjectId, ref: "Usuario", required: false },
    fechaModificacion: { type: Date, required: false }
  }).pre('save', function(next : Function): any {
     if (this) {
       let doc = <IMaestroModel>this;
       let now = new Date();
       if (!doc.fechaCreacion) {
         doc.fechaCreacion = now;
       }else{
         doc.fechaModificacion = now;        
        console.log(doc.fechaModificacion);
      }
     }
     next();
     return this;
   });
  
  MaestroSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' });
  
  export default mongoose.model<IMaestroModel>('maestro', MaestroSchema, 'maestro', true);