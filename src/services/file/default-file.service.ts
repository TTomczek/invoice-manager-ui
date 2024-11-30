import { Injectable } from '@angular/core';
import { FileService } from './file.service';
import { FileDTO } from '@invoice-manager/api-typescript-angular-client';
import { FileWithContent } from '../../models/file-with-content';

@Injectable({
  providedIn: 'root'
})
export class DefaultFileService implements FileService {
    private files: FileDTO[] = [];

    async uploadFile(file: File): Promise<number> {
        const id = this.files.length + Math.random() * 10;
        this.files.push({
            id: id,
            fileName: file.name,
            data: file,
        });
        return Promise.resolve(id);
    }

    async downloadFile(fileId: number): Promise<FileWithContent | undefined> {
        const file = this.files.find(file => file.id === fileId);
        if (!file) {
            return undefined;
        }
        return {
            id: file.id,
            name: file?.fileName ?? '',
            content: await file.data?.text() ?? '',
        }
    }

}
