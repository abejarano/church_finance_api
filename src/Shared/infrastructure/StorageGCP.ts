import { Storage } from "@google-cloud/storage";
import * as fs from "fs";
import { v4 } from "uuid";
import { GenericException, IStorageService } from "../domain";
import { logger } from ".";

export class StorageGCP implements IStorageService {
  private static _instance: StorageGCP;
  private storage: Storage;
  private bucketName: string;

  constructor(bucketName?: string) {
    this.storage = new Storage();

    if (bucketName) {
      this.bucketName = bucketName;
    }

    this.configureBucketCors(bucketName).catch(console.error);
  }

  static getInstance(bucketName: string): StorageGCP {
    if (!StorageGCP._instance) {
      StorageGCP._instance = new StorageGCP(bucketName);
    }
    return StorageGCP._instance;
  }

  async configureBucketCors(bucketName: string) {
    await this.storage.bucket(bucketName).setCorsConfiguration([
      {
        origin: ["*"], // O "http://localhost:61364" para pruebas locales
        responseHeader: ["Content-Type"],
        method: ["GET"],
        maxAgeSeconds: 3600,
      },
    ]);

    // console.log(`Bucket ${bucketName} was updated with a CORS config
    //   to allow ${method} requests from ${origin} sharing
    //   ${responseHeader} responses across origins`);
  }

  setBucketName(bucketName: string): IStorageService {
    this.bucketName = bucketName;
    return this;
  }

  /**
   * Return a signed URL for downloading a file
   * @param pathInFileStorage
   */
  async downloadFile(pathInFileStorage: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(pathInFileStorage);

      // Generate signed URL with expiration (1 hour)
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 3600 * 1000,
      });

      return url;
    } catch (error) {
      logger.error("Error generating signed URL:", error);
      throw new GenericException("Error generating signed URL.");
    }
  }

  /**
   * Upload a file to GCP Storage
   * @param file File to upload
   */
  async uploadFile(file: any): Promise<string> {
    const key: string = this.generateNameFile(file); // Generate a unique file name

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const gcsFile = bucket.file(key);

      // Create a writable stream to upload the file
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(file.tempFilePath)
          .pipe(
            gcsFile.createWriteStream({
              metadata: {
                contentType: file.mimetype,
              },
            }),
          )
          .on("error", (err) => {
            logger.error("Error uploading file to GCP Storage:", err);
            reject(
              new GenericException("Error uploading file to GCP Storage."),
            );
          })
          .on("finish", () => {
            logger.info("File uploaded successfully to GCP Storage.");
            resolve();
          });
      });

      // Delete the temporary file after upload
      fs.unlink(file.tempFilePath, (unlinkErr) => {
        if (unlinkErr) {
          logger.error("Error deleting temporary file:", unlinkErr);
        } else {
          logger.info("Temporary file deleted successfully.");
        }
      });

      return key; // Return the file name in GCP Storage
    } catch (error) {
      logger.error("Error uploading file to GCP Storage:", error);
      throw new GenericException("Error uploading file to GCP Storage.");
    }
  }

  /**
   * Delete a file from GCP Storage
   * @param path File path in GCP Storage
   */
  async deleteFile(path: string) {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(path);

      await file.delete();
      logger.info(`File ${path} deleted successfully from GCP Storage.`);
    } catch (error) {
      logger.error("Error deleting file from GCP Storage:", error);
      throw new GenericException("Error deleting file from GCP Storage.");
    }
  }

  /**
   * Generate a unique file name
   * @param file
   */
  private generateNameFile(file: any): string {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;

    const extension = file.name.split(".").pop();
    const newFileName = `${v4()}.${extension}`;

    return `${year}/${month}/${newFileName}`;
  }
}
