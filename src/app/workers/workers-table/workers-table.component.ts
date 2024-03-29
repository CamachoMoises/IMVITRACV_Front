import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Worker } from '../../core/models/worker';
import { DeleteComponent } from '../delete/delete.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { FormComponent } from '../form/form.component';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';

import { WorkerService } from '../../core/service/worker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.sass']
})
export class WorkersTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  filterSearch = 'Unfiltered'
  filterToggle = false;
  displayedColumns = [
    'idWorker',
    'workerType',
    'firstName',
    'secondName',
    'firstLastname',
    'secondLastname',
    'DNI',
    'phone',
    'status',
    'actions'
  ];
  status = ['inactivo', 'Activo'];
  codeName = ['TAX-', 'COL-', 'OPE-', 'MOT-', 'IMV-TH-'];
  workerType = ['Operador de taxi', 'Colector', 'Operador de transporte', 'Operador de Moto taxi','Administrativo'];
  WorkerDatabase: WorkerService | null;
  dataSource: WorkerDataSource | null;
  selection = new SelectionModel<Worker>(true, []);
  contr: Worker | null
  id: number;
  dataLength: number = 0;
  userLogged
  constructor(
    private workerService: WorkerService,
    private router: Router,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

    private datePipe: DatePipe
  ) {
    super()
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    this.loadData();
    this.WorkerDatabase.Length$.subscribe((data: any) => {
      this.dataLength = data.dataLength
    })
  }

  ngAfterViewInit() {
    merge(this.paginator.page, this.sort.sortChange).pipe().subscribe(() => {
      // console.log('From merge Paginator and sort');

      this.loadData();
    })

    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),
      // if character length greater then 2
      //filter((res) => res.length > 2),
      // Time in milliseconds between key events
      debounceTime(500),
      // If previous query is different from current
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.paginator.pageIndex = 0
      // console.log('From keyup filter:', text);
      if (text) {
        this.filterSearch = text;
      } else {
        this.filterSearch = 'Unfiltered';
      }
      this.loadData()
    })
  }

  code( workerType: number, code):string {
    const name= this.codeName[workerType]+ code.toString().padStart(4, '0')
    return name
  }
  typeCode(workerType: number, organization):string {
    if(workerType<=3){
      return this.workerType[workerType]
    }
    return organization? organization: 'N/A'
  }

  addNew() {
    let tempDirection;
    const dialogRef = this.dialog.open(FormComponent, {
      width: '1300px',
      data: {
        worker: this.contr,
        action: 'add'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.WorkerDatabase.dataChange.value.unshift(
          this.workerService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
      setTimeout(() => {
        this.refresh();
      }, 1000);
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormComponent, {
      width: '1300px',
      data: {
        worker: row,
        action: 'edit'
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.WorkerDatabase.dataChange.value.findIndex(
          (x) => x.idWorker === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.WorkerDatabase.dataChange.value[foundIndex] =
          this.WorkerDatabase.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
      setTimeout(() => {
        this.refresh();
      }, 1000);
    });
  }
  seeProfile(row, i) {
    this.router.navigate([`../profile/${row.idWorker}`])
  }
  deleteItem(row) {
    this.id = row.id;

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.WorkerDatabase.dataChange.value.findIndex(
          (x) => x.idWorker === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.WorkerDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
        setTimeout(() => {
          this.refresh();
        }, 1000);
      }
    });

  }

  refresh() {
    this.loadData();
  }
  seeReport() { }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.WorkerDatabase = new WorkerService(this.httpClient);
    this.dataSource = new WorkerDataSource(
      this.WorkerDatabase,
      this.paginator,
      this.sort,
      this.filterSearch
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }


}
export class WorkerDataSource extends DataSource<Worker> {

  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Worker[] = [];
  renderedData: Worker[] = [];
  constructor(
    public workerDatabase: WorkerService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public filterSearch: string
  ) {
    super();
    if (!this.paginator.pageSize) {
      this.paginator.pageSize = 5
    }
    // this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(): Observable<Worker[]> {
    // console.log('At the star of connect', this.filterSearch);

    this.workerDatabase.getWorkers(this.paginator.pageIndex, this.paginator.pageSize, this.filterSearch)

    const displayDataChanges = [
      this.workerDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];


    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.workerDatabase.data
          .slice()
        // .filter((worker: Worker) => {
        //   const searchStr = (
        //       worker.idWorker,
        //       worker.workerType,
        //       worker.firstName,
        //       worker.secondName,
        //       worker.firstLastname,
        //       worker.secondLastname,
        //       worker.DNI,
        //       worker.type,
        //       worker.address,
        //       worker.phone,
        //       worker.email,
        //       worker.medical,
        //       worker.organization,
        //       worker.route
        //       ).toLowerCase();
        //       return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        //     })
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        this.renderedData = sortedData.splice(0, this.paginator.pageSize
        );
        return this.renderedData;
      })
    )

  }

  disconnect() { }

  sortData(data: Worker[]): Worker[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'idWorker':
          [propertyA, propertyB] = [a.idWorker, b.idWorker];
          break;
        case 'workerType':
          [propertyA, propertyB] = [a.workerType, b.workerType];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'firstLastname':
          [propertyA, propertyB] = [a.firstLastname, b.firstLastname];
          break;
        case 'DNI':
          [propertyA, propertyB] = [a.DNI, b.DNI];
          break;
        case 'route':
          [propertyA, propertyB] = [a.route, b.route];
          break;
        case 'membership':
          [propertyA, propertyB] = [a.membership, b.membership];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
