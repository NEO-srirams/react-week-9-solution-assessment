**Event Registration Form (Form Validation)**

**Description**

Build an event registration form that validates each field with a "touched" rule: a field shows its error only after the user has left it (blur) or after the Register button has been clicked. Once an error is showing, it must update live as the user fixes the field. A Reset button returns the whole form to its starting state.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Event Registration
- A label: Full Name with a text input, and a line for its error text
- A label: Email with a text input, and a line for its error text
- A label: Phone with a text input, and a line for its error text
- A label: Tickets with a number input, and a line for its error text
- A rounded Register button and a Reset button side by side
- A confirmation message below the buttons, shown only after a successful registration

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- All four inputs are controlled by React state, and the Register button is always clickable.
- A field's error is hidden until that field has been blurred, or until Register has been clicked once. After that, the error follows the field's value live.
- Full Name: if empty or only spaces, the error is 'Full name is required.'
- Email: if empty, the error is 'Email is required.' If it does not look like name@domain.com (some text, an @, some text, a dot, some text, and no spaces), the error is 'Enter a valid email address.'
- Phone: if empty, the error is 'Phone is required.' If it is not exactly 10 digits (0 to 9 only), the error is 'Phone must be exactly 10 digits.'
- Tickets: if empty or not a whole number from 1 to 5, the error is 'Tickets must be between 1 and 5.'
- Clicking Register with any invalid field shows all of the errors at once and no confirmation message.
- Clicking Register with every field valid shows 'Registration complete for Meena. Tickets: 2.' using the typed name (without surrounding spaces) and the typed ticket count.
- Editing any field after a successful registration hides the confirmation message.
- Clicking Reset clears every value, every error, the touched state and the confirmation message.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd event_registration_form'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
