import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { v4 } from "uuid";
import { GenericException, IStorageService } from "../domain";
import { logger } from ".";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class StorageAWS implements IStorageService {
  private static _instance: StorageAWS;
  private s3: S3;
  private bucketName: string;

  constructor(bucketName?: string, region?: string) {
    this.s3 = new S3({
      region: region === undefined ? process.env.AWS_REGION : region,
      apiVersion: "latest",
    });

    if (bucketName) {
      this.bucketName = bucketName;
    }
  }

  static getInstance(bucketName: string, region?: string): StorageAWS {
    if (!StorageAWS._instance) {
      StorageAWS._instance = new StorageAWS(bucketName, region);
    }
    return StorageAWS._instance;
  }

  setBucketName(bucketName: string): IStorageService {
    this.bucketName = bucketName;

    return this;
  }

  async downloadFile(fileName: string): Promise<string> {
    console.log("fileName", fileName);
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    // Genera un comando para obtener el objeto
    const command = new GetObjectCommand(params);

    // Genera la URL firmada con un tiempo de expiración (por ejemplo, 1 hora)
    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  }

  async uploadFile(file: any): Promise<string> {
    const key: string = this.generateNameFile(file); // Genera un nombre único para el archivo

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: fs.createReadStream(file.tempFilePath), // Lee el archivo desde su ubicación temporal
      ContentType: file.mimetype, // Agrega el tipo de contenido para mayor precisión
    };

    try {
      // Subir el archivo a S3 usando PutObjectCommand
      await this.s3.send(new PutObjectCommand(params));

      // Eliminar el archivo temporal después de la subida
      fs.unlink(file.tempFilePath, (unlinkErr) => {
        if (unlinkErr) {
          logger.error("Error al eliminar el archivo temporal:", unlinkErr);
        } else {
          logger.info("Archivo temporal eliminado correctamente.");
        }
      });

      return key; // Devuelve el nombre del archivo en S3
    } catch (error) {
      logger.error("Error al subir el archivo a S3:", error);
      throw new GenericException("Error al subir el archivo a S3.");
    }
  }

  async deleteFile(path: string) {
    const params = {
      Bucket: this.bucketName,
      Key: path,
    };
    try {
      await this.s3.deleteObject(params);
    } catch (e) {
      logger.error("Error al eliminar el archivo de S3:", e);
      throw new GenericException("Error al eliminar el archivo de S3:");
    }
  }

  private generateNameFile(file: any): string {
    const currencyDate: Date = new Date();
    const year: number = currencyDate.getFullYear();
    const month: number = currencyDate.getMonth() + 1;

    const extension = file.name.split(".").pop();
    const newFileName = `${v4()}.${extension}`;

    return `${year}/${month}/${newFileName}`;
  }
}
