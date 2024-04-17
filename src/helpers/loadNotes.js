import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw Error('El UID del usuario no existe');

  const path = `${uid}/journal/notes`;
  const collectionReft = collection(FirebaseDB, path);
  const docs = await getDocs(collectionReft);

  const notes = [];

  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
