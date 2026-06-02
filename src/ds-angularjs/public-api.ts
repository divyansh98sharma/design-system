/**
 * @divyansh98sharma/design-system-angularjs
 *
 * AngularJS 1.x directive library — exact mirror of the Angular 21 package.
 * Every component in src/ds/ has a corresponding directive here.
 * Both packages are always published at the same version.
 *
 * AngularJS module name: 'ecw-ds'
 *
 * Usage in consuming app:
 *   angular.module('myApp', ['ecw-ds']);
 *
 * HTML usage mirrors Angular 21 — same selector, same attribute names:
 *   <ds-button type="'primary'" label="'Save'" on-button-click="vm.save()"></ds-button>
 */
import * as angular from 'angular';

// ─── Root module ─────────────────────────────────────────────────────────────
// All directives register themselves on this module.
export const EcwDsModule = angular.module('ecw-ds', []);

// ─── Atoms ───────────────────────────────────────────────────────────────────
// Uncommented as directives are generated (Branch 5 — bulk generate)
// export * from './avatar/avatar.directive';
// export * from './button/button.directive';
// export * from './checkbox/checkbox.directive';
// export * from './chip/chip.directive';
// export * from './info-tooltip/info-tooltip.directive';
// export * from './input-field/input-field.directive';
// export * from './loader/loader.directive';
// export * from './radio-button/radio-button.directive';
// export * from './scrollbar/scrollbar.directive';
// export * from './toggle/toggle.directive';
// export * from './tooltip/tooltip.directive';

// ─── Molecules ───────────────────────────────────────────────────────────────
// export * from './breadcrumb/breadcrumb.directive';
// export * from './disclaimer/disclaimer.directive';
// export * from './notification/notification.directive';
// export * from './patient-info/patient-info.directive';
// export * from './popover/popover.directive';
// export * from './toast/toast.directive';
// export * from './toggle-button/toggle-button.directive';

// ─── Organisms ───────────────────────────────────────────────────────────────
// export * from './left-nav/left-nav.directive';
// export * from './modal/modal.directive';
// export * from './side-navigation/side-navigation.directive';
// export * from './table/table.directive';
// export * from './tabs/tabs.directive';
// export * from './top-nav/top-nav.directive';
