import { IPdfCacheLease, TPdfLoadingTask } from './interface/pdf-cache';

export declare const MAX_PDF_DOCUMENTS = 4;
export declare const MAX_PARALLEL_PDF_LOADS = 2;
/** Ограничивает документы и workers, сохраняя используемые PDF до освобождения. */
export declare class CachePdf {
    private entries;
    private queue;
    private activeLoads;
    private liveDocuments;
    /** Возвращает общий документ и право использовать его до вызова release. */
    acquire(key: string, load: () => TPdfLoadingTask | Promise<TPdfLoadingTask>): IPdfCacheLease;
    /** Создаёт заявку без запуска сети или worker до появления свободного места. */
    private createEntry;
    /** Запускает очередь в пределах общего числа документов и загрузок. */
    private pump;
    /** Загружает один PDF; отменённый запрос освобождает worker до следующего. */
    private loadEntry;
    /** Удаляет только свою заявку, не затрагивая повторный запрос того же URL. */
    private forget;
    /** Уничтожает PDF вместе с внутренним кэшем страниц и его worker. */
    private destroy;
    /** Освобождает слот только после завершения удаления неиспользуемого документа. */
    private dispose;
}
declare const cachePdf: CachePdf;
export default cachePdf;
