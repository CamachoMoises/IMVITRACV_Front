import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

import { WorkerService } from '../core/service/worker.service';
import { formatDate } from '@angular/common';
import { LanguageService } from 'src/app/core/service/language.service';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy, AfterViewInit {
  id: number = 0;
  userLogged
  corsProxy= 'https://cors-anywhere.herokuapp.com/'
  QRLink
  profileData
  workerData;
  public config: any = {};
  isNavbarCollapsed = true;
  isNavbarShow: boolean;
  flagvalue;
  countryName;
  photoBase64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
  QRBase64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  status = ['inactivo', 'Activo'];
  workerType = ['Taxista', 'Colector', 'Chofer'];
  type = ['', 'Avance', 'Socio', 'Presidente de linea', 'Encargado Politico'];
  licence = ['', '1ra', '2da', '3ra', '4ta', '5ta', '6ta']
  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    public languageService: LanguageService,
  ) {
    super()
  }
  ngOnInit(): void {
    this.userLogged= JSON.parse(localStorage.getItem('currentUser'));
    this.subs.sink = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.QRLink = `chl=https://imvitracv-6aa26.firebaseapp.com/profile/${this.id}&amp;choe=UTF-8`
      this.workerService.profile(this.id);
    })
    this.profileData = this.workerService.profileData$.subscribe((data) => {
      this.workerData = data
      this.workerData.dateInit = formatDate(this.workerData.dateInit, 'dd/MM/yyyy', 'en');
      this.workerData.dateEnd = formatDate(this.workerData.dateEnd, 'dd/MM/yyyy', 'en');
      this.convertImgToBase64URL(this.workerData.linkPhoto);
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
  QRLoad(url){
    const img = new Image,
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      src = url;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imagen = canvas.toDataURL("image/png");
        this.QRBase64= imagen
      }
      img.src = src;
  };


  downloadPdf() {
    let data = document.getElementById("card")

    html2canvas(data).then((canvas) => {
      const contentData = canvas.toDataURL('image/jpg')
      console.log('contentData', contentData);
      this.workerService.generatePDF(this.workerData, contentData)
    })
  }
  convertImgToBase64URL(url) {
    const img = new Image,
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      src = url;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imagen = canvas.toDataURL("image/png");
      this.photoBase64 = imagen;
    }
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }

  ngOnDestroy() {
    this.profileData.unsubscribe();
  }

}
