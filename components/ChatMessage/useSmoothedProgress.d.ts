import { Ref, WatchSource } from 'vue';

export declare const useSmoothedProgress: (progress: WatchSource<number | null | undefined>) => Readonly<Ref<number | null>>;
