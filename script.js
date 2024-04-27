const practiceBlocksContainer = document.getElementById('practiceBlocks');

for (let i = 1; i <= 100; i++) {
  if (i % 10 === 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    practiceBlocksContainer.appendChild(row);
  }

  const practiceBlock = document.createElement('div');
  practiceBlock.classList.add('practice-block');
  practiceBlock.textContent = i;

  const checkmark = document.createElement('div');
  checkmark.classList.add('checkmark');
  checkmark.textContent = '✅';

  const noteBox = document.createElement('div');
  noteBox.classList.add('note-box');
  noteBox.innerHTML = `
    <span class="note-box-close" onclick="closeNoteBox(event)">X</span>
    <textarea class="noteTextarea" placeholder="Write your notes here..."></textarea>
  `;

  let clickCount = 0;

  practiceBlock.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleCheckmarkVisibility(checkmark);
    saveCheckmarkState(i, checkmark.style.display === 'block');
  });

  practiceBlock.addEventListener('dblclick', (event) => {
    event.stopPropagation();
    openNoteBox(noteBox);
    clickCount = 0;
  });

  const isChecked = JSON.parse(localStorage.getItem(`checkmark_${i}`));
  if (isChecked) {
    checkmark.style.display = 'block';
  }

  const savedNote = localStorage.getItem(`note_${i}`);
  if (savedNote) {
    noteBox.querySelector('textarea').value = savedNote;
  }

  noteBox.querySelector('textarea').addEventListener('input', (event) => {
    saveNoteData(i, event.target.value);
  });

  practiceBlock.appendChild(checkmark);
  practiceBlock.appendChild(noteBox);

  const rows = document.querySelectorAll('.row');
  const lastRow = rows[rows.length - 1];
  lastRow.appendChild(practiceBlock);
}

function toggleCheckmarkVisibility(checkmark) {
  checkmark.style.display = checkmark.style.display === 'none' ? 'block' : 'none';
}

function openNoteBox(noteBox) {
  noteBox.style.display = 'block';
  noteBox.querySelector('textarea').focus();
}

function closeNoteBox(event) {
  event.target.parentNode.style.display = 'none';
}

function saveCheckmarkState(index, isChecked) {
  localStorage.setItem(`checkmark_${index}`, JSON.stringify(isChecked));
}

function saveNoteData(index, noteData) {
  localStorage.setItem(`note_${index}`, noteData);
}

function resetData() {
  localStorage.clear();
  location.reload();
}

function toggleDarkMode() {
  const element = document.body;
  element.classList.toggle("dark-mode");

  const practiceBlocks = document.querySelectorAll('.practice-block');
  practiceBlocks.forEach(block => {
    block.classList.toggle('dark-mode');
  });
}
