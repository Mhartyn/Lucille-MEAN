declare namespace NodeJS {
    export interface ProcessEnv {
      PORT: any;
      NODE_ENV: string;
      CADUCIDAD_TOKEN: string;
      SEED: string;
      MONGO_URI: string;
      URLDB: string;
      CLIENT_ID: string;
    }
}
