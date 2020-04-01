import mongoose from 'mongoose';

export interface IBaseModel extends mongoose.Document {
  eliminado: boolean;
  usuarioCreacion: mongoose.Types.ObjectId;
  fechaCreacion: Date;
  usuarioModificacion: mongoose.Types.ObjectId;
  fechaModificacion: Date;
}