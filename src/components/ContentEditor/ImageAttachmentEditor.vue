<template>
  <div class="image-attachment-editor">
    <div class="image-attachment-editor__header">
      <div class="image-attachment-editor__header-spacer" />
      <div class="image-attachment-editor__mode-tabs">
        <Tooltip hint="Обрезать" position="top-center" type="black">
          <Button
            :type="
              mode === 'crop' ? ButtonTypeEnum.secondary : ButtonTypeEnum.ghost
            "
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            @click="setMode('crop')"
          >
            <Icon :name="IconNameEnum.crop" :width="18" :height="18" />
          </Button>
        </Tooltip>
        <Tooltip hint="Рисовать" position="top-center" type="black">
          <Button
            :type="
              mode === 'draw' ? ButtonTypeEnum.secondary : ButtonTypeEnum.ghost
            "
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            @click="setMode('draw')"
          >
            <Icon :name="IconNameEnum.imagePaint" :width="18" :height="18" />
          </Button>
        </Tooltip>
        <Tooltip hint="Текст" position="top-center" type="black">
          <Button
            :type="
              mode === 'text' ? ButtonTypeEnum.secondary : ButtonTypeEnum.ghost
            "
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            @click="setMode('text')"
          >
            <Icon :name="IconNameEnum.text" :width="18" :height="18" />
          </Button>
        </Tooltip>
        <Tooltip hint="Сброс" position="top-center" type="black">
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            @click="reset"
          >
            <Icon :name="IconNameEnum.reset" :width="18" :height="18" />
          </Button>
        </Tooltip>
      </div>
      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="image-attachment-editor__icon-button"
        @click="emit('close')"
      >
        <Icon :name="IconNameEnum.crossLarge" :width="18" :height="18" />
      </Button>
    </div>

    <div class="image-attachment-editor__stage-wrap">
      <div
        ref="stageRef"
        class="image-attachment-editor__stage"
        :class="`image-attachment-editor__stage--${mode}`"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerUp"
      >
        <canvas ref="canvasRef" class="image-attachment-editor__canvas" />
        <div class="image-attachment-editor__text-layer">
          <div
            v-for="layer in textLayers"
            :key="layer.id"
            class="image-attachment-editor__text-box"
            :class="{
              'image-attachment-editor__text-box--selected':
                layer.id === selectedTextLayerId
            }"
            :style="getTextLayerStyle(layer)"
            @pointerdown.stop="handleTextBoxPointerDown($event, layer)"
            @dblclick.stop="startTextLayerEditing($event, layer)"
          >
            <textarea
              :data-text-layer-id="layer.id"
              :value="layer.text"
              :readonly="layer.id !== editingTextLayerId"
              rows="1"
              placeholder="Текст"
              spellcheck="false"
              class="image-attachment-editor__text-item"
              :class="{
                'image-attachment-editor__text-item--editing':
                  layer.id === editingTextLayerId
              }"
              @input="updateTextLayerText($event, layer)"
              @blur="commitTextLayerChange"
              @pointerdown.stop="handleTextPointerDown($event, layer)"
            />
            <template v-if="layer.id === selectedTextLayerId">
              <button
                v-for="handle in textHandles"
                :key="handle"
                type="button"
                class="image-attachment-editor__text-handle"
                :class="`image-attachment-editor__text-handle--${handle}`"
                :aria-label="`Изменить текстовое поле: ${handle}`"
                @pointerdown.stop="
                  handleTextResizePointerDown($event, layer, handle)
                "
              />
            </template>
          </div>
        </div>
        <div
          v-if="mode === 'crop' && cropRect"
          class="image-attachment-editor__crop-box"
          :style="cropBoxStyle"
          @pointerdown.stop="handleCropPointerDown($event, 'move')"
        >
          <button
            v-for="handle in cropHandles"
            :key="handle"
            type="button"
            class="image-attachment-editor__crop-handle"
            :class="`image-attachment-editor__crop-handle--${handle}`"
            :aria-label="`Изменить область обрезки: ${handle}`"
            @pointerdown.stop="handleCropPointerDown($event, handle)"
          />
        </div>
      </div>
    </div>

    <div class="image-attachment-editor__footer">
      <div class="image-attachment-editor__history">
        <Tooltip hint="Отменить" position="top-center" type="black">
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            :disabled="!canUndo"
            @click="undo"
          >
            <Icon :name="IconNameEnum.undo" :width="18" :height="18" />
          </Button>
        </Tooltip>
        <Tooltip hint="Вернуть" position="top-center" type="black">
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="image-attachment-editor__icon-button"
            :disabled="!canRedo"
            @click="redo"
          >
            <Icon :name="IconNameEnum.redo" :width="18" :height="18" />
          </Button>
        </Tooltip>
      </div>

      <div class="image-attachment-editor__settings">
        <template v-if="mode === 'draw' || mode === 'text'">
          <label class="image-attachment-editor__range-label">
            Размер
            <input
              v-if="mode === 'draw'"
              v-model.number="brushSize"
              type="range"
              min="2"
              max="36"
              :style="brushRangeStyle"
            />
            <input
              v-else
              v-model.number="activeTextSize"
              type="range"
              min="18"
              max="72"
              :style="textRangeStyle"
              @change="commitTextLayerChange"
            />
          </label>
          <div class="image-attachment-editor__palette">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              type="button"
              class="image-attachment-editor__swatch"
              :class="{
                'image-attachment-editor__swatch--active':
                  activeColorToken === color.value,
                'image-attachment-editor__swatch--light':
                  color.value === '--white'
              }"
              :style="{ backgroundColor: getColorPreview(color.value) }"
              :aria-label="color.label"
              @click="setActiveColor(color.value)"
            >
              <span
                v-if="activeColorToken === color.value"
                class="image-attachment-editor__swatch-check"
              >
                <SwatchCheckboxIcon />
              </span>
            </button>
            <label
              class="image-attachment-editor__swatch image-attachment-editor__swatch--add"
              :class="{
                'image-attachment-editor__swatch--active': isCustomColorActive
              }"
              aria-label="Добавить цвет"
              @pointerdown="prepareCustomColorPicker"
            >
              <span
                v-if="isCustomColorActive"
                class="image-attachment-editor__swatch-check"
              >
                <SwatchCheckboxIcon />
              </span>
              <Icon :name="IconNameEnum.colorPicker" />
              <input
                type="color"
                class="image-attachment-editor__color-input"
                :value="customColorValue"
                aria-label="Выбрать цвет"
                @blur="blockStageAfterCustomColorPicker"
                @input="updateCustomColor"
                @change="saveCustomColor"
              />
            </label>
          </div>
        </template>
      </div>

      <div class="image-attachment-editor__actions">
        <Button
          :type="ButtonTypeEnum.primary"
          :size="SizesEnum.small"
          class="image-attachment-editor__apply-button"
          @click="applyImage"
        >
          Применить
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { IconNameEnum } from '../Icon/enum/enum';
import { SizesEnum } from '@/common/sizes';

