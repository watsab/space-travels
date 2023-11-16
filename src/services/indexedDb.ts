import type { Pilot } from '@/models/Pilot';

let database: IDBDatabase;
export const getDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (database) {
      return resolve(database)
    }

    let request: IDBOpenDBRequest = window.indexedDB.open('space-travels', 1)

    request.onerror = (event: Event) => {
      console.error('ERROR: Unable to open database', event);
      reject('Error');
    }

    request.onsuccess = (event: Event) => {
      database = event.target.result;
      resolve(database);
    }

    // Hook appelé à la création ou mise à jour de la bdd
    request.onupgradeneeded = (event: Event) => {
      let database: IDBDatabase = event.target.result;
      database.createObjectStore('pilots', {
        autoIncrement: true,
        keyPath: 'id',
      });
    }
  })
};


export const getPilots = (database: IDBDatabase): Promise<Pilot[]> => {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('pilots', 'readonly');
    const store = transaction.objectStore('pilots');
    const pilots: Pilot[] = [];

    store.openCursor().onsuccess = (event: Event) => {
      let cursor = event.target.result;
      if (cursor) {
        pilots.push(cursor.value as Pilot);
        cursor.continue();
      }
    }

    transaction.oncomplete = () => {
      resolve(pilots)
    };

    transaction.onerror = event => {
      reject(event)
    };
  });
};
export const getPilot = (database: IDBDatabase, pilotId: number): Promise<Pilot[]> => {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('pilots', 'readonly');
    const store = transaction.objectStore('pilots');

    let pilot: Pilot;
    store.openCursor().onsuccess = (event: Event) => {
      let cursor = event.target.result;
      if (cursor) {
        if (cursor.value.id === pilotId) {
          pilot = cursor.value;
        }
        cursor.continue();
      }
    }

    transaction.oncomplete = () => {
      resolve(pilot)
    };

    transaction.onerror = event => {
      reject(event)
    };
  });
};


export const addPilot = (database: IDBDatabase, pilot: Pilot): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('pilots', 'readwrite');
    const store = transaction.objectStore('pilots');

    store.put({...pilot});

    transaction.oncomplete = () => {
      console.log('Pilot successfully saved.');
      resolve(true)
    };

    transaction.onerror = event => {
      reject(event)
    };
  });
};

export const removePilot = (database: IDBDatabase, pilot: Pilot) => {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('pilots', 'readwrite');
    const store = transaction.objectStore('pilots');

    store.delete(pilot.id);
    transaction.oncomplete = () => {
      console.log('Pilot successfully saved.');
      resolve(true);
    };

    transaction.onerror = event => {
      reject(event)
    };
  });
};
