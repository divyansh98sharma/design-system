import type { Meta, StoryObj } from '@storybook/angular';
import { PatientInfoComponent } from './patient-info.component';

const meta: Meta<PatientInfoComponent> = {
  title: 'Components/PatientInfo',
  component: PatientInfoComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width patient banner displayed above the chart. Consolidates demographics, ' +
          'contact details, action buttons, alert labels, label/value side-cards, and a tab button bar.\n\n' +
          '**Sections (all individually toggleable):**\n' +
          '- Avatar · Patient name + age · INFO / HUB / ASK EVA / healow Connect / SOGI buttons\n' +
          '- Address · DOB · Phone · Mobile · Email\n' +
          '- Account No · Messenger Enabled · Web Enabled\n' +
          '- Allergy / Billing / Clinical alert links\n' +
          '- Patient Info card · Billing Details card · Notes card · Secure Notes card\n' +
          '- Button bar tab navigation',
      },
    },
  },
  argTypes: {
    patientName: { control: 'text' },
    ageGender: { control: 'text' },
    address: { control: 'text' },
    dob: { control: 'text' },
    phone: { control: 'text' },
    mobile: { control: 'text' },
    email: { control: 'text' },
    showAccountNo: { control: 'boolean' },
    showMessengerEnabled: { control: 'boolean' },
    showWebEnabled: { control: 'boolean' },
    messengerEnabled: { control: 'boolean' },
    webEnabled: { control: 'boolean' },
    showInfoButton: { control: 'boolean' },
    showHubButton: { control: 'boolean' },
    showAskEva: { control: 'boolean' },
    showSogi: { control: 'boolean' },
    showHealowConnect: { control: 'boolean' },
    showAllergyAlert: { control: 'boolean' },
    showAllergies: { control: 'boolean' },
    showBillingAlert: { control: 'boolean' },
    showClinicalAlert: { control: 'boolean' },
    showPatientCard: { control: 'boolean' },
    showBillingCard: { control: 'boolean' },
    showNotesCard: { control: 'boolean' },
    showSecureNotesCard: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    infoClick: { table: { category: 'Events' } },
    hubClick: { table: { category: 'Events' } },
    askEvaClick: { table: { category: 'Events' } },
    tabClick: { table: { category: 'Events' } },
  },
  args: {
    patientName: 'RUSSELL, Kyle',
    ageGender: '40 yrs, M',
    address: 'Street No & Name, City, Apartment Name, City, State, Zip',
    dob: '09/18/1983',
    phone: '(555) 865 5309',
    mobile: '(555) 865 5309',
    email: 'krussell@email.com',
    showAccountNo: true,
    accountNo: '10373',
    showMessengerEnabled: true,
    messengerEnabled: true,
    showWebEnabled: true,
    webEnabled: true,
    showInfoButton: true,
    showHubButton: true,
    showAskEva: true,
    showSogi: true,
    showHealowConnect: true,
    showAllergyAlert: true,
    showAllergies: true,
    showBillingAlert: true,
    showClinicalAlert: true,
    showPatientCard: true,
    showBillingCard: true,
    showNotesCard: true,
    showSecureNotesCard: true,
    showButtonBar: true,
  },
};

export default meta;
type Story = StoryObj<PatientInfoComponent>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Full patient info banner — toggle any section via Controls.' } },
  },
};

export const FullBanner: Story = {
  name: 'Full Banner',
  parameters: {
    docs: {
      description: { story: 'Complete patient info with all sections visible, matching the Figma design.' },
    },
  },
};

export const MinimalView: Story = {
  name: 'Minimal View',
  parameters: {
    docs: {
      description: { story: 'Essential info only — no side cards, no button bar.' },
    },
  },
  args: {
    showPatientCard: false,
    showBillingCard: false,
    showNotesCard: false,
    showSecureNotesCard: false,
    showButtonBar: false,
    showAllergyAlert: false,
    showSogi: false,
    showHealowConnect: false,
  },
};

export const NoAlerts: Story = {
  name: 'No Alerts',
  args: {
    showAllergyAlert: false,
  },
};

export const WithoutButtonBar: Story = {
  name: 'Without Button Bar',
  args: {
    showButtonBar: false,
  },
};
