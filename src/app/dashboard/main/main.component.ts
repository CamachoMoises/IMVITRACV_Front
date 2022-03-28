import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/core/service/worker.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  allMembers=0;
  cabbie=0;
  collector=0;
  driver=0;
  moto=0;
  admn=0;
  constructor(
    private workerService: WorkerService
  ) {
    super();
    this.workerService.Dashboard()
  }

  ngOnInit() {
    this.subs.sink =this.workerService.dataDashboard$.subscribe(data => {
      this.allMembers= data.allMembers;
      this.cabbie= data.cabbie;
      this.collector= data.collector;
      this.driver = data.driver;
      this.moto= data.moto;
      this.admn= data.admn;

    })

  }

}
