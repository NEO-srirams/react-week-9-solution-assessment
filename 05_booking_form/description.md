**Room Booking Form (Controlled and Uncontrolled Forms)**

**Description**

Build a small room booking form that mixes both styles of form inputs. Guest Name and Nights are controlled by React state because the total price must update live as the user types. The Special Requests box is uncontrolled: its text is read through a ref only at the moment the booking is submitted.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Room Booking
- A label: Guest Name with a text input
- A label: Nights with a number input, starting at 1, and a line for its error text
- A fixed line: Price per night: $80
- A live total line, for example: Total: $80
- A label: Special Requests with a multi-line textarea
- A rounded Book Now button
- A confirmation panel below the button, shown only after a successful booking

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- Guest Name and Nights are controlled inputs. Special Requests is uncontrolled and must be read with useRef when Book Now is clicked.
- The total line always equals Nights multiplied by 80 and updates on every change, for example 'Total: $240' for 3 nights.
- Nights must be a whole number from 1 to 14. Otherwise the error line reads 'Nights must be between 1 and 14.' and the total line reads 'Total: $0'.
- The Book Now button is disabled while Guest Name is empty or only spaces, or while Nights is invalid.
- Clicking Book Now shows the confirmation panel with these four lines: 'Booking confirmed for Anita', 'Nights: 3', 'Amount due: $240' and 'Requests: Late check-in'. The name and requests are exactly what was typed, without surrounding spaces. If Special Requests is empty, the last line reads 'Requests: None'.
- After booking, only the Special Requests textarea is cleared. Guest Name and Nights keep their values.
- Changing Guest Name or Nights after a booking hides the confirmation panel.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd booking_form'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
