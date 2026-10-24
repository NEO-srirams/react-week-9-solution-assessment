import { useState } from 'react';
import './AgeVerificationForm.css';

function validate(name, age) {
  const errors = { name: '', age: '' };

  const trimmedName = name.trim();
  if (trimmedName === '') errors.name = 'Full name is required.';
  else if (trimmedName.length < 3) errors.name = 'Full name must be at least 3 characters.';

  const trimmedAge = age.trim();
  if (trimmedAge === '') {
    errors.age = 'Age is required.';
  } else {
    const value = Number(trimmedAge);
    if (!Number.isInteger(value) || value < 18 || value > 60) {
      errors.age = 'Age must be between 18 and 60.';
    }
  }

  return errors;
}

function AgeVerificationForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({ name: '', age: '' });
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(name, age);
    setErrors(nextErrors);

    if (nextErrors.name === '' && nextErrors.age === '') {
      setResult(`Verified: ${name.trim()} (${age.trim()})`);
    } else {
      setResult('');
    }
  }

  return (
    <div className="age-verification">
      <h1>Age Verification</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="verify-name">Full Name</label>
        <input
          id="verify-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="error">{errors.name}</span>

        <label htmlFor="verify-age">Age</label>
        <input
          id="verify-age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <span className="error">{errors.age}</span>

        <button type="submit">Verify</button>
      </form>

      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default AgeVerificationForm;
