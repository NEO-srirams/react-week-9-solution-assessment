**Newsletter Subscription Form (Controlled Forms)**

**Description**

Build a small newsletter sign-up form where every input is controlled by React state: a text input for the email, a dropdown for how often the user wants emails, and a checkbox for agreeing to receive them. A preview sentence under the form updates live as the user changes the values, and the Subscribe button only becomes clickable when the form is ready.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Newsletter
- A label: Email with a text input
- A label: Frequency with a dropdown that has three options: Daily, Weekly, Monthly
- A checkbox with the label: I agree to receive emails
- A line of preview text under the form
- A rounded Subscribe button
- A confirmation message below the button, shown only after a successful subscribe

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- The Email input, the Frequency dropdown and the checkbox are all controlled by React state.
- When the page opens, Email is empty, Frequency shows Weekly, the checkbox is unchecked and the Subscribe button is disabled.
- While Email is empty, the preview line reads 'Enter your email to see a preview.'
- Once Email has text, the preview line reads 'You will get Weekly emails at sam@example.com.' where Weekly is the selected frequency and sam@example.com is exactly what was typed.
- Changing the dropdown updates the preview line immediately.
- The Subscribe button is enabled only when Email contains something other than spaces and the checkbox is checked.
- Clicking Subscribe shows the message 'Subscribed! Check your inbox at sam@example.com.' using the typed email.
- Editing any field after subscribing hides the confirmation message again.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd newsletter_subscription_form'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
