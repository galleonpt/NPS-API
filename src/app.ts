import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'dotenv/config'
import { routes } from './routes'
import createConnection from "./database"
import { CustomException } from "./exceptions/CustomException"

createConnection()
const app= express()

app.use(express.json())
app.use(routes)


app.use((err:any, request:Request, response:Response, next:NextFunction)=>{
  //Custom error
  if(err instanceof CustomException){
    return response.status(err.status).json({
      error: err.message
    })
  }

  console.log(err)
  return response.status(500).json({
    message:"Something went wrong"
  })
})

export { app }