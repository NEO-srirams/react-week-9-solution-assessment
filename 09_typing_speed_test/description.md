**Typing Speed Test (Class Lifecycle Phases)**

**Description**

Build a 10 second typing test using a class component. The timer must not start when the component first appears. It starts the moment the user types their first character, which means your code has to notice that change in the updating phase of the lifecycle. When time runs out, the textarea locks and the result is shown. Every timer must be cleaned up properly when the test is restarted or removed.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Typing Speed Test
- A hint line: Start typing to begin. You have 10 seconds.
- A label: Your Text with a multi-line textarea
- A line showing the remaining time: Time left: 10s
- A result line, visible only when the time is up
- A rounded Restart button
- A toggle button that reads Unmount Test while the test is showing, and Mount Test while it is removed
- A short message in place of the test while it is removed: Test unmounted.

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The test is a class component with a controlled textarea.
- When the page opens, the time line reads 'Time left: 10s', the textarea is enabled and no result is shown. No timer is running yet.
- The timer starts when the text changes from empty to non-empty. This must be detected in componentDidUpdate by comparing the previous state with the current state, not by starting the timer from the change handler.
- Once the timer is running, the time line counts down every second: 'Time left: 9s', 'Time left: 8s', and so on.
- Typing more characters, or deleting all the text, does not restart or stop the running timer.
- When the time reaches 0, the line reads 'Time left: 0s', the textarea becomes disabled, and the result line appears as 'Words: 3 | WPM: 18'. Words is the number of groups of characters separated by spaces in the text, and WPM is Words multiplied by 6.
- Clicking Restart clears the text, sets the time line back to 'Time left: 10s', hides the result, enables the textarea and stops any running timer. A new test begins again at the next first character.
- Clicking Unmount Test removes the test from the page, and componentWillUnmount clears any running timer so nothing happens afterwards and no console errors appear.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd typing_speed_test'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