const SwatchCheckboxIcon = defineComponent({
  name: 'SwatchCheckboxIcon',
  setup: () => () =>
    h(
      'svg',
      {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': 'true'
      },
      [
        h('path', {
          d: 'M12.3213 4.2998C12.5972 4.03026 13.04 4.03361 13.3115 4.30762C13.5821 4.58257 13.5789 5.02451 13.3047 5.2959L6.81738 11.6973C6.68656 11.8264 6.51023 11.8998 6.32617 11.9004H6.31836C6.13075 11.8996 5.95062 11.8231 5.81934 11.6895L2.68555 8.44824L2.68164 8.44434C2.41367 8.1653 2.42264 7.72176 2.70215 7.4541C2.98181 7.18627 3.42694 7.19551 3.69531 7.47461V7.47559L6.26562 10.1309L6.33594 10.2041L6.4082 10.1328L12.3213 4.2998Z',
          fill: 'var(--white)',
          stroke: 'var(--text-neutral-color)',
          'stroke-width': '0.8'
        })
      ]
    )
});

type EditorMode = 'crop' | 'draw' | 'text';

interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type CropHandle =
  | 'move'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left';
type ResizeHandle = Exclude<CropHandle, 'move'>;

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
  colorToken: string;
}

interface ColorOption {
  label: string;
  value: string;
}

interface EditorSnapshot {
  image: string;
  textLayers: TextLayer[];
}

const props = defineProps<{
  file: File;
}>();

