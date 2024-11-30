import { inject, Injectable } from '@angular/core';
import { FileService } from './file.service';
import { FileDTO, FilesService } from '@invoice-manager/api-typescript-angular-client';
import { FileConverterService } from '../../models/converter/file-converter.service';
import { lastValueFrom } from 'rxjs';
import { FileWithContent } from '../../models/file-with-content';

@Injectable({
    providedIn: 'root'
})
export class FileImplService implements FileService {
        private filesService: FilesService = inject(FilesService);
        private fileConverter: FileConverterService = inject(FileConverterService);

        async uploadFile(file: File): Promise<number> {
            const fileDTO: FileDTO = await this.fileConverter.toDtoFromFile(file);
            return lastValueFrom(this.filesService.uploadFile(fileDTO));
        }

        downloadFile(fileId: number): Promise<FileWithContent | undefined> {
            return lastValueFrom(this.filesService.downloadFileById(fileId));
        }
}
