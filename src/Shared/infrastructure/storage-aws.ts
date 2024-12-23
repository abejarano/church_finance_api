import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { v4 } from "uuid";
import { GenericException, IStorageService } from "../domain";
import { logger } from ".";

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
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Expires: 3600, // Tiempo en segundos que el enlace será válido (1 hora en este ejemplo)
    };

    //return this.s3.getSignedUrl("getObject", params);
    const b = await this.s3.getObject(params);

    return b.Body.transformToString();
  }

  async uploadFile(file: any): Promise<string> {
    const key: string = this.generateNameFIle(file);

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.data,
    };
    try {
      //const data = await this.s3.upload(params).promise();

      await this.s3.send(new PutObjectCommand(params));

      fs.unlink(file.tempFilePath, (unlinkErr) => {
        if (unlinkErr) {
          logger.info("Error al eliminar el archivo temporal:", unlinkErr);
        } else {
          logger.info("Archivo temporal eliminado");
        }
      });
      return key;
    } catch (e) {
      console.error("Error al subir el archivo a S3:", e);
      throw new GenericException("Error al subir el archivo a S3:");
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

  private generateNameFIle(file: any): string {
    const currencyDate: Date = new Date();
    const year: number = currencyDate.getFullYear();
    const month: number = currencyDate.getMonth() + 1;

    const extension = file.name.split(".").pop();
    const newFileName = `${v4()}.${extension}`;

    return `${year}/${month}/${newFileName}`;
  }
}
