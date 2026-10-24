**Quick Note Box (Uncontrolled Forms)**

**Description**

Build a small note-taking box using uncontrolled inputs. Instead of storing every keystroke in React state, read the values from the inputs through refs only at the moment the form is submitted. Each added note appears in a list below the form.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Quick Notes
- A label: Title with a text input
- A label: Note with a multi-line textarea
- A rounded Add Note button
- An error line under the form, shown only after a failed attempt
- A line showing the count: Total notes: 0
- The list of added notes, or the message No notes yet. when the list is empty

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The Title input and the Note textarea are uncontrolled: they must not have a value or onChange tied to state. Read them through useRef when the form is submitted.
- Typing in the inputs changes nothing else on the page. The list and the count only change when Add Note is clicked.
- When the page opens, the count reads 'Total notes: 0' and the message 'No notes yet.' is shown.
- If Title or Note is empty or contains only spaces when Add Note is clicked, nothing is added and the error line reads 'Both fields are required.'
- If both fields have text, the note is added to the end of the list as 'Title: Note' using the typed title and note, and any earlier error is cleared.
- After a note is added, both inputs are cleared and the count increases by one.
- The message 'No notes yet.' disappears once the first note is added.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd quick_note_box'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
