import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../phone.validators';
import { whiteSpaceValidator } from '../whitespaces.validators';

import { DadataConfig, DadataType } from '@kolkov/ngx-dadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  indication = false;
  borderInputSurname: any = null;
  borderInputName: any = null;
  borderInputPatronymic: any = null;

  regions = [
    { name: 'Белгородская область' },
    { name: 'Брянская область' },
    { name: 'Владимирская область' },
    { name: 'Воронежская область' },
    { name: 'Калужская область' },
  ];

  config: DadataConfig = {
    apiKey: '00e15521721c9c72fd89485445d481ead5b8ab1a',
    type: DadataType.fio,
  };

  form: FormGroup = new FormGroup({
    surname: new FormControl('', [
      Validators.minLength(2),
      whiteSpaceValidator(),
      Validators.maxLength(50),
      Validators.pattern(/^[А-ЯЁа-яё\s]+$/),
      Validators.required,
    ]),
    name: new FormControl('', [
      Validators.minLength(2),
      whiteSpaceValidator(),
      Validators.maxLength(50),
      Validators.pattern(/^[А-ЯЁа-яё\s]+$/),
      Validators.required,
    ]),
    patronymic: new FormControl('', [
      Validators.minLength(2),
      whiteSpaceValidator(),
      Validators.maxLength(50),
      Validators.pattern(/^[А-ЯЁа-яё\s]+$/),
    ]),
    login: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
      whiteSpaceValidator(),
      Validators.pattern(/^[a-zA-Z\s]+$/),
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.minLength(22),
      phoneNumberValidator(),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required,
    ]),
    region: new FormControl(null),
    checkbox: new FormControl(),
  });

  constructor(private router: Router) {}

  inputOnSurname(event: any) {
    if (event.value == '' && event?.errors) {
      this.borderInputSurname = false;
    } else if (event.value != '' && !event?.errors) {
      this.borderInputSurname = true;
    } else if (event.value != '' && event?.errors) {
      this.borderInputSurname = false;
    }
  }
  inputOnName(event: any) {
    if (event.value == '' && event?.errors) {
      this.borderInputName = false;
    } else if (event.value != '' && !event?.errors) {
      this.borderInputName = true;
    } else if (event.value != '' && event?.errors) {
      this.borderInputName = false;
    }
  }
  inputOnPatronymic(event: any) {
    if (event.value == '' && event?.errors) {
      this.borderInputPatronymic = false;
    } else if (event.value != '' && !event?.errors) {
      this.borderInputPatronymic = true;
    } else if (event.value != '' && event?.errors) {
      this.borderInputPatronymic = false;
    }
  }

  onInput(event: any) {
    let input = event.target;
    let inputNumbersValue = input.value.replace(/\D/g, '');
    let formattedInputValue = '';
    let selectionStart = input.selectionStart;
    if (!inputNumbersValue) {
      return (input.value = '');
    }

    if (input.value.length != selectionStart) {
      if (event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue;
      }
      return input.value;
    }

    if (['7', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == '9')
        inputNumbersValue = '7' + inputNumbersValue;

      let firstSymbols = '+7';

      formattedInputValue = firstSymbols + ' ';

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += ' - ' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += ' - ' + inputNumbersValue.substring(9, 11);
      }
    }
    input.value = formattedInputValue;
  }

  onPhoneKeyDown(event: any) {
    let input = event.target;
    if (
      (event.keyCode == 8 || event.keyCode == 7) &&
      input.value.replace(/\D/g, '').length == 1
    ) {
      input.value = '';
    }
  }
  onPhonePaste(event: any) {
    let input = event.target;
    let pasted = event.clipboardData || window.Clipboard;
    let inputNumbersValue = input.value.replace(/\D/g, '');

    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
  onSurnameSelected() {
    if (!this.form.get('surname')?.errors) {
      this.borderInputSurname = true;
    }
  }
  onNameSelected() {
    if (!this.form.get('name')?.errors) {
      this.borderInputName = true;
    }
  }
  onPatronymicSelected() {
    if (!this.form.get('patronymic')?.errors) {
      this.borderInputPatronymic = true;
    }
  }

  submit() {
    if (this.form.invalid) {
      this.indication = true;
      this.borderInputSurname = false;
      this.borderInputName = false;
    } else {
      const data = JSON.stringify(this.form.value);
      this.router.navigate(['/succsess']);
      console.log(data);
    }
  }
}
