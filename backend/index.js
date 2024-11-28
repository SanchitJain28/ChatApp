import express from 'express'
import main from "./Database.js";
import cors from "cors"
import { router as userRouter } from "./routes/user.js";
import { router as messageRouter } from './routes/message.js';
import { app ,server} from './socket/socket.js';
const port = 3001

// app.use(cors)
//lets fuck this app
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(messageRouter)
app.get('/', (req, res) => {
  res.send('Hey the chatApp is Runnning')
})


server.listen(port, () => {
  console.log(`Running the chatAPP at port ${port}`)
})
