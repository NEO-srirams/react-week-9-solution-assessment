**Live Score Ticker (Class Lifecycle Mapped to Modern Practice)**

**Description**

Build a score ticker whose behavior is controlled by props from a parent component. The ticker is a class component that has to react correctly when its props change: pausing, resuming and changing speed must all start and stop its timer at the right moments, without ever leaving two timers running. Think in terms of "what must happen when this value changes", which is the same thinking function components use for the same problems in modern React.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Live Score Ticker
- A line showing the score: Score: 0
- A status line: Status: Running or Status: Paused
- A button that reads Pause while running, and Resume while paused
- A label: Speed with a dropdown whose options are Slow (2s) and Fast (1s)
- A toggle button that reads Unmount Ticker while the ticker is showing, and Mount Ticker while it is removed
- A short message in place of the ticker while it is removed: Ticker unmounted.

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The parent keeps the paused flag and the speed in its own state and passes them to the ticker as the props paused and intervalMs. The ticker keeps its own score in its own state.
- When the page opens, the status is Running, the speed is Slow (2s) and the score is 0.
- componentDidMount starts a timer with the current intervalMs, unless paused is true.
- Every tick adds 1 to the score. With Slow (2s) the score goes up every 2 seconds, and with Fast (1s) every second.
- componentDidUpdate compares the previous props with the current props. When paused changes to true, the timer is cleared. When paused changes to false, a new timer starts. When intervalMs changes while running, the old timer is cleared and a new one starts, so the next tick comes one full new interval after the change.
- Pausing stops the score. Resuming continues from the same score.
- Changing the speed while paused does not start ticking. The new speed is used when the user resumes.
- Re-rendering for any other reason must not reset the timer or start a second one, so the score never goes up twice per interval.
- Clicking Unmount Ticker removes the ticker, and componentWillUnmount clears its timer. Clicking Mount Ticker adds a fresh ticker with Score: 0 that follows the parent's current paused and speed values.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd live_score_ticker'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