const emit = defineEmits<{
  (event: 'apply', file: File): void;
  (event: 'close'): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stageRef = ref<HTMLDivElement | null>(null);
const mode = ref<EditorMode>('crop');
const activeColorToken = ref('--text-color');
const customColorValue = ref('#000000');
const lastCustomColor = ref<string | null>(null);
const brushSize = ref(8);
const textSize = ref(34);
const textLayers = ref<TextLayer[]>([]);
const selectedTextLayerId = ref<string | null>(null);
const editingTextLayerId = ref<string | null>(null);
const cropRect = ref<CropRect | null>(null);
const cropStart = ref<{ x: number; y: number } | null>(null);
const isDrawing = ref(false);
const history = ref<EditorSnapshot[]>([]);
const historyIndex = ref(-1);
const originalSnapshot = ref<EditorSnapshot | null>(null);
const canvasSize = ref({ width: 0, height: 0 });
const displayScale = ref(1);
let activeObjectUrl = '';
let textLayerIdCounter = 0;
let resizeObserver: ResizeObserver | null = null;
let ignoreStagePointerDownUntil = 0;
let deferredDrawingStart: {
  pointerId: number;
  point: { x: number; y: number };
} | null = null;
let cropInteraction: {
  handle: CropHandle;
  startPoint: { x: number; y: number };
  startRect: CropRect;
} | null = null;
let textInteraction: {
  id: string;
  handle: CropHandle;
  startPoint: { x: number; y: number };
  startLayer: TextLayer;
  moved: boolean;
} | null = null;
let lastTextPointerDown: {
  id: string;
  time: number;
  point: { x: number; y: number };
} | null = null;

const MIN_CROP_SIZE = 20;
const TEXT_EDIT_DOUBLE_CLICK_DELAY = 350;
const TEXT_EDIT_DOUBLE_CLICK_DISTANCE = 8;
const DEFERRED_DRAW_DISTANCE = 3;
const cropHandles: CropHandle[] = [
  'top-left',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left'
];
const textHandles: ResizeHandle[] = [
  'top-left',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left'
];
const MIN_TEXT_BOX_WIDTH = 50;
const MIN_TEXT_BOX_HEIGHT = 24;

const defaultColorOptions: ColorOption[] = [
  { label: 'Белый', value: '--white' },
  { label: 'Черный', value: '--text-color' },
  { label: 'Красный', value: '--error-color' },
  { label: 'Зеленый', value: '--success-color' }
];

const colorOptions = computed<ColorOption[]>(() => defaultColorOptions);

const getRangeStyle = (value: number, min: number, max: number) => {
  const progress = Math.min(
    Math.max(((Number(value) - min) / (max - min)) * 100, 0),
    100
  );

  return {
    '--range-progress': `${progress}%`
  };
};

const brushRangeStyle = computed(() => getRangeStyle(brushSize.value, 2, 36));
const textRangeStyle = computed(() =>
  getRangeStyle(activeTextSize.value, 18, 72)
);
const isCustomColorActive = computed(
  () => !activeColorToken.value.startsWith('--')
);

const selectedTextLayer = computed(
  () =>
    textLayers.value.find(layer => layer.id === selectedTextLayerId.value) ||
    null
);
const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(() => historyIndex.value < history.value.length - 1);

const activeTextSize = computed({
  get: () => selectedTextLayer.value?.fontSize ?? textSize.value,
  set: value => {
    const normalizedSize = Number(value) || textSize.value;
    const selectedLayer = selectedTextLayer.value;

    if (!selectedLayer) {
      textSize.value = normalizedSize;
      return;
    }

    selectedLayer.fontSize = normalizedSize;
  }
});

const cropBoxStyle = computed(() => {
  const rect = cropRect.value;

  if (!rect) {
    return {};
  }

  return {
    left: `${rect.x * displayScale.value}px`,
    top: `${rect.y * displayScale.value}px`,
    width: `${rect.width * displayScale.value}px`,
    height: `${rect.height * displayScale.value}px`
  };
});

const outputMimeType = computed(() => {
  if (['image/jpeg', 'image/png', 'image/webp'].includes(props.file.type)) {
    return props.file.type;
  }

  return 'image/png';
});

const cloneTextLayers = (layers: TextLayer[]): TextLayer[] =>
  layers.map(layer => ({ ...layer }));

const isCssVariableColor = (value: string): boolean => value.startsWith('--');

const getColorPreview = (value: string): string =>
  isCssVariableColor(value) ? `var(${value})` : value;

const getResolvedColor = (value = activeColorToken.value): string => {
  if (!isCssVariableColor(value)) {
    return value;
  }

  const cssValue = getComputedStyle(document.documentElement)
    .getPropertyValue(value)
    .trim();
  const bodyColor = getComputedStyle(document.body).color;

  return cssValue || bodyColor;
};

const blockStageAfterCustomColorPicker = (): void => {
  ignoreStagePointerDownUntil = Date.now() + 450;
};

const prepareCustomColorPicker = (): void => {
  ignoreStagePointerDownUntil = Date.now() + 450;
};

const updateCustomColor = (event: Event): void => {
  const color = (event.target as HTMLInputElement).value.toLowerCase();

  if (!color) {
    return;
  }

  customColorValue.value = color;
  lastCustomColor.value = color;
  setActiveColor(color);
};

const saveCustomColor = (event: Event): void => {
  updateCustomColor(event);
  blockStageAfterCustomColorPicker();
};

const getEditorFileName = (): string => {
  const dotIndex = props.file.name.lastIndexOf('.');
  const baseName =
    dotIndex > 0 ? props.file.name.slice(0, dotIndex) : props.file.name;
  const extension =
    outputMimeType.value === 'image/jpeg'
      ? 'jpg'
      : outputMimeType.value === 'image/webp'
        ? 'webp'
        : 'png';

  return `${baseName || 'image'}-edited.${extension}`;
};

const updateCanvasMetrics = (): void => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  const rect = canvas.getBoundingClientRect();

  canvasSize.value = {
    width: canvas.width,
    height: canvas.height
  };
  displayScale.value = canvas.width > 0 ? rect.width / canvas.width : 1;
};

const getCanvasPoint = (event: PointerEvent) => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return null;
  }

  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

  return {
    x: Math.min(Math.max(x, 0), canvas.width),
    y: Math.min(Math.max(y, 0), canvas.height)
  };
};

const getTextLayerStyle = (layer: TextLayer) => ({
  left: `${layer.x * displayScale.value}px`,
  top: `${layer.y * displayScale.value}px`,
  color: layer.color,
  width: `${layer.width}px`,
  height: `${layer.height}px`,
  fontSize: `${layer.fontSize}px`
});

const getCanvasSizeFromDisplaySize = (size: number): number =>
  size / Math.max(displayScale.value, 0.01);

const getDisplaySizeFromCanvasSize = (size: number): number =>
  size * displayScale.value;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const normalizeCropRect = (rect: CropRect): CropRect => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return rect;
  }

  const width = clamp(rect.width, MIN_CROP_SIZE, canvas.width);
  const height = clamp(rect.height, MIN_CROP_SIZE, canvas.height);
  const x = clamp(rect.x, 0, canvas.width - width);
  const y = clamp(rect.y, 0, canvas.height - height);

  return { x, y, width, height };
};

const normalizeTextLayerBox = (layer: TextLayer): TextLayer => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return layer;
  }

  const maxWidth = Math.max(
    MIN_TEXT_BOX_WIDTH,
    getDisplaySizeFromCanvasSize(canvas.width - layer.x)
  );
  const maxHeight = Math.max(
    MIN_TEXT_BOX_HEIGHT,
    getDisplaySizeFromCanvasSize(canvas.height - layer.y)
  );
  const width = clamp(layer.width, MIN_TEXT_BOX_WIDTH, maxWidth);
  const height = clamp(layer.height, MIN_TEXT_BOX_HEIGHT, maxHeight);
  const x = clamp(
    layer.x,
    0,
    canvas.width - getCanvasSizeFromDisplaySize(width)
  );
  const y = clamp(
    layer.y,
    0,
    canvas.height - getCanvasSizeFromDisplaySize(height)
  );

  return {
    ...layer,
    x,
    y,
    width,
    height
  };
};

