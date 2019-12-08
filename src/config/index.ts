import * as pkg from '../../package.json'

export interface Config {
  stage: string
  app: ConfigApp
  mongo: ConfigMongo
}

interface ConfigMongo {
  port: number
  dbName: string
}

interface ConfigApp {
  host: string
  name: string
  port: number
  debug: boolean
}

const config: Config = {
  stage: 'development',
  app: {
    host: '0.0.0.0',
    port: 9087,
    name: pkg.name,
    debug: false,
  },
  mongo: {
    port: 41934,
    dbName: 'seek_db1',
  },
}

export default config
