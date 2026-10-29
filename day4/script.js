// Select all elements
const textarea = document.getElementById('note-text');
const charCountDisplay = document.getElementById('char-count');
const wordCountDisplay = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to update counters and save draft
function updateCounts() {
    const text = textarea.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    // Update text
    charCountDisplay.textContent = `${chars} / 200 characters`;
    wordCountDisplay.textContent = `${words} words`;

    // Manage warning and over classes
    charCountDisplay.classList.remove('warning', 'over');
    if (chars > 200) {
        charCountDisplay.classList.add('over');
    } else if (chars > 180) {
        charCountDisplay.classList.add('warning');
    }

    // Save draft to localStorage
    localStorage.setItem('draftNote', text);
}

// Clear note function
function clearNote() {
    textarea.value = '';
    localStorage.removeItem('draftNote');
    updateCounts();
}

// Event Listeners
textarea.addEventListener('input', updateCounts);
clearBtn.addEventListener('click', clearNote);

// Escape key to clear note
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearNote();
    }
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});

// On page load: Restore draft and theme
window.addEventListener('DOMContentLoaded', () => {
    // Restore text
    const savedDraft = localStorage.getItem('draftNote');
    if (savedDraft) {
        textarea.value = savedDraft;
        updateCounts();
    }

    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
});