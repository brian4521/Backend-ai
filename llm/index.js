import express from "express"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
dotenv.config()

const app = express()
const PORT= 5000

app.use(express.json())

// const ai = new GoogleGenAI({
//   apiKey:process.env.GEMINI_API_KEY
// })


// app.post("/ask-ai",async(req,res)=>{
//   const {input} = req.body
//     const response = await ai.models.generateContent({
//     model:"gemini-4-hydrogen",
//     contents:[
//       {role:"system",
//        parts:[{text:"you are assistand and your name is avion"}]
//       },
//       {role:"user",
//        parts:[{text:input}]
//       }
//     ]
//   })

//   return res.status(200).json({"ai":response.text})

// })



const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    maxRetries: 2,
    // other params...
})



app.post("/ask-ai",async(req,res)=>{
  const {input} = req.body


 const response= await llm.invoke(input)

  return res.status(200).json({"ai":response.content})

})



// const aiMsg = await llm.invoke([
//     [
//         "system",
//         "You are a helpful assistant that translates English to French. Translate the user sentence.",
//     ],
//     ["human", "I love programming."],
// ])
// aiMsg

app.get("/",(req,res)=>{
  console.log("hello its llm")
})


app.listen(PORT,()=>{
  console.log("server started")
})