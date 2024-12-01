import { inject, Injectable } from '@angular/core';
import { FileService } from './file.service';
import { FilesService } from '@invoice-manager/api-typescript-angular-client';
import { FileConverterService } from '../../models/converter/file-converter.service';
import { lastValueFrom } from 'rxjs';
import { FileWithContent } from '../../models/file-with-content';

@Injectable({
    providedIn: 'root',
})
export class FileImplService implements FileService {
    private filesService: FilesService = inject(FilesService);
    private fileConverter: FileConverterService = inject(FileConverterService);

    async uploadFile(file: File): Promise<number> {
        return await lastValueFrom(this.filesService.uploadFile(undefined, file.name, file));
    }

    async downloadFile(fileId: number): Promise<FileWithContent | undefined> {
        const file = await lastValueFrom(this.filesService.downloadFileById(fileId));
        if (file) {
            return this.fileConverter.toEntity(file);
        }
        return undefined;
    }
}
