import * as supertest from 'supertest'
import diFactory from '../../src/di'
import config, { Config } from '../../src/config'
import server from '../../src/server'

let clientInstance: Promise<Function> | null = null

export async function createAgent(customConfig: Config | null | undefined) {
  const di = await diFactory(customConfig || config)
  const app = await server(di)
  return supertest(app.callback())
}

function query(queryFilePath: string, variables = {}) {
  return JSON.stringify({ query: queryFilePath, variables: variables })
}

export async function createClient(customConfig?: Config | null | undefined): Promise<Function> {
  const agent = await createAgent(customConfig)

  return async function performQuery(queryFilePath: string, variables: any = {}) {
    const instance = agent.post('/graphql').type('application/json')
    for (const key in variables) {
      variables[key] = await variables[key]
    }

    const call = () =>
      instance.send(query(queryFilePath, variables)).then((res: any) => ({
        ...res.body,
        status: res.status,
        headers: res.headers,
      }))
    return await call()
  }
}

// test helper for calling graphql queries
export async function test(query: string, variables?: any, customHeaders?: any) {
  clientInstance = clientInstance || createClient()
  return (await clientInstance)(query, variables, customHeaders)
}
