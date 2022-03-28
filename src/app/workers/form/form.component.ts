import { Worker } from './../../core/models/worker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { DatePipe } from '@angular/common';
import { WorkerService } from 'src/app/core/service/worker.service';
import { DateAdapter } from '@angular/material/core';
import { MaxSizeValidator } from '@angular-material-components/file-input';
import { dateValidator } from 'src/app/core/validators/twoDays.validator'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  id = -1;
  changedFile = false;
  action: string;
  dialogTitle: string;
  isDetails = false;
  workerForm: FormGroup;
  fileForm: FormGroup;
  worker: Worker;
  workersType;
  currencies;
  employees;
  loaded = false;
  MaxSize = 1
  license = ''
  status = ''
  codeName = ['TAX-', 'COL-', 'OPE-', 'MOT-', 'IMV-TH-']
  userLogged: string = localStorage.getItem('currentUserName')
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workerService: WorkerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Set the defaults
    this.action = data.action;
    this.dateAdapter.setLocale('en-GB');

    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = `Ficha de ${data.worker.firstName} ${data.worker.firstLastname}`;
      this.worker = data.worker;
      if (this.worker.status) {
        this.status = this.worker.status.toString()
      }
      if (this.worker.license) {
        this.license = this.worker.license.toString()
      }
      if (this.worker.code) {
        this.worker.code= this.worker.code.toString().padStart(4, '0')
      }

    } else if (this.action === 'details') {
      this.worker = data.worker;

      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'Nuevo Miembro';
      this.worker = new Worker();

    }
    this.workerForm = this.createWorkerForm();
    this.fileForm = this.createFileForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }

  ngOnInit(): void {
  }

  createWorkerForm(): FormGroup {
    return this.fb.group({
      idWorker: [this.worker.idWorker],
      codeNumber: [this.worker.code, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      workerType: [this.worker.workerType],
      firstName: [this.worker.firstName, [Validators.required]],
      secondName: [this.worker.secondName],
      firstLastname: [this.worker.firstLastname, [Validators.required]],
      secondLastname: [this.worker.secondLastname],
      DNI: [this.worker.DNI, [Validators.required, Validators.pattern('^[0-9]*$')]],
      type: [this.worker.type],
      address: [this.worker.address],
      phone: [this.worker.phone, [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: [this.worker.email, [Validators.email]],
      medical: [this.worker.medical],
      license: [this.license, [Validators.required]],
      organization: [this.worker.organization, [Validators.required]],
      membership: [this.worker.membership],
      route: [this.worker.route],
      status: [this.status, [Validators.required]],
      absences: [this.worker.absences],
      observations: [this.worker.observations],
      dateInit: [this.worker.dateInit],
      dateEnd: [this.worker.dateEnd, [Validators.required]],
      code: [],
    }, { validator: dateValidator }
    );
  }

  createFileForm(): FormGroup {
    return this.fb.group({
      myFile: [null, [Validators.required, MaxSizeValidator(this.MaxSize * 1024 * 1024)]],
      id: [this.worker.idWorker, [Validators.required]]
    })
  }

  submit() {
    // emppty stuff
  }

  onNoClick(id): void {
    this.dialogRef.close(id);
  }

  onWorkerType(element: number): void {
    console.log('set null', element);
    if (element == 0 || element == 3) {
      this.workerForm.controls['route'].setValue(null);
    } else if (element > 3) {
      this.workerForm.controls['dateInit'].setValue(null);
      this.workerForm.controls['absences'].setValue(null);
      this.workerForm.controls['route'].setValue(null);
      this.workerForm.controls['membership'].setValue(null);
      this.workerForm.controls['medical'].setValue(null);
      this.workerForm.controls['type'].setValue(null);
    }
  }

  public confirmAdd(e: Event): void {
    e.stopPropagation();
    const myDateEnd = new Date(this.workerForm['controls'].dateEnd.value);
    const formatEndsDate = this.datePipe.transform(myDateEnd, "yyyy-MM-dd");
    this.workerForm.controls['dateEnd'].setValue(formatEndsDate);
    const codeText = this.codeName[+this.workerForm['controls'].workerType.value]
    this.workerForm.controls['code'].setValue(+this.workerForm['controls'].codeNumber.value)


    if (+this.workerForm['controls'].workerType.value <= 3) {
      const myDateStart = new Date(this.workerForm['controls'].dateInit.value);
      const formatStartDate = this.datePipe.transform(myDateStart, "yyyy-MM-dd");
      this.workerForm.controls['dateInit'].setValue(formatStartDate);
    }

    console.log('Form', this.workerForm);
    if (this.data.action === 'edit') {
      console.log('Edit Worker');
      this.workerService.updateWorker(this.workerForm.getRawValue())
      this.onNoClick(1);
    } else {
      console.log('Create Worker');
      this.workerService.addWorker(this.workerForm.getRawValue()).then((value) => {
        this.id = value
        console.log('ID in confirm', this.id);
        if (this.id > 0) {
          console.log('results if form back', this.id);
          this.fileForm.controls['id'].setValue(this.id);
          this.addFile();
        }
        this.onNoClick(this.id);
      });
    }
  }
  clearSearch(): void {
    this.workerForm.controls['searchTxt'].setValue('')
  }
  addFile(): void {
    if (this.fileForm.valid) {
      console.log(this.fileForm.getRawValue());
      const result = this.workerService.addFile(this.fileForm.getRawValue())
      this.changedFile = true;
      console.log('result', result);
      if (result === 'successful') {
        this.fileForm.reset();
      }
    }
  }
}
