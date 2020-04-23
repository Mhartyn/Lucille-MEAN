declare namespace NodeJS {
    export interface ProcessEnv {
      PORT: any;
      NODE_ENV: string;
      CADUCIDAD_TOKEN: string;
      SEED: string;
      TOKEN_INICIAL: string;
      TOKEN_REGRESO: string;
      VUELTAS_CLAVE: any;
      MONGO_URI: string;
      URLDB: string;
      CLIENT_ID: string;
      CLAVE_USUARIO_GOOGLE: string;
      ROL_DEFAULT: string;
    }
}
