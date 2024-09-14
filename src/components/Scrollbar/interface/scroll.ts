export interface IScrollbarProps {
  options?: Record<string, unknown>;
  tag?: string | undefined;
  class?: unknown;
  style?: unknown;

  thrumbStyle?: {
    y?: {
      background: string;
      width?: string;
    };
    x?: {
      background: string;
      width?: string;
    };
  };

  railStyle?: {
    y?: {
      background: string;
    };
    x?: {
      background: string;
    };
  };
}