const getResizedTextLayer = (
  handle: ResizeHandle,
  point: { x: number; y: number },
  startPoint: { x: number; y: number },
  startLayer: TextLayer
): TextLayer => {
  const deltaX = point.x - startPoint.x;
  const deltaY = point.y - startPoint.y;
  const deltaDisplayX = getDisplaySizeFromCanvasSize(deltaX);
  const deltaDisplayY = getDisplaySizeFromCanvasSize(deltaY);
  const nextLayer = { ...startLayer };

  if (handle.includes('left')) {
    nextLayer.x = startLayer.x + deltaX;
    nextLayer.width = startLayer.width - deltaDisplayX;
  }

  if (handle.includes('right')) {
    nextLayer.width = startLayer.width + deltaDisplayX;
  }

  if (handle.includes('top')) {
    nextLayer.y = startLayer.y + deltaY;
    nextLayer.height = startLayer.height - deltaDisplayY;
  }

  if (handle.includes('bottom')) {
    nextLayer.height = startLayer.height + deltaDisplayY;
  }

  if (nextLayer.width < MIN_TEXT_BOX_WIDTH && handle.includes('left')) {
    nextLayer.x =
      startLayer.x +
      getCanvasSizeFromDisplaySize(startLayer.width - MIN_TEXT_BOX_WIDTH);
  }

  if (nextLayer.height < MIN_TEXT_BOX_HEIGHT && handle.includes('top')) {
    nextLayer.y =
      startLayer.y +
      getCanvasSizeFromDisplaySize(startLayer.height - MIN_TEXT_BOX_HEIGHT);
  }

  return normalizeTextLayerBox(nextLayer);
};

const getResizedCropRect = (
  handle: CropHandle,
  point: { x: number; y: number },
  startRect: CropRect
): CropRect => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return startRect;
  }

  const left = startRect.x;
  const top = startRect.y;
  const right = startRect.x + startRect.width;
  const bottom = startRect.y + startRect.height;
  let nextLeft = left;
  let nextTop = top;
  let nextRight = right;
  let nextBottom = bottom;

  if (handle.includes('left')) {
    nextLeft = clamp(point.x, 0, right - MIN_CROP_SIZE);
  }

  if (handle.includes('right')) {
    nextRight = clamp(point.x, left + MIN_CROP_SIZE, canvas.width);
  }

  if (handle.includes('top')) {
    nextTop = clamp(point.y, 0, bottom - MIN_CROP_SIZE);
  }

  if (handle.includes('bottom')) {
    nextBottom = clamp(point.y, top + MIN_CROP_SIZE, canvas.height);
  }

  return normalizeCropRect({
    x: nextLeft,
    y: nextTop,
    width: nextRight - nextLeft,
    height: nextBottom - nextTop
  });
};

const drawImageToCanvas = async (source: string): Promise<void> => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  const image = new Image();

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Не удалось открыть изображение'));
    image.src = source;
  });

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  await nextTick();
  updateCanvasMetrics();
};

const getImageSnapshot = (): string => {
  const canvas = canvasRef.value;

  return canvas?.toDataURL(outputMimeType.value, 0.92) || '';
};

const getSnapshot = (): EditorSnapshot | null => {
  const image = getImageSnapshot();

  if (!image) {
    return null;
  }

  return {
    image,
    textLayers: cloneTextLayers(textLayers.value)
  };
};

const pushHistory = (): void => {
  const snapshot = getSnapshot();

  if (!snapshot) {
    return;
  }

  const lastSnapshot = history.value[historyIndex.value];

  if (
    lastSnapshot &&
    JSON.stringify(lastSnapshot) === JSON.stringify(snapshot)
  ) {
    return;
  }

  history.value = history.value.slice(0, historyIndex.value + 1);
  history.value.push(snapshot);
  historyIndex.value = history.value.length - 1;
};

const restoreSnapshot = async (
  snapshot: EditorSnapshot | null
): Promise<void> => {
  if (!snapshot) {
    return;
  }

  await drawImageToCanvas(snapshot.image);
  textLayers.value = cloneTextLayers(snapshot.textLayers);

  if (
    selectedTextLayerId.value &&
    !textLayers.value.some(layer => layer.id === selectedTextLayerId.value)
  ) {
    selectedTextLayerId.value = null;
  }
};

const loadFile = async (): Promise<void> => {
  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
  }

  activeObjectUrl = URL.createObjectURL(props.file);
  await nextTick();
  await drawImageToCanvas(activeObjectUrl);
  textLayers.value = [];
  selectedTextLayerId.value = null;
  editingTextLayerId.value = null;
  originalSnapshot.value = getSnapshot();
  history.value = originalSnapshot.value ? [originalSnapshot.value] : [];
  historyIndex.value = history.value.length ? 0 : -1;
  cropRect.value = null;
  cropStart.value = null;
};

const blurActiveTextLayer = (): void => {
  const activeElement = document.activeElement;

  if (activeElement instanceof HTMLTextAreaElement) {
    activeElement.blur();
  }
};

