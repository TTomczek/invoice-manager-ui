import { Injectable } from '@angular/core';
import { FileWithContent } from '../file-with-content';
import { DownloadFileDTO } from '@invoice-manager/api-typescript-angular-client';

@Injectable({
    providedIn: 'root'
})
export class FileConverterService {
    async toEntity(file: DownloadFileDTO): Promise<FileWithContent> {
        return {
            id: file.id,
            name: file.fileName ?? '',
            content: file.data ??'',
        };
    }
}
