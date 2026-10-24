**Auto-Dismiss Toast (Class Lifecycle Phases)**

**Description**

Build a notification toast using a class component's lifecycle methods. When the toast appears (mounts), it starts a timer that closes it automatically after 3 seconds. If the user closes it earlier, the timer must be cleaned up when the toast is removed (unmounts) so that it can never fire later and close a newer toast by mistake.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Notifications
- A rounded Show Notification button
- A line showing the count: Toasts shown: 0
- The toast box, visible only while a toast is showing, with the text Saved successfully! and a Close button

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The toast is a class component. Its componentDidMount starts a timer of 3000 milliseconds using setTimeout, and when the timer fires it asks the parent to hide the toast.
- The toast's componentWillUnmount clears that timer, no matter how the toast was removed.
- Clicking Show Notification shows the toast and increases the count by one, for example 'Toasts shown: 1'.
- While a toast is visible, the Show Notification button is disabled.
- If the user does nothing, the toast disappears by itself after 3 seconds and the button becomes clickable again.
- Clicking Close removes the toast immediately.
- If a toast is closed after 1 second and a new one is shown straight away, the new toast must stay visible for its own full 3 seconds. The old timer must not close it early.
- No error or warning appears in the console when a toast is closed early.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd auto_dismiss_toast'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
