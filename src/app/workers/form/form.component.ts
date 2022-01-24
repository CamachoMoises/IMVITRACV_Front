import { Contract } from './../../core/models/contracts.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { formatDate, DatePipe } from '@angular/common';
import { ContractsService } from 'src/app/core/service/contracts.service';
import { DateAdapter } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
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
  contractForm: FormGroup;
  fileForm: FormGroup;
  contract: Contract;
  contractsType;
  currencies;
  employees;
  loaded = false;
  MaxSize= 1
  userLogged:string= localStorage.getItem('currentUserName')
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contractsService: ContractsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Set the defaults
    this.action = data.action;
    this.dateAdapter.setLocale('en-GB');

    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = `Contrato de ${data.contract.firstName} ${data.contract.firstLastName}`;
      this.contract = data.contract;
    } else if (this.action === 'details') {
      this.contract = data.contract;
      this.contract.dateInit =formatDate(this.contract.dateInit, 'yyyy-MM-dd', 'en');
      this.contract.dateEnd  =formatDate(this.contract.dateEnd, 'yyyy-MM-dd', 'en'),
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'Nuevo Contrato';
      this.contract = new Contract({});
      this.contract.dateInit=null;
      this.contract.dateEnd=null;
    }
    this.contractForm = this.createContractForm();
    this.fileForm = this.createFileForm();

    this.contractsService.ContractsDataForm().then((response: any) => {
      console.log('Form Data', response);
      this.employees = response.employees;
      this.contractsType = response.contractsType
      this.currencies= response.currencies;
      this.loaded = true;
    })
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
  ngOnInit():void {

  }
  createContractForm(): FormGroup {
    return this.fb.group({
      id: [this.contract.id],
      idContractType: [this.contract.idContractType, Validators.required],
      amount: [this.contract.amount, [Validators.required , Validators.pattern('^[.,0-9]{2,20}') ]],
      idCurrency:[this. contract.idCurrency, Validators.required],
      dateInit: [this.contract.dateInit,[Validators.required]],
      dateEnd: [this.contract.dateEnd, [Validators.required]],
      idEmployee: [this.contract.idEmployee, Validators.required],
      searchTxt: [''],
      searchTxt2:[''],
      userLogged:[this.userLogged]
    },{validator:dateValidator}
    );
  }
  createFileForm(): FormGroup {
    return this.fb.group({
      myFile: [null, [Validators.required, MaxSizeValidator(this.MaxSize*1024*1024) ]],
      id: [this.contract.id, [Validators.required]]
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick(id): void {
    this.dialogRef.close(id);
  }
  public confirmAdd(e: Event): void {
    e.stopPropagation();
    const myDateStart = new Date(this.contractForm['controls'].dateInit.value);
    const myDateEnd = new Date(this.contractForm['controls'].dateEnd.value);
    const formatStartDate = this.datePipe.transform(myDateStart, "yyyy-MM-dd");
    const formatEndsDate = this.datePipe.transform(myDateEnd, "yyyy-MM-dd");
    this.contractForm.controls['dateInit'].setValue(formatStartDate);
    this.contractForm.controls['dateEnd'].setValue(formatEndsDate);

    if (this.data.action === 'edit') {
      console.log('Edit Contract');
      this.contractsService.updateContract(this.contractForm.getRawValue())
      this.onNoClick(1);
    } else {
      console.log('Create Contract');
      this.contractsService.addContract(this.contractForm.getRawValue()).then((value) => {
        this.id = value
        console.log('ID in confirm', this.id);
        if (this.id > 0) {
          console.log('results if form back', this.id);
          this.fileForm.controls['id'].setValue(this.id);
          this.addFile();
        }
        this.onNoClick(this.id)
      });
    }
  }
  clearSearch():void{
    this.contractForm.controls['searchTxt'].setValue('')
  }
  addFile(): void {
    if (this.fileForm.valid) {
      console.log(this.fileForm.getRawValue());
      const result = this.contractsService.addFile(this.fileForm.getRawValue())
      this.changedFile = true;
      console.log('result', result);
      if (result === 'successful') {
        this.fileForm.reset();
      }
    }
  }
}
