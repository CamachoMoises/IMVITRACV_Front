import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  ElementRef,
  Renderer2,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

import { WorkerService } from '../core/service/worker.service';
import { formatDate } from '@angular/common';

import { AuthService } from 'src/app/core/service/auth.service';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy, AfterViewInit {
  id:number = 0;

  QRLink
  profileData
  workerData;
  public config: any = {};
  isNavbarCollapsed = true;
  isNavbarShow: boolean;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  status=['inactivo','Activo'];
  workerType=['Taxista','Colector','Chofer'];
  type=['','Avance','Socio','Presidente de linea','Encargado Politico'];
  licence=['', '1ra','2da','3ra','4ta','5ta','6ta']
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,

    private authService: AuthService,

    public languageService: LanguageService
    ) {
    super()
  }
  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.params.subscribe(params => {
      this.id= +params['id'];
      this.QRLink=`chl=https://imvitracv-6aa26.firebaseapp.com/profile/${this.id}&amp;choe=UTF-8`
      this.workerService.profile(this.id);
    })
    this.profileData= this.workerService.profileData$.subscribe((data)=>{
      this.workerData= data
      this.workerData.dateInit =formatDate(this.workerData.dateInit, 'dd/MM/yyyy', 'en');
      this.workerData.dateEnd  =formatDate(this.workerData.dateEnd, 'dd/MM/yyyy', 'en');
    })
  }

  ngAfterViewInit() {
    // set theme on startup
    this.renderer.addClass(this.document.body, 'side-closed');
    this.renderer.addClass(this.document.body, 'submenu-closed');
    this.renderer.addClass(this.document.body, 'light');

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption')
      );
    }
  }


  ngOnDestroy(){
    this.profileData.unsubscribe();
  }

}
