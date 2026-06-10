// ============================================================
// eCW Design System — Public API
// Everything exported here is part of the stable public surface.
// Update this file whenever a component is added or removed.
// ============================================================

// ─── Atoms ───────────────────────────────────────────────────
export { AvatarComponent }          from './avatar/avatar.component';
export type { AvatarSize, AvatarVariant } from './avatar/avatar.component';

export { ButtonComponent }          from './button/button.component';
export type { ButtonType, ButtonStyle, ButtonSize } from './button/button.component';

export { HealowConnectComponent }   from './button/healow-connect/healow-connect.component';
export type { HealowConnectState }  from './button/healow-connect/healow-connect.component';

export { SogiComponent }            from './button/sogi/sogi.component';

export { CheckboxComponent }        from './checkbox/checkbox.component';

export { ChipComponent }            from './chip/chip.component';
export type { ChipType, ChipSize }  from './chip/chip.component';

export { InfoTooltipComponent }     from './info-tooltip/info-tooltip.component';

export { InputFieldComponent }      from './input-field/input-field.component';
export type { InputFieldAlignment } from './input-field/input-field.component';

export { LoaderComponent }          from './loader/loader.component';
export type { LoaderTheme }         from './loader/loader.component';

export { RadioButtonComponent }     from './radio-button/radio-button.component';

export { ScrollbarComponent }       from './scrollbar/scrollbar.component';
export type { ScrollbarOrientation } from './scrollbar/scrollbar.component';

export { ToggleComponent }          from './toggle/toggle.component';

export { TooltipComponent }         from './tooltip/tooltip.component';
export type { TooltipPosition }     from './tooltip/tooltip.component';

// ─── Molecules ───────────────────────────────────────────────
export { BreadcrumbComponent }      from './breadcrumb/breadcrumb.component';
export type { BreadcrumbItem } from './breadcrumb/breadcrumb.component';

export { DisclaimerComponent }      from './disclaimer/disclaimer.component';
export type { DisclaimerType } from './disclaimer/disclaimer.component';

export { NotificationComponent }    from './notification/notification.component';
export type { NotificationType, NotificationTheme, NotificationAction } from './notification/notification.component';

export { PatientInfoComponent }     from './patient-info/patient-info.component';
export type { PatientInfoCard, PatientVitals, BillingCard, ButtonBarTab } from './patient-info/patient-info.component';

export { PopoverComponent }         from './popover/popover.component';
export type { PopoverTheme, PopoverNotch, PopoverField, PopoverCheckbox, PopoverRadio } from './popover/popover.component';

export { ToastComponent }           from './toast/toast.component';
export type { ToastType }           from './toast/toast.component';

export { ToggleButtonGroupComponent } from './toggle-button/toggle-button-group.component';
export type { ToggleButtonItem, ToggleColor, ToggleSize } from './toggle-button/toggle-button-group.component';

// ─── Organisms ───────────────────────────────────────────────
export { LeftNavComponent }         from './left-nav/left-nav.component';
export type { LeftNavItem }         from './left-nav/left-nav.component';

export { ModalComponent }           from './modal/modal.component';
export type { ModalTheme, ModalSize, ModalAction } from './modal/modal.component';

export { SideNavigationComponent }  from './side-navigation/side-navigation.component';
export type { SideNavItem }         from './side-navigation/side-navigation.component';

export { TableComponent }           from './table/table.component';
export type { TableColumn, TableColumnType, TableRowAction, TableSortEvent, TablePageEvent, SortDirection } from './table/table.component';

export { FloatingTabsComponent }    from './tabs/floating-tabs.component';
export { HeaderTabsComponent }      from './tabs/header-tabs.component';
export { StandardTabsComponent }    from './tabs/standard-tabs.component';
export { WizardTabsComponent }      from './tabs/wizard-tabs.component';
export type { TabItem, TabTheme, WizardStep, WizardTabTheme } from './tabs/tabs.types';

export { TopNavComponent }          from './top-nav/top-nav.component';
export type { TopNavLink, JellybeanStyle } from './top-nav/top-nav.component';
