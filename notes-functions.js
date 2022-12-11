"use strict";

//Read existing from localStorage; Read it, check it, parse it

const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

//Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

//Save the notes to localStorage
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
//Generate the DOM structure for a new note

const generateNoteDOM = (note) => {
  const noteEl = document.createElement("div");
  const textEL = document.createElement("a");
  const button = document.createElement("button");

  //Setup the remove note button
  button.textContent = "X";
  noteEl.appendChild(button);
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  //setup the note title text
  if (note.title.length > 0) {
    textEL.textContent = note.title;
  } else {
    textEL.textContent = "Unnamed note";
  }

  textEL.setAttribute("href", `./edit.html#${note.id}`);
  noteEl.appendChild(textEL);

  return noteEl;
};

//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

//Render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach((note) => {
    const notEl = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(notEl);
  });
};

//Generate the last edited message
const generateLastEdited = (timestamp) =>
  `last edited ${moment(timestamp).fromNow()}`;