const setMode = (nextMode: EditorMode): void => {
  mode.value = nextMode;
  cropStart.value = null;
  isDrawing.value = false;

  if (nextMode !== 'text') {
    blurActiveTextLayer();
    selectedTextLayerId.value = null;
    editingTextLayerId.value = null;
    lastTextPointerDown = null;
  }
};

const selectTextLayer = (layer: TextLayer): void => {
  selectedTextLayerId.value = layer.id;
  activeColorToken.value = layer.colorToken;
  textSize.value = layer.fontSize;
  setMode('text');
};

const focusTextLayer = (id: string): void => {
  nextTick(() => {
    const element = stageRef.value?.querySelector<HTMLTextAreaElement>(
      `[data-text-layer-id="${id}"]`
    );

    if (!element) {
      return;
    }

    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
  });
};

const setActiveColor = (token: string): void => {
  activeColorToken.value = token;

  if (!isCssVariableColor(token)) {
    customColorValue.value = token;
  }

  const selectedLayer = selectedTextLayer.value;

  if (!selectedLayer) {
    return;
  }

  selectedLayer.colorToken = token;
  selectedLayer.color = getResolvedColor(token);
  pushHistory();
};

const commitTextLayerChange = (): void => {
  const selectedLayer = selectedTextLayer.value;

  if (!selectedLayer) {
    editingTextLayerId.value = null;
    return;
  }

  selectedLayer.color = getResolvedColor(selectedLayer.colorToken);
  editingTextLayerId.value = null;
  pushHistory();
};

const startTextLayerEditing = (
  event: MouseEvent | PointerEvent,
  layer: TextLayer
): void => {
  event.preventDefault();
  selectTextLayer(layer);
  editingTextLayerId.value = layer.id;
  focusTextLayer(layer.id);
};

const isTextLayerDoubleClick = (
  layer: TextLayer,
  point: { x: number; y: number }
): boolean => {
  const lastPointerDown = lastTextPointerDown;

  if (!lastPointerDown || lastPointerDown.id !== layer.id) {
    return false;
  }

  const distance = Math.hypot(
    point.x - lastPointerDown.point.x,
    point.y - lastPointerDown.point.y
  );

  return (
    Date.now() - lastPointerDown.time <= TEXT_EDIT_DOUBLE_CLICK_DELAY &&
    distance <= getCanvasSizeFromDisplaySize(TEXT_EDIT_DOUBLE_CLICK_DISTANCE)
  );
};

const rememberTextPointerDown = (
  layer: TextLayer,
  point: { x: number; y: number }
): void => {
  lastTextPointerDown = {
    id: layer.id,
    time: Date.now(),
    point
  };
};

const addTextLayer = (point: { x: number; y: number }): void => {
  const layer: TextLayer = {
    id: `text-${Date.now()}-${textLayerIdCounter++}`,
    text: '',
    x: point.x,
    y: point.y,
    width: 160,
    height: 48,
    fontSize: textSize.value,
    color: getResolvedColor(),
    colorToken: activeColorToken.value
  };

  textLayers.value = [...textLayers.value, layer];
  selectTextLayer(layer);
  editingTextLayerId.value = layer.id;
  pushHistory();
  focusTextLayer(layer.id);
};

const updateTextLayerText = (event: Event, layer: TextLayer): void => {
  const element = event.target as HTMLTextAreaElement;

  layer.text = element.value;
  selectedTextLayerId.value = layer.id;
  pushHistory();
};

const handleTextPointerDown = (event: PointerEvent, layer: TextLayer): void => {
  event.stopPropagation();
  selectTextLayer(layer);
};

const handleTextBoxPointerDown = (
  event: PointerEvent,
  layer: TextLayer
): void => {
  const point = getCanvasPoint(event);

  if (!point) {
    return;
  }

  if (isTextLayerDoubleClick(layer, point)) {
    lastTextPointerDown = null;
    startTextLayerEditing(event, layer);
    return;
  }

  rememberTextPointerDown(layer, point);
  event.preventDefault();
  editingTextLayerId.value = null;
  stageRef.value?.setPointerCapture(event.pointerId);
  selectTextLayer(layer);
  textInteraction = {
    id: layer.id,
    handle: 'move',
    startPoint: point,
    startLayer: { ...layer },
    moved: false
  };
};

const handleTextResizePointerDown = (
  event: PointerEvent,
  layer: TextLayer,
  handle: ResizeHandle
): void => {
  const point = getCanvasPoint(event);

  if (!point) {
    return;
  }

  event.preventDefault();
  editingTextLayerId.value = null;
  stageRef.value?.setPointerCapture(event.pointerId);
  selectTextLayer(layer);
  textInteraction = {
    id: layer.id,
    handle,
    startPoint: point,
    startLayer: { ...layer },
    moved: false
  };
};

const handleCropPointerDown = (
  event: PointerEvent,
  handle: CropHandle
): void => {
  const point = getCanvasPoint(event);
  const rect = cropRect.value;

  if (!point || !rect) {
    return;
  }

  event.preventDefault();
  selectedTextLayerId.value = null;
  editingTextLayerId.value = null;
  stageRef.value?.setPointerCapture(event.pointerId);
  cropInteraction = {
    handle,
    startPoint: point,
    startRect: { ...rect }
  };
};

const startDrawing = (
  canvas: HTMLCanvasElement,
  point: { x: number; y: number }
): void => {
  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  isDrawing.value = true;
  context.strokeStyle = getResolvedColor();
  context.lineWidth = getCanvasSizeFromDisplaySize(brushSize.value);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.beginPath();
  context.moveTo(point.x, point.y);
};

