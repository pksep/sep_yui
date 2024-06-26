import uuid4 from 'uuid4';

export const generateUniqueId = (prefix: string = '') => prefix + uuid4();
