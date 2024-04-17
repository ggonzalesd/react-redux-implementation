import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "./../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

// jest.mock("./../../../src/firebase/providers.js");

describe("Pruebas en Journal thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    const note = {
      body: "",
      title: "",
      imageUrls: [],
      id: expect.any(String),
      date: expect.any(Number),
    };

    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(note));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(note));

    const path = `${uid}/journal/notes`;
    const collectionRef = collection(FirebaseDB, path);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  }, 10000);
});
