import { MongoClient } from "mongodb"

import { Logger } from "../../adapter"

export class MongoClientFactory {
  private static client: MongoClient | null = null // Almacena la instancia única de MongoClient
  private static logger = Logger("MongoClientFactory")

  /**
   * Obtiene o crea una instancia de MongoClient.
   * Reutiliza la conexión si ya existe.
   */
  static async createClient(): Promise<MongoClient> {
    if (!MongoClientFactory.client) {
      MongoClientFactory.client =
        await MongoClientFactory.createAndConnectClient()
    }

    return MongoClientFactory.client
  }

  /**
   * Cierra la conexión a MongoDB.
   */
  static async closeClient(): Promise<void> {
    if (MongoClientFactory.client) {
      await MongoClientFactory.client.close()
      MongoClientFactory.client = null // Limpia la instancia
      this.logger.info("MongoDB connection closed.")
    }
  }

  /**
   * Crea y conecta una nueva instancia de MongoClient.
   */
  private static async createAndConnectClient(): Promise<MongoClient> {
    const MONGO_PASS = process.env.MONGO_PASS
    const MONGO_USER = process.env.MONGO_USER
    const MONGO_DB = process.env.MONGO_DB
    const MONGO_SERVER = process.env.MONGO_SERVER

    if (!MONGO_PASS || !MONGO_USER || !MONGO_DB || !MONGO_SERVER) {
      throw new Error("Missing MongoDB environment variables.")
    }

    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}/${MONGO_DB}?retryWrites=true&w=majority`

    this.logger.info("Connecting to MongoDB")

    const client = new MongoClient(uri, { ignoreUndefined: true })

    try {
      await client.connect()
      this.logger.info("Connected to MongoDB successfully.")
      return client
    } catch (error) {
      this.logger.error("Failed to connect to MongoDB:", error)
      throw error
    }
  }
}
