import jwt from "jsonwebtoken";
import express from 'express'
import * as dotenv from 'dotenv'
import { UserDocument } from "schemas/userSchema";

dotenv.config()

const secretKey = process.env.SECRET_KEY

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
    }
  }
}

interface JWTPayload {
  _id: string
}

// Create Token
export const generateToken = (user: UserDocument): string => {
  return jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' })
}

// Verify Token
export const verifyToken = (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
  ) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1]
    if(token) {
      const decodedToken = jwt.verify(token, secretKey) as JWTPayload
      req.userId = decodedToken._id
    }
    next()

  } catch {
    res.status(401).json({ message: 'Access Restricted. You need to log in.' })
  }
}