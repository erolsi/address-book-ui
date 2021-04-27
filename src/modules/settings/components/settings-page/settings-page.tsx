import { Select, Form, message } from 'antd';

const options = [
  {
    value: 'ch',
    label: 'CH'
  },
  {
    value: 'es',
    label: 'ES'
  },
  {
    value: 'fr',
    label: 'FR'
  },
  {
    value: 'gb',
    label: 'GB'
  }
];

/**
 * Save nationality into localstorage so we can reuse it.
 * TODO We could also store this on server and locally into store to reuse. For simplicity we use localstorage.
 *
 * @param value Nationality
 */
const saveNationality = (value: string) => {
  localStorage.setItem('nationality', value);

  message.success('Nationality successfully set');
};

export default function SettingsPage() {
  const nationality = localStorage.getItem('nationality') || undefined;

  return (
    <div>
      <h1>Settings</h1>
      <Form layout="vertical">
        <Form.Item label="Nationality">
          <Select
            options={options}
            value={nationality}
            onChange={(value: string) => saveNationality(value)}
            placeholder="Please select nationality"
            data-testid="nationality-select"
          />
        </Form.Item>
      </Form>
    </div>
  );
}
