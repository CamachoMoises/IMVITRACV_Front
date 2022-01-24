import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Worker } from '../../core/models/worker';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
//import { FormComponent } from '../form/form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteComponent } from '../delete/delete.component';
import { MatPaginator } from '@angular/material/paginator';

import { WorkerService } from '../../core/service/worker.service';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.sass']
})
export class WorkersTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

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
    'membership',
    'status',
    'actions'
  ];
  WorkerDatabase: WorkerService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Worker>(true, []);
  contr: Worker | null
  id: number;
  userLogged
  constructor(
    private workerService: WorkerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public domSanitizer: DomSanitizer,


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
  }
  addNew() { }
  editCall(row) { }
  deleteItem(row) { }
  toggleStar(row) {
    console.log(row);
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
    this.dataSource = new ExampleDataSource(
      this.WorkerDatabase,
      this.paginator,
      this.sort,
      this.domSanitizer
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
export class ExampleDataSource extends DataSource<Worker> {

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
    private domSanitizer: DomSanitizer
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    workerDatabase.getWorkers()
  }
  connect(): Observable<Worker[]> {
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
          .filter((worker: Worker) => {
            const searchStr = (
              worker.idWorker,
              worker.workerType,
              worker.firstName,
              worker.secondName,
              worker.firstLastname,
              worker.secondLastname,
              worker.DNI,
              worker.type,
              worker.address,
              worker.phone,
              worker.email,
              worker.medical,
              worker.organization,
              worker.route
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          })
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
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
