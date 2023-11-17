import mongoose from "mongoose";
import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8888
const SERVER_URI = `http://localhost:${PORT}/`

app.listen(PORT, () => console.log('Server running on ' + SERVER_URI))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err: Error) => console.log(err))
