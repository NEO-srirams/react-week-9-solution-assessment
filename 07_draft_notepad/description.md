**Draft Notepad (Class Lifecycle Mapped to Modern Practice)**

**Description**

Build a notepad that remembers its draft using a class component's lifecycle methods. The draft is loaded once when the notepad mounts, and it is saved again whenever the text changes. Think of it as two separate jobs: "do this once at the start" and "do this whenever this value changes". This is the way of thinking that function components will use for the same problems in modern React.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Draft Notepad
- A label: Your Draft with a multi-line textarea
- A line showing the length of the text: Characters: 0
- A Clear Draft button
- A toggle button that reads Hide Notepad while the notepad is showing, and Show Notepad while it is hidden
- A short message in place of the notepad while it is hidden: Notepad hidden.

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The notepad is a class component with a controlled textarea.
- componentDidMount reads the saved draft from localStorage under the key 'notepad-draft' and puts it in the textarea. If nothing is saved, the textarea starts empty.
- componentDidUpdate compares the previous text with the current text and, only when the text has changed, saves it to localStorage under the key 'notepad-draft'. If the text is empty, the key is removed instead of saved.
- The line under the textarea always shows the current length, for example 'Characters: 12'.
- Clicking Clear Draft empties the textarea and removes the 'notepad-draft' key from localStorage.
- Clicking Hide Notepad removes the notepad from the page. Clicking Show Notepad brings it back with the saved draft restored in the textarea.
- Re-rendering without a change to the text must not write to localStorage again.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd draft_notepad'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
