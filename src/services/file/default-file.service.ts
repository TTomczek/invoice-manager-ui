import { Injectable } from '@angular/core';
import { FileService } from './file.service';
import { FileWithContent } from '../../models/file-with-content';
import { DownloadFileDTO } from '@invoice-manager/api-typescript-angular-client';

@Injectable({
  providedIn: 'root'
})
export class DefaultFileService implements FileService {
    private files: DownloadFileDTO[] = [];

    async uploadFile(file: File): Promise<number> {
        const id = this.files.length + Math.random() * 10;
        this.files.push({
            id: id,
            fileName: file.name,
            data: await file.text(),
        });
        return Promise.resolve(id);
    }

    async downloadFile(fileId: number): Promise<FileWithContent | undefined> {
        const file = this.files.find(file => file.id === fileId);
        if (!file) {
            return Promise.reject('File not found');
        }
        return Promise.resolve({
            id: file.id,
            name: file?.fileName ?? '',
            content: file.data ?? '',
        });
    }

}
