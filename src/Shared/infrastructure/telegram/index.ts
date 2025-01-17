import axios from "axios"
import { IQueue } from "../../domain"

const chatId = "8046730073"

const telegramToken = "8027540511:AAFQQGGvL9q7pPGOOhKMCslYOZ0t9pTmoe8"

const TelegramSendMessage = async (message: string) => {
  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
    })

    if (response.status === 200) {
      console.log("Mensaje enviado correctamente.")
    }
  } catch (error) {
    console.error(
      "Error al enviar el mensaje:",
      error.response?.data || error.message
    )
  }
}

export class TelegramNotification implements IQueue {
  async handle(args: any): Promise<void> {
    await TelegramSendMessage(args.message)
  }
}
