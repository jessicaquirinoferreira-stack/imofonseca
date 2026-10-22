import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Supports both AI Studio provisioned config and NEXT_PUBLIC_FIREBASE_* env overrides
const envApiKey = typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = envApiKey && !String(envApiKey).startsWith('AIzaSy...')
  ? {
      apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
  : firebaseAppletConfig;

export const isFirebaseConfigured = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  !String(firebaseConfig.apiKey).startsWith('AIzaSy...')
);

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const customDbId = (firebaseConfig as { firestoreDatabaseId?: string })?.firestoreDatabaseId;

function initDb() {
  try {
    return initializeFirestore(
      app,
      {
        experimentalAutoDetectLongPolling: true,
      },
      customDbId || undefined
    );
  } catch (_e) {
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  }
}

export const db = initDb();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

