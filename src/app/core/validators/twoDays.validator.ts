import { AbstractControl, ValidationErrors } from '@angular/forms';
export function dateValidator(control: AbstractControl):ValidationErrors | null {
  if (control.get('dateInit').value > control.get('dateEnd').value ) {
    control.get('dateInit').setErrors({ 'dateValidator': true });
    control.get('dateEnd').setErrors({ 'dateValidator': true });
    return { 'dateValidator': true }
  } else {
    control.get('dateInit').setErrors(null);
    control.get('dateEnd').setErrors(null);
    return null;
  }
}
