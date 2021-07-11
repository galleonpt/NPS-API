import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async (): Promise<Connection>=>{
  //get all info from ormconfig
  const defaultOptions= await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? 'NPSTests' : defaultOptions.database
    })
  )
}