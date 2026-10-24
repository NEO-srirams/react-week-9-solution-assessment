**Age Verification Form (Form Validation)**

**Description**

Build a small verification form that validates its fields when the user clicks the Verify button. Errors appear under the fields that are wrong, and a success message appears only when everything is valid.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Age Verification
- A label: Full Name with a text input, and a line for its error text underneath
- A label: Age with a number input, and a line for its error text underneath
- A rounded Verify button
- A result message below the button, shown only when the form is valid

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- Both inputs are controlled by React state.
- No error is shown while the user is typing. Validation runs only when Verify is clicked.
- If Full Name is empty or only spaces, the error under it reads 'Full name is required.'
- If Full Name has fewer than 3 characters after removing surrounding spaces, the error reads 'Full name must be at least 3 characters.'
- If Age is empty, the error under it reads 'Age is required.'
- If Age is not a whole number from 18 to 60 (both included), the error reads 'Age must be between 18 and 60.' A decimal such as 20.5 counts as invalid.
- If every field is valid, the result message reads 'Verified: Ravi (25)' using the typed name (without surrounding spaces) and the typed age.
- When Verify is clicked again after fixing the fields, the old errors disappear. If the form is invalid, no result message is shown.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd age_verification_form'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
