let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" },
];  

console.log(notes);

function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

console.log(searchNotes("word"));

function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) =>
    current.text.length > longest.text.length ? current : longest
  );
}

console.log(longestNote());

function countByCategory() {
  const counts = {};
  notes.forEach(note => {
    counts[note.category] = (counts[note.category] || 0) + 1;
  });
  return counts;
}

console.log(countByCategory());

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const categories = Object.entries(counts)
    .map(([cat, count]) => `${count} ${cat}`)
    .join(', ');
  return `${total} ${total === 1 ? 'note' : 'notes'}: ${categories}.`;
}

console.log(getSummary());

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();
  return notes.some(note => 
    note.text.trim().toLowerCase() === normalizedText
  );
}

function addNote(text, category) {
  if (text.length < 1 || text.length > 200) {
    console.log("Reason: Text must be 1-200 characters.");
    return false;
  }
  if (isDuplicate(text)) {
    console.log("Reason: Note text already exists.");
    return false;
  }
  const validCategories = ["personal", "work", "study"];
  if (!validCategories.includes(category)) {
    console.log("Reason: Invalid category.");
    return false;
  }

  const newNote = {
    id: notes.length + 1,
    text: text,
    category: category
  };
  notes.push(newNote);
  return true;
}
