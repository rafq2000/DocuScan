import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { messages } = await req.json()

    // Usar la API key desde variables de entorno
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Aquí iría la lógica de procesamiento del chat
    // Por ahora retornamos una respuesta de ejemplo
    return NextResponse.json({
      choices: [
        {
          message: {
            role: "assistant",
            content: "Soy un asistente legal especializado en deudas y cobranzas en Chile. ¿En qué puedo ayudarte hoy?"
          }
        }
      ]
    })

  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json(
      { error: "Error processing chat request" },
      { status: 500 }
    )
  }
}
