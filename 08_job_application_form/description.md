**Job Application Form (Form Validation)**

**Description**

Build a job application form with several kinds of controlled inputs and a full set of validation rules, including one rule that depends on two fields at once. Errors follow a "touched" rule so the user is not shouted at before they have had a chance to type, and after a failed submit a summary line at the top tells the user how many errors remain.

**What you need to build (UI)**

Recreate the card from the layout with these elements, top to bottom:

- A large heading: Job Application
- An error summary line at the top, shown only after a failed Apply attempt
- A label: Full Name with a text input, and a line for its error text
- A label: Email with a text input, and a line for its error text
- A label: Experience with a number input (years), and a line for its error text
- A label: Role with a dropdown whose options are Select a role, Frontend Developer, Backend Developer, Tester, and a line for its error text
- A group titled Skills with four checkboxes labeled React, JavaScript, CSS, Testing, and a line for its error text
- A label: Cover Letter with a multi-line textarea, a counter line like Characters: 0/300, and a line for its error text
- A rounded Apply button
- A confirmation panel below the button, shown only after a successful application

The colors and sizes are up to you, but the text must match exactly.

**What your app should do**

- Every input is controlled by React state, and the Apply button is always clickable.
- Errors for Full Name, Email, Experience and Cover Letter appear after that field is blurred. The Role error appears after the dropdown value changes. The Skills error appears after any checkbox is toggled. Every error appears for all fields once Apply has been clicked. After that, each error follows its field live.
- Full Name: empty or only spaces gives 'Full name is required.' Fewer than 3 characters gives 'Full name must be at least 3 characters.'
- Email: empty gives 'Email is required.' A value that does not look like name@domain.com gives 'Enter a valid email address.'
- Experience: empty or not a whole number from 0 to 40 gives 'Experience must be between 0 and 40.'
- Role: leaving Select a role chosen gives 'Please select a role.'
- Skills: no checkbox selected gives 'Select at least one skill.' If Role is Tester, the Testing checkbox must be selected, otherwise the error is 'Testers must select the Testing skill.'
- Cover Letter: fewer than 50 characters gives 'Cover letter must be at least 50 characters.' More than 300 characters gives 'Cover letter must be at most 300 characters.' The counter always shows the current length, for example 'Characters: 120/300'.
- After a failed Apply, the summary reads 'You have 1 error to fix.' for one error, or 'You have 3 errors to fix.' for several. It updates live as errors are fixed, and disappears when there are no errors.
- When Apply is clicked with no errors, the panel shows 'Application received for Kiran (Tester).' and a second line 'Skills: JavaScript, Testing' listing the selected skills in the order of the checkboxes above.
- Editing any field after a successful application hides the panel.

**Scaffolding**

Scaffolding: [screenshot to be added]

**Snapshot**

Snapshot: [screenshot to be added]

**Setup & Execution Steps**

- Switch to Node.js version 16: 'nvm use 16'
- Navigate to the project directory: 'cd job_application_form'
- Install project dependencies: 'npm install'
- Start the application: 'npm start'
- Open your browser and view the application at: 'PORT 8081'
- Once verified, click on Run Test Cases or Submit in the portal.

Note: The project will not be submitted if "Submit Project" is not done at least once.
