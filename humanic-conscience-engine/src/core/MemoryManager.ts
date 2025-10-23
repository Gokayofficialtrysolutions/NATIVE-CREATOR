import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Agent } from '../interfaces/Agent';

interface MyDB extends DBSchema {
  agents: {
    key: string;
    value: Agent;
  };
  conversation: {
    key: number;
    value: {
      timestamp: number;
      speaker: string;
      text: string;
    };
    indexes: { 'by-timestamp': number };
  };
}

export class MemoryManager {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB<MyDB>('humanic-conscience-engine-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('agents')) {
          db.createObjectStore('agents', { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains('conversation')) {
          const conversationStore = db.createObjectStore('conversation', {
            keyPath: 'timestamp',
            autoIncrement: true,
          });
          conversationStore.createIndex('by-timestamp', 'timestamp');
        }
      },
    });
  }

  public async saveAgent(agent: Agent): Promise<void> {
    const db = await this.dbPromise;
    await db.put('agents', agent);
  }

  public async getAgents(): Promise<Agent[]> {
    const db = await this.dbPromise;
    return db.getAll('agents');
  }

  public async saveMessage(speaker: string, text: string): Promise<void> {
    const db = await this.dbPromise;
    await db.add('conversation', {
      timestamp: Date.now(),
      speaker,
      text,
    });
  }

  public async getConversation(): Promise<any[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('conversation', 'by-timestamp');
  }
}
