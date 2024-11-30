import { Injectable } from '@angular/core';
import { FileWithContent } from '../file-with-content';
import { FileDTO } from '@invoice-manager/api-typescript-angular-client';

@Injectable({
    providedIn: 'root'
})
export class FileConverterService {
    async toEntity(file: FileDTO): Promise<FileWithContent> {
        const fileContent = await file.data?.text();
        return {
            id: file.id,
            name: file.fileName ?? '',
            content: fileContent ?? '',
        };
    }

    async toDtoFromFile(file: File): Promise<FileDTO> {
        return {
            id: undefined,
            fileName: file.name,
            data: file,
        };
    }
}
