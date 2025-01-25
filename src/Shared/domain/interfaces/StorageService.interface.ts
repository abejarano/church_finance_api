export interface IStorageService {
  uploadFile(file: any): Promise<string>

  downloadFile(fileName: string): Promise<string>

  deleteFile(path: string): Promise<void>

  setBucketName(bucketName: string): IStorageService
}