const handlePointerDown = (event: PointerEvent): void => {
  const point = getCanvasPoint(event);
  const canvas = canvasRef.value;

  if (!point || !canvas) {
    return;
  }

  event.preventDefault();

  if (Date.now() <= ignoreStagePointerDownUntil) {
    ignoreStagePointerDownUntil = 0;
    selectedTextLayerId.value = null;
    editingTextLayerId.value = null;

    if (mode.value === 'draw') {
      stageRef.value?.setPointerCapture(event.pointerId);
      deferredDrawingStart = {
        pointerId: event.pointerId,
        point
      };
    }

    return;
  }

  stageRef.value?.setPointerCapture(event.pointerId);

  if (mode.value === 'crop') {
    selectedTextLayerId.value = null;
    editingTextLayerId.value = null;
    cropInteraction = null;
    cropStart.value = point;
    cropRect.value = { ...point, width: 0, height: 0 };
    return;
  }

  if (mode.value === 'text') {
    if (selectedTextLayerId.value) {
      selectedTextLayerId.value = null;
      editingTextLayerId.value = null;
      setMode('draw');
      startDrawing(canvas, point);
      return;
    }

    addTextLayer(point);
    return;
  }

  selectedTextLayerId.value = null;
  editingTextLayerId.value = null;

  if (mode.value !== 'draw') {
    return;
  }

  startDrawing(canvas, point);
};

const handlePointerMove = (event: PointerEvent): void => {
  const point = getCanvasPoint(event);
  const canvas = canvasRef.value;

  if (!point || !canvas) {
    return;
  }

  if (deferredDrawingStart?.pointerId === event.pointerId) {
    const distance = Math.hypot(
      point.x - deferredDrawingStart.point.x,
      point.y - deferredDrawingStart.point.y
    );

    if (distance < getCanvasSizeFromDisplaySize(DEFERRED_DRAW_DISTANCE)) {
      return;
    }

    startDrawing(canvas, deferredDrawingStart.point);
    deferredDrawingStart = null;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.lineTo(point.x, point.y);
    context.stroke();
    return;
  }

  if (cropInteraction) {
    const { handle, startPoint, startRect } = cropInteraction;

    if (handle === 'move') {
      cropRect.value = normalizeCropRect({
        ...startRect,
        x: startRect.x + point.x - startPoint.x,
        y: startRect.y + point.y - startPoint.y
      });
      return;
    }

    cropRect.value = getResizedCropRect(handle, point, startRect);
    return;
  }

  if (textInteraction) {
    const layer = textLayers.value.find(
      item => item.id === textInteraction?.id
    );

    if (!layer) {
      return;
    }

    const { handle, startPoint, startLayer } = textInteraction;
    const nextLayer =
      handle === 'move'
        ? normalizeTextLayerBox({
            ...startLayer,
            x: startLayer.x + point.x - startPoint.x,
            y: startLayer.y + point.y - startPoint.y
          })
        : getResizedTextLayer(handle, point, startPoint, startLayer);

    Object.assign(layer, nextLayer);
    textInteraction.moved = true;
    lastTextPointerDown = null;
    return;
  }

  if (mode.value === 'crop' && cropStart.value) {
    const x = Math.min(cropStart.value.x, point.x);
    const y = Math.min(cropStart.value.y, point.y);
    const width = Math.abs(point.x - cropStart.value.x);
    const height = Math.abs(point.y - cropStart.value.y);

    cropRect.value = { x, y, width, height };
    return;
  }

  if (!isDrawing.value || mode.value !== 'draw') {
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  context.lineTo(point.x, point.y);
  context.stroke();
};

const handlePointerUp = (event: PointerEvent): void => {
  stageRef.value?.releasePointerCapture(event.pointerId);
  cropStart.value = null;

  if (deferredDrawingStart?.pointerId === event.pointerId) {
    deferredDrawingStart = null;
    return;
  }

  if (cropInteraction) {
    cropInteraction = null;
    return;
  }

  if (textInteraction) {
    if (textInteraction.moved) {
      pushHistory();
    }

    textInteraction = null;
    return;
  }

  if (!isDrawing.value) {
    return;
  }

  isDrawing.value = false;
  pushHistory();
};

const undo = async (): Promise<void> => {
  if (!canUndo.value) {
    return;
  }

  historyIndex.value -= 1;
  cropRect.value = null;
  editingTextLayerId.value = null;
  await restoreSnapshot(history.value[historyIndex.value]);
};

const redo = async (): Promise<void> => {
  if (!canRedo.value) {
    return;
  }

  historyIndex.value += 1;
  cropRect.value = null;
  editingTextLayerId.value = null;
  await restoreSnapshot(history.value[historyIndex.value]);
};

const reset = async (): Promise<void> => {
  if (!originalSnapshot.value) {
    return;
  }

  await restoreSnapshot(originalSnapshot.value);
  history.value = [originalSnapshot.value];
  historyIndex.value = 0;
  cropRect.value = null;
  selectedTextLayerId.value = null;
  editingTextLayerId.value = null;
};

const renderOutputCanvas = (): HTMLCanvasElement | null => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return null;
  }

  const outputCanvas = document.createElement('canvas');
  const context = outputCanvas.getContext('2d');

  if (!context) {
    return null;
  }

  outputCanvas.width = canvas.width;
  outputCanvas.height = canvas.height;
  context.drawImage(canvas, 0, 0);

  textLayers.value.forEach(layer => {
    const text = layer.text.trim();

    if (!text) {
      return;
    }

    const fontSize = getCanvasSizeFromDisplaySize(layer.fontSize);
    const maxWidth = getCanvasSizeFromDisplaySize(Math.max(layer.width - 8, 1));
    const lineHeight = fontSize * 1.15;

    context.fillStyle = layer.color;
    context.font = `600 ${fontSize}px Inter, sans-serif`;
    context.textBaseline = 'top';
    getWrappedTextLines(context, text, maxWidth).forEach((line, index) => {
      context.fillText(line, layer.x, layer.y + index * lineHeight);
    });
  });

  return outputCanvas;
};

