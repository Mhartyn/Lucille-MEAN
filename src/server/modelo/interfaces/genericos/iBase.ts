import mongoose from 'mongoose';

export default interface IBaseModel extends mongoose.Document {
  eliminado: boolean;
  usuarioCreacion: mongoose.Types.ObjectId | undefined;
  fechaCreacion: Date | undefined;
  usuarioModificacion: mongoose.Types.ObjectId | undefined;
  fechaModificacion: Date | undefined;
}