import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ─── Data interfaces ──────────────────────────────────────────────────────────

export interface PatientVitals {
  wt: string;
  bmi: string;
  bp: string;
  temp: string;
  pulse: string;
}

export interface PatientInfoCard {
  wt: string;
  apptLast: string;
  pcp: string;
  language: string;
  translator: string;
}

export interface BillingCard {
  ins: string;
  accBal: string;
  guar: string;
  grBal: string;
  ref: string;
  ren: string;
}

export interface ButtonBarTab {
  /** Tab label text. */
  label: string;
  /** When true, renders a chevron-down caret after the label. */
  hasDropdown?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Patient Info banner — the full-width header panel displayed above the patient
 * chart. Provides a consolidated view of demographics, contact details, alerts,
 * label/value cards, and a configurable button bar.
 *
 * Layout (left → right):
 * - **Avatar** — 100 × 100 px placeholder image
 * - **Patient Details** — name + age, action buttons, contact row, alert labels
 * - **Label/Value Cards** — Patient Info · Billing Details · Notes · Secure Notes
 *   (each can be independently hidden)
 *
 * Below the main row: a **Button Bar** showing tab navigation (Medical Summary,
 * CDSS, Rx, Labs, etc.)
 */
@Component({
  selector: 'ds-patient-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientInfoComponent {
  // ─── Patient identity ─────────────────────────────────────────────────────

  /** Patient full name in LAST, First format. */
  @Input() patientName = 'RUSSELL, Kyle';
  /** Age and gender string. */
  @Input() ageGender = '40 yrs, M';
  /** Street address. */
  @Input() address = 'Street No & Name, City, Apartment Name, City, State, Zip';
  /** Date of birth (MM/DD/YYYY). */
  @Input() dob = '09/18/1983';
  /** Home / work phone. */
  @Input() phone = '(555) 865 5309';
  /** Mobile phone. */
  @Input() mobile = '(555) 865 5309';
  /** Email address. */
  @Input() email = 'krussell@email.com';

  // ─── Meta fields ──────────────────────────────────────────────────────────

  @Input() showAccountNo = true;
  @Input() accountNo = '10373';

  @Input() showMessengerEnabled = true;
  /** Whether the patient has Messenger enabled. */
  @Input() messengerEnabled = true;

  @Input() showWebEnabled = true;
  /** Whether the patient has web portal access. */
  @Input() webEnabled = true;

  // ─── Action buttons ───────────────────────────────────────────────────────

  @Input() showInfoButton = true;
  @Input() showHubButton = true;
  @Input() showAskEva = true;
  /** Show the SOGI rainbow badge. */
  @Input() showSogi = true;
  /** Show the healow Connect pill button. */
  @Input() showHealowConnect = true;

  // ─── Alert labels ─────────────────────────────────────────────────────────

  @Input() showAllergyAlert = true;
  @Input() showAllergies = true;
  @Input() showBillingAlert = true;
  @Input() showClinicalAlert = true;

  // ─── Label / value cards ─────────────────────────────────────────────────

  @Input() showPatientCard = true;
  @Input() patientCardData: PatientInfoCard = {
    wt: '284 lbs | 140 kg',
    apptLast: '03/19/02 (MJ)',
    pcp: 'JONES',
    language: 'English',
    translator: 'No',
  };

  @Input() showBillingCard = true;
  @Input() billingCardData: BillingCard = {
    ins: 'Self Pay',
    accBal: '$125.00',
    guar: 'Sameer',
    grBal: '$448.00',
    ref: 'SUCHON',
    ren: 'Willis, Sam',
  };

  @Input() showNotesCard = true;
  @Input() notesText =
    '1. This is a test sticky note.\nLAST VISIT: The Patient attended a concert and consumed a burrito, which led to food poisoning.';

  @Input() showSecureNotesCard = true;
  @Input() secureNotesText = '2. This is a secure test note.';

  // ─── Button bar ───────────────────────────────────────────────────────────

  @Input() showButtonBar = true;
  @Input() buttonBarTabs: ButtonBarTab[] = [
    { label: 'Medical Summary', hasDropdown: true },
    { label: 'CDSS' },
    { label: 'Rx' },
    { label: 'Labs' },
    { label: 'DI' },
    { label: 'Procedures' },
    { label: 'Growth Chart' },
    { label: 'Imm' },
    { label: 'T. Inj' },
    { label: 'Encounters' },
    { label: 'Patient Docs' },
    { label: 'Flowsheets', hasDropdown: true },
    { label: 'Notes' },
    { label: 'ASC', hasDropdown: true },
  ];

  // ─── Events ───────────────────────────────────────────────────────────────

  @Output() infoClick = new EventEmitter<void>();
  @Output() hubClick = new EventEmitter<void>();
  @Output() askEvaClick = new EventEmitter<void>();
  @Output() tabClick = new EventEmitter<ButtonBarTab>();
}
