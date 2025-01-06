import { openDB } from 'idb';
import { DB_NAME, STORE_NAME } from "@/lib/constants";
import {ImageRecord} from "@/lib/types";

const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};

export const storeImageRecord = async ({id, base_image}: ImageRecord) => {
    const db = await initDB();
    const record = { id: id, base_image: base_image};
    await db.put(STORE_NAME, record);
};


export const getImageRecord = async (id: string): Promise<ImageRecord | undefined> => {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
};

export const removeImageRecord = async (id: string) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};

export const clearStore = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};

export const getAllImageRecords = async (): Promise<ImageRecord[]> => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
}

export const getBaseImage = async (id: string): Promise<Blob | undefined> => {
    const record = await getImageRecord(id);
    return record?.base_image;
}
