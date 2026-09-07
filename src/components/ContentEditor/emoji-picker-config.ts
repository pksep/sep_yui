import { reactive } from 'vue';

import {
  emojiActivities,
  emojiAnimalsNature,
  emojiFlags,
  emojiFoodDrink,
  emojiObjects,
  emojiRecent,
  emojiSmileysPeople,
  emojiSymbols,
  emojiTravelPlaces
} from '../Icon/icons';
import type { IVectorIcon } from '../Icon/interface/interface';

const emojiScrollSpacerAttribute = 'data-emoji-scroll-spacer';
const emojiRecentStorageKey = 'sep-yui:emoji-recent:v1';
const emojiRecentDatabaseName = 'EMJ';
const emojiRecentDatabaseVersion = 3;
const emojiRecentStoreName = 'emojis';
const emojiRecentRecordId = 0;
const emojiRecentLimit = 24;

export type EmojiPickerSelection = {
  i: string;
  n?: string[];
  r?: string;
  u?: string;
};

export type RecentEmoji = {
  n: string[];
  u: string;
};

const isRecentEmoji = (value: unknown): value is RecentEmoji => {
  if (!value || typeof value !== 'object') return false;

  const emoji = value as Partial<RecentEmoji>;

  return (
    typeof emoji.u === 'string' &&
    emoji.u.length > 0 &&
    Array.isArray(emoji.n) &&
    emoji.n.some(name => typeof name === 'string' && name.length > 0)
  );
};

const normalizeRecentEmojis = (value: unknown): RecentEmoji[] => {
  if (!Array.isArray(value)) return [];

  const normalized: RecentEmoji[] = [];

  value.forEach(item => {
    if (!isRecentEmoji(item) || normalized.some(emoji => emoji.u === item.u)) {
      return;
    }

    normalized.push({
      u: item.u,
      n: item.n.filter((name): name is string => typeof name === 'string')
    });
  });

  return normalized.slice(0, emojiRecentLimit);
};

const readRecentEmojisFromLocalStorage = (): RecentEmoji[] => {
  if (typeof window === 'undefined') return [];

  try {
    return normalizeRecentEmojis(
      JSON.parse(window.localStorage.getItem(emojiRecentStorageKey) || '[]')
    );
  } catch {
    return [];
  }
};

const sharedRecentEmojis = reactive<RecentEmoji[]>(
  readRecentEmojisFromLocalStorage()
);

export const emojiAdditionalGroups: Record<'recent', RecentEmoji[]> = reactive({
  recent: sharedRecentEmojis
});

let recentEmojiRevision = 0;

const replaceSharedRecentEmojis = (emojis: RecentEmoji[]): void => {
  sharedRecentEmojis.splice(0, sharedRecentEmojis.length, ...emojis);
};

const saveRecentEmojisToLocalStorage = (): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      emojiRecentStorageKey,
      JSON.stringify(sharedRecentEmojis)
    );
  } catch {
    // Recent emojis remain available for the current session.
  }
};

const openRecentEmojiDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(
      emojiRecentDatabaseName,
      emojiRecentDatabaseVersion
    );

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(emojiRecentStoreName)) {
        const store = database.createObjectStore(emojiRecentStoreName, {
          keyPath: 'id',
          autoIncrement: true
        });

        store.createIndex('id', 'id', { unique: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const readRecentEmojisFromDatabase = async (): Promise<RecentEmoji[]> => {
  const database = await openRecentEmojiDatabase();

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(
        emojiRecentStoreName,
        'readonly'
      );
      const request = transaction
        .objectStore(emojiRecentStoreName)
        .get(emojiRecentRecordId);

      request.onsuccess = () => {
        try {
          resolve(
            normalizeRecentEmojis(JSON.parse(request.result?.value || '[]'))
          );
        } catch {
          resolve([]);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } finally {
    database.close();
  }
};

const saveRecentEmojisToDatabase = async (): Promise<void> => {
  const database = await openRecentEmojiDatabase();

  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(
        emojiRecentStoreName,
        'readwrite'
      );

      transaction.objectStore(emojiRecentStoreName).put({
        id: emojiRecentRecordId,
        value: JSON.stringify(sharedRecentEmojis)
      });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
};

const initializeSharedRecentEmojis = async (): Promise<void> => {
  if (typeof indexedDB === 'undefined') return;

  const initialRevision = recentEmojiRevision;

  try {
    const storedEmojis = await readRecentEmojisFromDatabase();

    if (recentEmojiRevision !== initialRevision) return;

    if (storedEmojis.length || !sharedRecentEmojis.length) {
      replaceSharedRecentEmojis(storedEmojis);
      saveRecentEmojisToLocalStorage();
    }
  } catch {
    // IndexedDB may be unavailable in privacy mode; localStorage is enough.
  }
};

export const rememberEmojiSelection = (emoji: EmojiPickerSelection): void => {
  if (!emoji.u || !emoji.n?.length) return;

  recentEmojiRevision += 1;

  const recentEmoji: RecentEmoji = {
    u: emoji.u,
    n: [...emoji.n]
  };
  const currentIndex = sharedRecentEmojis.findIndex(
    item => item.u === recentEmoji.u
  );

  if (currentIndex === 0) return;
  if (currentIndex > 0) sharedRecentEmojis.splice(currentIndex, 1);

  sharedRecentEmojis.unshift(recentEmoji);

  if (sharedRecentEmojis.length > emojiRecentLimit) {
    sharedRecentEmojis.length = emojiRecentLimit;
  }

  saveRecentEmojisToLocalStorage();

  queueMicrotask(() => {
    if (typeof indexedDB !== 'undefined') {
      void saveRecentEmojisToDatabase().catch(() => undefined);
    }
  });
};

void initializeSharedRecentEmojis();

const toEmojiGroupIcon = (icon: IVectorIcon): string => {
  const svg = `<svg width="30" height="30" viewBox="${icon.viewbox || '0 0 24 24'}" fill="${icon.fill || 'none'}" xmlns="http://www.w3.org/2000/svg">${icon.path}</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const emojiGroupIcons = {
  recent: toEmojiGroupIcon(emojiRecent),
  smileys_people: toEmojiGroupIcon(emojiSmileysPeople),
  animals_nature: toEmojiGroupIcon(emojiAnimalsNature),
  food_drink: toEmojiGroupIcon(emojiFoodDrink),
  activities: toEmojiGroupIcon(emojiActivities),
  symbols: toEmojiGroupIcon(emojiSymbols),
  objects: toEmojiGroupIcon(emojiObjects),
  flags: toEmojiGroupIcon(emojiFlags),
  travel_places: toEmojiGroupIcon(emojiTravelPlaces)
};

export const emojiPickerStyle = {
  '--emoji-recent-icon': `url("${emojiGroupIcons.recent}")`
};

export const emojiGroupNames = {
  recent: 'Недавние',
  smileys_people: 'Смайлы и люди',
  animals_nature: 'Животные и природа',
  food_drink: 'Еда и напитки',
  activities: 'Активность',
  symbols: 'Символы',
  objects: 'Объекты',
  flags: 'Флаги',
  travel_places: 'Путешествия и места'
};
export const emojiGroupOrder: Array<keyof typeof emojiGroupNames> = [
  'recent',
  'smileys_people',
  'animals_nature',
  'food_drink',
  'activities',
  'symbols',
  'objects',
  'flags',
  'travel_places'
];
export const emojiStaticTexts = {
  placeholder: 'Поиск',
  skinTone: 'Тон кожи'
};

export const syncEmojiGroupControls = (pickerRoot: HTMLElement): void => {
  pickerRoot
    .querySelectorAll<HTMLElement>('.v3-groups .v3-group')
    .forEach((groupButton, index) => {
      const groupKey = emojiGroupOrder[index];
      const groupName = emojiGroupNames[groupKey];
      const groupIcon = emojiGroupIcons[groupKey];

      if (!groupName || !groupIcon) return;

      groupButton.setAttribute('aria-label', groupName);
      groupButton.querySelector('.v3-icon')?.setAttribute('title', groupName);
      groupButton.querySelector('img')?.setAttribute('src', groupIcon);
    });
};

export const resetEmojiGroupRendering = (pickerRoot: HTMLElement): void => {
  pickerRoot
    .querySelectorAll<HTMLElement>('.v3-body-inner > .v3-group')
    .forEach(group => group.style.removeProperty('content-visibility'));

  pickerRoot
    .querySelector<HTMLElement>(`[${emojiScrollSpacerAttribute}]`)
    ?.remove();
};

export const syncEmojiGroupScroll = (event: Event): void => {
  const target = event.target;
  const pickerRoot = event.currentTarget;

  if (!(target instanceof Element) || !(pickerRoot instanceof HTMLElement)) {
    return;
  }

  const groupButton = target.closest<HTMLButtonElement>('.v3-groups .v3-group');

  if (!groupButton) return;

  event.preventDefault();
  event.stopPropagation();

  const body = pickerRoot.querySelector<HTMLElement>('.v3-body-inner');
  const groupButtons = [
    ...pickerRoot.querySelectorAll<HTMLButtonElement>(
      '.v3-groups .v3-group:not(.v3-is-hidden)'
    )
  ];
  const groupIndex = groupButtons.indexOf(groupButton);
  const groupKey = emojiGroupOrder[groupIndex];

  if (!body || !groupKey) return;

  body.style.scrollBehavior = 'auto';

  const applyScrollPosition = (): void => {
    if (!body.isConnected) return;

    const groups = [
      ...body.querySelectorAll<HTMLElement>(':scope > .v3-group')
    ];
    const group = body.querySelector<HTMLElement>(`#${groupKey}`);

    if (!group) return;

    groups.forEach(item => {
      item.style.setProperty('content-visibility', 'visible');
    });

    const lastGroup = groups[groups.length - 1];
    let scrollSpacer = body.querySelector<HTMLElement>(
      `:scope > [${emojiScrollSpacerAttribute}]`
    );

    if (!scrollSpacer) {
      scrollSpacer = document.createElement('div');
      scrollSpacer.setAttribute(emojiScrollSpacerAttribute, '');
      scrollSpacer.setAttribute('aria-hidden', 'true');
      body.append(scrollSpacer);
    }

    scrollSpacer.style.height = `${Math.max(
      0,
      body.clientHeight - (lastGroup?.offsetHeight || 0)
    )}px`;
    scrollSpacer.style.pointerEvents = 'none';

    body.scrollTop = Math.max(0, group.offsetTop - body.offsetTop);
  };

  applyScrollPosition();

  requestAnimationFrame(() => {
    applyScrollPosition();
    requestAnimationFrame(applyScrollPosition);
  });
};
