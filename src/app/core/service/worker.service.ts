import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { Worker } from '../models/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'https://imvitracv.herokuapp.com/worker';
  private readonly API_URL_ = 'https://imvitracv.herokuapp.com';

  private readonly API_URL2 = 'http://localhost:3001/worker';
  private readonly API_URL_2 = 'http://localhost:3001';


  dataChange: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);
  public dataWorkers$ = this.dataChange.asObservable();

  profileData: Subject<Worker> = new Subject<Worker>();
  public profileData$ = this.profileData.asObservable();

  dialogData: any;
  id = -1;
  isTblLoading = true;
  constructor(
    private httpClient: HttpClient,

  ) {
    super();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  get data(): Worker[] {
    console.log('get data', this.dataChange.value);

    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getWorkers() {
    // if (this.verified_user('see')) {
    this.subs.sink = this.httpClient.get<Worker[]>(this.API_URL + '/list').subscribe(
      (data) => {
        this.isTblLoading = false;
        console.log('Workers', data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );

    // }
  }
  profile(id:number) {
    this.subs.sink = this.httpClient.get(this.API_URL_ + `/profile/${id}`).subscribe( (res:Worker) => {
      this.profileData.next(res)
    }

    )

  }

  async addWorker(worker: Worker):Promise<number> {
    this.subs.sink = await this.httpClient.post(this.API_URL + '/newWorker', worker).subscribe((response: any) => {
      this.isTblLoading = false;
      console.log('id in service', response);
      this.id = response.id
      return new Promise<number>((resolve, reject) => {
        resolve(this.id);
      })
    },
      (err: HttpErrorResponse) => {
        console.log('error');
        return err
      }
    )
    this.dialogData = worker;
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        this.isTblLoading = false;
        resolve(this.id);
      }, 10000);
    })
  }
  async updateWorker(worker:Worker) {

    this.httpClient.put(this.API_URL + "/Update/" + worker.idWorker, worker).subscribe(data => {
      this.isTblLoading = false;
      this.dialogData = worker;
    },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(err);
        // error code here
      });

  }


  deleteWorker(id: number) {
    // if (this.verified_user('delete')) {
    console.log(id);
    this.httpClient.delete(this.API_URL + "/delete/" + id).subscribe(data => {
      this.isTblLoading = false;
      console.log(id);
    },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(err);
      }
    );
    // }
  }

  addFile(file): string {
    const formData = new FormData();
    formData.append('myFile', file.myFile);
    this.httpClient.put(this.API_URL + "/photo/" + file.id, formData).subscribe(data => {
      this.isTblLoading = false;
    },
      (err: HttpErrorResponse) => {
        console.log('error');
        return err
      })
    return 'successful';
  }


}