const getWrappedTextLines = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const lines: string[] = [];

  text.split('\n').forEach(paragraph => {
    const words = paragraph.split(' ');
    let currentLine = '';

    words.forEach(word => {
      const nextLine = currentLine ? `${currentLine} ${word}` : word;

      if (context.measureText(nextLine).width <= maxWidth || !currentLine) {
        currentLine = nextLine;
        return;
      }

      lines.push(currentLine);
      currentLine = word;
    });

    lines.push(currentLine);
  });

  return lines;
};

const applyImage = (): void => {
  const outputCanvas = renderOutputCanvas();

  if (!outputCanvas) {
    return;
  }

  outputCanvas.toBlob(
    blob => {
      if (!blob) {
        return;
      }

      emit(
        'apply',
        new File([blob], getEditorFileName(), {
          type: outputMimeType.value,
          lastModified: Date.now()
        })
      );
    },
    outputMimeType.value,
    0.92
  );
};

const removeSelectedTextLayer = (): void => {
  if (!selectedTextLayerId.value) {
    return;
  }

  textLayers.value = textLayers.value.filter(
    layer => layer.id !== selectedTextLayerId.value
  );
  selectedTextLayerId.value = null;
  editingTextLayerId.value = null;
  pushHistory();
};

const handleKeydown = (event: KeyboardEvent): void => {
  const isModifier = event.ctrlKey || event.metaKey;
  const isEditingText =
    !!editingTextLayerId.value && event.target instanceof HTMLTextAreaElement;
  const code = event.code;

  if (isModifier && code === 'KeyZ') {
    event.preventDefault();
    void (event.shiftKey ? redo() : undo());
    return;
  }

  if (isModifier && code === 'KeyY') {
    event.preventDefault();
    void redo();
    return;
  }

  if (selectedTextLayerId.value && event.key === 'Delete' && !isEditingText) {
    event.preventDefault();
    removeSelectedTextLayer();
  }
};

watch(() => props.file, loadFile, { immediate: true });

onMounted(() => {
  window.addEventListener('keydown', handleKeydown, true);

  if ('ResizeObserver' in window && stageRef.value) {
    resizeObserver = new ResizeObserver(updateCanvasMetrics);
    resizeObserver.observe(stageRef.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown, true);
  resizeObserver?.disconnect();

  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
  }
});
</script>

<style>
.image-attachment-editor {
  --image-attachment-editor-stage-height: clamp(420px, 60vh, 620px);

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: min(100%, 520px);
  padding: 10px 12px 12px;
  color: var(--text-color);
  background: var(--white);
}

.image-attachment-editor__header,
.image-attachment-editor__footer,
.image-attachment-editor__group,
.image-attachment-editor__history,
.image-attachment-editor__actions,
.image-attachment-editor__mode-tabs,
.image-attachment-editor__settings,
.image-attachment-editor__palette {
  display: flex;
  align-items: center;
  gap: 8px;
}

.image-attachment-editor__header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  min-height: 42px;
  align-items: center;
}

.image-attachment-editor__mode-tabs {
  justify-content: center;
}

.image-attachment-editor__header-spacer {
  min-width: 30px;
}

.image-attachment-editor__header > .image-attachment-editor__icon-button {
  justify-self: end;
}

.image-attachment-editor__tool.button-yui-kit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  white-space: nowrap;
}

.image-attachment-editor__icon-button.button-yui-kit {
  width: 34px;
  min-height: 34px;
  padding: 0;
  border-radius: 8px;
  justify-content: center;
  background: var(--white);
}

.image-attachment-editor__icon-button.button-yui-kit.ghost-yui-kit:not(
    :disabled
  ):hover {
  border-color: var(--border-primary-color);
  color: var(--text-neutral-color);
  background: var(--white);
}

.image-attachment-editor__icon-button.button-yui-kit.ghost-yui-kit:disabled,
.image-attachment-editor__icon-button.button-yui-kit.ghost-yui-kit.disabled-yui-kit {
  border-color: var(--border-color);
  color: var(--text-light-color);
  background: var(--white);
}

.image-attachment-editor__mode-tabs
  .image-attachment-editor__icon-button.button-yui-kit {
  width: 36px;
  height: 36px;
  min-height: 36px;
  padding: 0;
}

.image-attachment-editor__history
  .image-attachment-editor__icon-button.button-yui-kit {
  width: 36px;
  height: 36px;
  min-height: 36px;
  padding: 0;
}

.image-attachment-editor__mode-tabs
  .image-attachment-editor__icon-button.button-yui-kit.secondary-yui-kit {
  border-color: var(--border-primary-color);
  color: var(--primary-color);
  background: var(--primary-pressed-light-color);
}

.image-attachment-editor__text-icon {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
}

