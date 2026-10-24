import { useState } from 'react';
import './JobApplicationForm.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = ['Frontend Developer', 'Backend Developer', 'Tester'];
const SKILLS = ['React', 'JavaScript', 'CSS', 'Testing'];
const EMPTY_VALUES = { name: '', email: '', experience: '', role: '', skills: [], cover: '' };
const NOT_TOUCHED = {
  name: false,
  email: false,
  experience: false,
  role: false,
  skills: false,
  cover: false,
};

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (name === '') errors.name = 'Full name is required.';
  else if (name.length < 3) errors.name = 'Full name must be at least 3 characters.';

  const email = values.email.trim();
  if (email === '') errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';

  const experience = values.experience.trim();
  if (!/^\d+$/.test(experience) || Number(experience) > 40) {
    errors.experience = 'Experience must be between 0 and 40.';
  }

  if (values.role === '') errors.role = 'Please select a role.';

  if (values.skills.length === 0) {
    errors.skills = 'Select at least one skill.';
  } else if (values.role === 'Tester' && !values.skills.includes('Testing')) {
    errors.skills = 'Testers must select the Testing skill.';
  }

  if (values.cover.length < 50) {
    errors.cover = 'Cover letter must be at least 50 characters.';
  } else if (values.cover.length > 300) {
    errors.cover = 'Cover letter must be at most 300 characters.';
  }

  return errors;
}

function JobApplicationForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState(NOT_TOUCHED);
  const [attempted, setAttempted] = useState(false);
  const [applied, setApplied] = useState(false);

  const errors = validate(values);
  const errorCount = Object.keys(errors).length;
  const visibleError = (field) => (touched[field] || attempted ? errors[field] || '' : '');

  function touch(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setApplied(false);
  }

  function toggleSkill(skill) {
    setValues((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill],
    }));
    touch('skills');
    setApplied(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);
    setApplied(errorCount === 0);
  }

  const selectedSkills = SKILLS.filter((skill) => values.skills.includes(skill));

  return (
    <div className="job-application">
      <h1>Job Application</h1>

      {attempted && errorCount > 0 && (
        <p className="summary">
          {errorCount === 1 ? 'You have 1 error to fix.' : `You have ${errorCount} errors to fix.`}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="job-name">Full Name</label>
        <input
          id="job-name"
          type="text"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => touch('name')}
        />
        <span className="error">{visibleError('name')}</span>

        <label htmlFor="job-email">Email</label>
        <input
          id="job-email"
          type="text"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          onBlur={() => touch('email')}
        />
        <span className="error">{visibleError('email')}</span>

        <label htmlFor="job-experience">Experience</label>
        <input
          id="job-experience"
          type="number"
          value={values.experience}
          onChange={(e) => update('experience', e.target.value)}
          onBlur={() => touch('experience')}
        />
        <span className="error">{visibleError('experience')}</span>

        <label htmlFor="job-role">Role</label>
        <select
          id="job-role"
          value={values.role}
          onChange={(e) => {
            update('role', e.target.value);
            touch('role');
          }}
        >
          <option value="">Select a role</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <span className="error">{visibleError('role')}</span>

        <fieldset>
          <legend>Skills</legend>
          {SKILLS.map((skill) => (
            <label key={skill} className="skill" htmlFor={`job-skill-${skill}`}>
              <input
                id={`job-skill-${skill}`}
                type="checkbox"
                checked={values.skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </fieldset>
        <span className="error">{visibleError('skills')}</span>

        <label htmlFor="job-cover">Cover Letter</label>
        <textarea
          id="job-cover"
          value={values.cover}
          onChange={(e) => update('cover', e.target.value)}
          onBlur={() => touch('cover')}
        />
        <span className="counter">{`Characters: ${values.cover.length}/300`}</span>
        <span className="error">{visibleError('cover')}</span>

        <button type="submit">Apply</button>
      </form>

      {applied && (
        <div className="confirmation">
          <p>{`Application received for ${values.name.trim()} (${values.role}).`}</p>
          <p>{`Skills: ${selectedSkills.join(', ')}`}</p>
        </div>
      )}
    </div>
  );
}

export default JobApplicationForm;
