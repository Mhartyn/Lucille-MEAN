export default class Inicial{
    static init = (): void => {
      //==========================
      //PUERTO
      //==========================
      process.env.PORT = process.env.PORT || '3000';
  
      //==========================
      // Entorno
      //==========================
      process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  
      //==========================
      // Fecha de vencimiento
      //==========================
      // 1 HORA
      process.env.CADUCIDAD_TOKEN = "1h";
  
      //==========================
      // SEED
      //==========================
      process.env.SEED = process.env.SEED || 'B498437D-F3C4-4A36-A51F-AD82B48BF247';
  
      //==========================
      //Nombre token
      //==========================
      process.env.TOKEN_INICIAL = 'auth';

      //==========================
      //Nombre token de respuesta
      //==========================
      process.env.TOKEN_REGRESO = 'token';
      
      //==========================
      //Nombre token de respuesta
      //==========================
      process.env.VUELTAS_CLAVE = 256;
  
      //==========================
      // Base de Datos
      //==========================
      let urlDB;
      if (process.env.NODE_ENV === 'dev') {
          urlDB = 'mongodb://localhost:27017/presupuesto';
      } else {
          urlDB = process.env.MONGO_URI;
      }
  
      process.env.URLDB = urlDB;
  
      //==========================
      // client id
      //==========================
      process.env.CLIENT_ID = process.env.CLIENT_ID || '433180258042-53iuubf5d6pdhcebhemg4phrdblq3vbm.apps.googleusercontent.com';
  }
  }