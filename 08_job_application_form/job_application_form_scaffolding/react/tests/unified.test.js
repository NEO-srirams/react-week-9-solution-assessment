import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const nameInput = () => screen.getByLabelText('Full Name');
const emailInput = () => screen.getByLabelText('Email');
const experienceInput = () => screen.getByLabelText('Experience');
const roleSelect = () => screen.getByLabelText('Role');
const coverInput = () => screen.getByLabelText('Cover Letter');
const skillBox = (label) => screen.getByLabelText(label);
const applyButton = () => screen.getByRole('button', { name: 'Apply' });

const setValue = (input, value) => fireEvent.change(input, { target: { value } });
const blur = (input) => fireEvent.blur(input);
const chooseRole = (text) => {
  const option = within(roleSelect()).getByRole('option', { name: text });
  fireEvent.change(roleSelect(), { target: { value: option.value } });
};

const MSG = {
  nameRequired: 'Full name is required.',
  nameShort: 'Full name must be at least 3 characters.',
  emailRequired: 'Email is required.',
  emailInvalid: 'Enter a valid email address.',
  experience: 'Experience must be between 0 and 40.',
  role: 'Please select a role.',
  skillsNone: 'Select at least one skill.',
  skillsTester: 'Testers must select the Testing skill.',
  coverShort: 'Cover letter must be at least 50 characters.',
  coverLong: 'Cover letter must be at most 300 characters.',
};

function fillValidForm({ role = 'Frontend Developer', skills = ['React'] } = {}) {
  setValue(nameInput(), 'Kiran Kumar');
  setValue(emailInput(), 'kiran@example.com');
  setValue(experienceInput(), '5');
  chooseRole(role);
  skills.forEach((skill) => fireEvent.click(skillBox(skill)));
  setValue(coverInput(), 'a'.repeat(60));
}

