import { FileWithContent } from '../../models/file-with-content';

export abstract class FileService {
    abstract uploadFile(file: File): Promise<number>;
    abstract downloadFile(id: number): Promise<FileWithContent | undefined>;
}
