import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNodeById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // Todo: tarea dispatch
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    // uid
    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    };

    const path = `${uid}/journal/notes`;
    const newDoc = doc(collection(FirebaseDB, path));
    const setDocResp = await setDoc(newDoc, newNote);

    console.log('Rest');
    console.log({ newDoc, setDocResp });

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docs = await loadNotes(uid);

    dispatch(setNotes(docs));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const path = `${uid}/journal/notes/${note.id}`;
    const docRef = doc(FirebaseDB, path);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrl = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrl));
    console.log(photosUrl);
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const path = `${uid}/journal/notes/${note.id}`;

    const docRef = doc(FirebaseDB, path);
    await deleteDoc(docRef);

    dispatch(deleteNodeById(note.id));
  };
};