describe('job_application_form_unified_test_suite', () => {
  test('renders_the_heading_every_field_the_role_options_and_the_counter', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Job Application' })).toBeInTheDocument();
    expect(nameInput()).toBeInTheDocument();
    expect(emailInput()).toBeInTheDocument();
    expect(experienceInput()).toBeInTheDocument();
    expect(coverInput()).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    ['React', 'JavaScript', 'CSS', 'Testing'].forEach((s) =>
      expect(skillBox(s)).toBeInTheDocument()
    );
    const options = Array.from(roleSelect().options).map((o) => o.textContent);
    expect(options).toEqual([
      'Select a role',
      'Frontend Developer',
      'Backend Developer',
      'Tester',
    ]);
    expect(screen.getByText('Characters: 0/300')).toBeInTheDocument();
    expect(applyButton()).toBeEnabled();
    expect(screen.queryByText(/errors? to fix/)).not.toBeInTheDocument();
  });

  test('errors_stay_hidden_until_blur_change_or_toggle', () => {
    renderApp();
    setValue(nameInput(), 'ab');
    expect(screen.queryByText(MSG.nameShort)).not.toBeInTheDocument();
    blur(nameInput());
    expect(screen.getByText(MSG.nameShort)).toBeInTheDocument();

    expect(screen.queryByText(MSG.role)).not.toBeInTheDocument();
    chooseRole('Tester');
    chooseRole('Select a role');
    expect(screen.getByText(MSG.role)).toBeInTheDocument();

    expect(screen.queryByText(MSG.skillsNone)).not.toBeInTheDocument();
    fireEvent.click(skillBox('React'));
    fireEvent.click(skillBox('React'));
    expect(screen.getByText(MSG.skillsNone)).toBeInTheDocument();
  });

  test('full_name_and_email_rules', () => {
    renderApp();
    blur(nameInput());
    expect(screen.getByText(MSG.nameRequired)).toBeInTheDocument();
    setValue(nameInput(), 'ab');
    expect(screen.getByText(MSG.nameShort)).toBeInTheDocument();
    setValue(nameInput(), 'abc');
    expect(screen.queryByText(MSG.nameShort)).not.toBeInTheDocument();

    blur(emailInput());
    expect(screen.getByText(MSG.emailRequired)).toBeInTheDocument();
    setValue(emailInput(), 'bad');
    expect(screen.getByText(MSG.emailInvalid)).toBeInTheDocument();
    setValue(emailInput(), 'a@b.co');
    expect(screen.queryByText(MSG.emailInvalid)).not.toBeInTheDocument();
  });

  test('experience_must_be_a_whole_number_from_0_to_40', () => {
    renderApp();
    blur(experienceInput());
    expect(screen.getByText(MSG.experience)).toBeInTheDocument();
    for (const bad of ['41', '-1', '2.5']) {
      setValue(experienceInput(), bad);
      expect(screen.getByText(MSG.experience)).toBeInTheDocument();
    }
    for (const good of ['0', '7', '40']) {
      setValue(experienceInput(), good);
      expect(screen.queryByText(MSG.experience)).not.toBeInTheDocument();
    }
  });

  test('role_and_skills_rules_including_the_tester_needs_testing_rule', () => {
    renderApp();
    chooseRole('Tester');
    fireEvent.click(skillBox('React'));
    expect(screen.getByText(MSG.skillsTester)).toBeInTheDocument();

    fireEvent.click(skillBox('Testing'));
    expect(screen.queryByText(MSG.skillsTester)).not.toBeInTheDocument();

    fireEvent.click(skillBox('Testing'));
    fireEvent.click(skillBox('React'));
    expect(screen.getByText(MSG.skillsNone)).toBeInTheDocument();

    chooseRole('Frontend Developer');
    fireEvent.click(skillBox('CSS'));
    expect(screen.queryByText(MSG.skillsNone)).not.toBeInTheDocument();
    expect(screen.queryByText(MSG.skillsTester)).not.toBeInTheDocument();
  });

  test('cover_letter_length_rules_and_the_live_counter', () => {
    renderApp();
    setValue(coverInput(), 'a'.repeat(49));
    blur(coverInput());
    expect(screen.getByText(MSG.coverShort)).toBeInTheDocument();
    expect(screen.getByText('Characters: 49/300')).toBeInTheDocument();

    setValue(coverInput(), 'a'.repeat(50));
    expect(screen.queryByText(MSG.coverShort)).not.toBeInTheDocument();

    setValue(coverInput(), 'a'.repeat(300));
    expect(screen.queryByText(MSG.coverLong)).not.toBeInTheDocument();

    setValue(coverInput(), 'a'.repeat(301));
    expect(screen.getByText(MSG.coverLong)).toBeInTheDocument();
    expect(screen.getByText('Characters: 301/300')).toBeInTheDocument();
  });

  test('a_failed_apply_shows_every_error_and_the_error_count', async () => {
    renderApp();
    await userEvent.click(applyButton());
    expect(screen.getByText(MSG.nameRequired)).toBeInTheDocument();
    expect(screen.getByText(MSG.emailRequired)).toBeInTheDocument();
    expect(screen.getByText(MSG.experience)).toBeInTheDocument();
    expect(screen.getByText(MSG.role)).toBeInTheDocument();
    expect(screen.getByText(MSG.skillsNone)).toBeInTheDocument();
    expect(screen.getByText(MSG.coverShort)).toBeInTheDocument();
    expect(screen.getByText('You have 6 errors to fix.')).toBeInTheDocument();
    expect(screen.queryByText(/^Application received/)).not.toBeInTheDocument();
  });

  test('the_summary_updates_live_uses_the_singular_form_and_then_disappears', async () => {
    renderApp();
    await userEvent.click(applyButton());
    expect(screen.getByText('You have 6 errors to fix.')).toBeInTheDocument();

    setValue(nameInput(), 'Kiran Kumar');
    expect(screen.getByText('You have 5 errors to fix.')).toBeInTheDocument();
    setValue(emailInput(), 'kiran@example.com');
    setValue(experienceInput(), '5');
    chooseRole('Frontend Developer');
    fireEvent.click(skillBox('React'));
    expect(screen.getByText('You have 1 error to fix.')).toBeInTheDocument();

    setValue(coverInput(), 'a'.repeat(60));
    expect(screen.queryByText(/errors? to fix/)).not.toBeInTheDocument();
  });

  test('a_valid_application_shows_the_panel_with_skills_in_checkbox_order', async () => {
    renderApp();
    fillValidForm({ role: 'Tester', skills: ['Testing', 'JavaScript'] });
    await userEvent.click(applyButton());
    expect(screen.getByText('Application received for Kiran Kumar (Tester).')).toBeInTheDocument();
    expect(screen.getByText('Skills: JavaScript, Testing')).toBeInTheDocument();
    expect(screen.queryByText(/errors? to fix/)).not.toBeInTheDocument();
  });

  test('editing_any_field_after_a_successful_application_hides_the_panel', async () => {
    renderApp();
    fillValidForm();
    await userEvent.click(applyButton());
    expect(screen.getByText(/^Application received/)).toBeInTheDocument();

    setValue(nameInput(), 'Kiran K');
    expect(screen.queryByText(/^Application received/)).not.toBeInTheDocument();
  });
});