.image-attachment-editor__swatch {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0.5px solid var(--border-border-table, #e7e7e7);
  border-radius: 50%;
  color: var(--white);
  cursor: pointer;
}

.image-attachment-editor__swatch--light {
  color: var(--text-neutral-color);
}

.image-attachment-editor__swatch--add {
  order: -1;
  overflow: hidden;
  color: var(--text-neutral-color);
  background: transparent;
}

.image-attachment-editor__swatch-check {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.image-attachment-editor__color-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.image-attachment-editor__range-label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  font-size: 16px;
  color: var(--text-neutral-color);
}

.image-attachment-editor__range-label input {
  width: 174px;
  height: 24px;
  margin: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
}

.image-attachment-editor__range-label input::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--primary-color) 0 var(--range-progress),
    var(--button-neutral-color) var(--range-progress) 100%
  );
}

.image-attachment-editor__range-label input::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  margin-top: -10px;
  border: 0.5px solid var(--border-border-table, #e7e7e7);
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 0 22px 0 #00000012;
  appearance: none;
}

.image-attachment-editor__range-label input::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--primary-color) 0 var(--range-progress),
    var(--button-neutral-color) var(--range-progress) 100%
  );
}

.image-attachment-editor__range-label input::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border: 0.5px solid var(--border-border-table, #e7e7e7);
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 0 22px 0 #00000012;
}

.image-attachment-editor__stage-wrap {
  display: grid;
  place-items: center;
  width: 100%;
  height: var(--image-attachment-editor-stage-height);
  min-height: 240px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--grey1);
}

.image-attachment-editor__stage {
  position: relative;
  display: inline-flex;
  max-height: var(--image-attachment-editor-stage-height);
  max-width: 100%;
  overflow: hidden;
  touch-action: none;
  user-select: none;
}

.image-attachment-editor__stage--crop,
.image-attachment-editor__stage--draw {
  cursor: crosshair;
}

.image-attachment-editor__stage--text {
  cursor: text;
}

.image-attachment-editor__footer {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  min-height: 44px;
}

.image-attachment-editor__settings {
  justify-content: center;
  min-width: 0;
}

.image-attachment-editor__actions {
  justify-content: flex-end;
}

.image-attachment-editor__apply-button.button-yui-kit {
  height: 30px;
  min-height: 30px;
}

.image-attachment-editor__palette {
  flex-wrap: wrap;
  min-width: 0;
}

.image-attachment-editor__canvas {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: var(--image-attachment-editor-stage-height);
  background: var(--white);
}

.image-attachment-editor__text-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.image-attachment-editor__text-box {
  position: absolute;
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: move;
  pointer-events: auto;
  touch-action: none;
}

.image-attachment-editor__text-box--selected {
  border-color: var(--primary-color);
  background: var(--primary-color-20);
}

.image-attachment-editor__text-item {
  display: block;
  width: 100%;
  height: 100%;
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font-family: 'Inter Variable', Inter, sans-serif;
  font-size: inherit;
  font-weight: 600;
  line-height: 1.15;
  text-align: left;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  resize: none;
  overflow: hidden;
  cursor: text;
  outline: none;
  pointer-events: none;
  user-select: text;
}

.image-attachment-editor__text-item--editing {
  pointer-events: auto;
}

.image-attachment-editor__text-item::placeholder {
  color: var(--text-light-color);
}

.image-attachment-editor__crop-box {
  position: absolute;
  border: 2px dashed var(--white);
  box-shadow: 0 0 0 9999px var(--background-color-40);
  cursor: move;
  pointer-events: auto;
  touch-action: none;
}

.image-attachment-editor__crop-handle,
.image-attachment-editor__text-handle {
  position: absolute;
  width: 14px;
  height: 14px;
  padding: 0;
  border: 2px solid var(--white);
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 0 1px var(--background-color-40);
}

.image-attachment-editor__crop-handle--top-left,
.image-attachment-editor__text-handle--top-left {
  top: -8px;
  left: -8px;
  cursor: nwse-resize;
}

.image-attachment-editor__crop-handle--top,
.image-attachment-editor__text-handle--top {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.image-attachment-editor__crop-handle--top-right,
.image-attachment-editor__text-handle--top-right {
  top: -8px;
  right: -8px;
  cursor: nesw-resize;
}

.image-attachment-editor__crop-handle--right,
.image-attachment-editor__text-handle--right {
  top: 50%;
  right: -8px;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.image-attachment-editor__crop-handle--bottom-right,
.image-attachment-editor__text-handle--bottom-right {
  right: -8px;
  bottom: -8px;
  cursor: nwse-resize;
}

.image-attachment-editor__crop-handle--bottom,
.image-attachment-editor__text-handle--bottom {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.image-attachment-editor__crop-handle--bottom-left,
.image-attachment-editor__text-handle--bottom-left {
  bottom: -8px;
  left: -8px;
  cursor: nesw-resize;
}

.image-attachment-editor__crop-handle--left,
.image-attachment-editor__text-handle--left {
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  cursor: ew-resize;
}

@media screen and (width <= 640px) {
  .image-attachment-editor {
    --image-attachment-editor-stage-height: clamp(300px, 58vh, 500px);

    min-width: 0;
  }

  .image-attachment-editor__header {
    grid-template-columns: 30px 1fr 30px;
  }

  .image-attachment-editor__footer {
    align-items: stretch;
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .image-attachment-editor__settings {
    justify-content: flex-start;
  }

  .image-attachment-editor__history,
  .image-attachment-editor__actions {
    flex-wrap: wrap;
  }
}
</style>
