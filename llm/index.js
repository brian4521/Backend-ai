import express from "express"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"
dotenv.config()

const app = express()
const PORT= 5000

app.use(express.json())

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
})


app.post("/ask-ai",async(req,res)=>{
  const {input} = req.body
    const response = await ai.models.generateContent({
    model:"gemini-4-hydrogen",
    contents:input
  })

  return res.status(200).json({"ai":response.text})

})



app.get("/",(req,res)=>{
  console.log("hello its llm")
})


app.listen(PORT,()=>{
  console.log("server started")
})