import mongoose from 'mongoose';
import { IRead, IWrite } from './interfaces';

export default class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;
  
    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
      this._model = schemaModel;
    }
  
    create(item: T, callback: (error: any, result: T) => void) {
      this._model.create(item, callback);
    }    
  
    retrieve(callback: (error: any, result: T) => void) {
      this._model.find({}, callback);
    }
  
    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
      this._model.updateOne({ _id: _id }, item, callback);
    }
  
    delete(_id: string, callback: (error: any, result: any) => void) {
      this._model.deleteOne({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }
  
    findById(_id: string, callback: (error: any, result: T) => void) {
      this._model.findById(_id, callback);
    }
  
    findOne(cond: Object, callback?: (err: any, res: T) => void): mongoose.Query<T> {
      return <mongoose.Query<T>>this._model.findOne(cond, callback);
    }
  
    find(cond: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> {
      return <mongoose.Query<T[]>>this._model.find(cond, fields, callback);
    }

    count(cond: Object, callback: (err: any, res: number) => void): mongoose.Query<number> {
      return <mongoose.Query<number>>this._model.countDocuments(cond, callback);
    }
  
    private toObjectId(_id: string): mongoose.Types.ObjectId {
      return mongoose.Types.ObjectId.createFromHexString(_id);
    }
  
  }