import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export function getAllKeys(): string[] {
  return storage.getAllKeys();
}

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export function getAuthCred() {
  const whoteStorage: any = storage.getString(getAllKeys()[0]);
  const parsed: any = JSON.parse(whoteStorage);
  const user = JSON.parse(parsed.user);
  return {
    token: user.token,
    secretkey: user.secretkey,
  };
}

export function clearAll() {
  storage.clearAll();
}