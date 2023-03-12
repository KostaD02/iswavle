import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Clipboard } from '@angular/cdk/clipboard';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QrcodeService, SubjectService, SweetAlertModalsService } from '../../../services';
import { SubjectInterface } from '../../../interfaces';
import { SweetAlertIcon } from 'src/app/enums';

@Component({
  selector: 'app-default-subject',
  templateUrl: './default-subject.component.html',
  styleUrls: ['./default-subject.component.scss']
})
export class DefaultSubjectComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger, { static: true }) contextMenu!: MatMenuTrigger;

  public readonly contextMenuPosition = { x: '0px', y: '0px' };

  public readonly destroy$ = new Subject<void>();

  public subjects: SubjectInterface[] = [];

  constructor(
    private clipBoard: Clipboard,
    private subjectService: SubjectService,
    private QRCodeService: QrcodeService,
    private sweetAlertModal: SweetAlertModalsService
  ) { }

  ngOnInit(): void {
    this.subjectService.subjects$.asObservable().pipe(
      tap((subjects) => {
        this.subjects = subjects.filter(subject => subject.isSelectable);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onContextMenu(event: MouseEvent, subject: SubjectInterface) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': subject };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  public onContextMenuShare(subject: SubjectInterface) {
    if (`${location.href}/${subject.route}` === '') {
      this.sweetAlertModal.displayToast('მისამართი ვერ დაგენერირდა', SweetAlertIcon.Error, 'red');
    } else {
      this.sweetAlertModal.displayToast('მისამართი დაკოპირდა', SweetAlertIcon.Success, 'green');
      this.clipBoard.copy(`${location.href}/${subject.route}`);
    }
  }

  public onContextMenuQRCode(subject: SubjectInterface) {
    this.QRCodeService.generateQRCodeWithImage(`${location.href}/${subject.route}`, 'assets/icons/icon-512x512.png').then(result => {
      this.sweetAlertModal.showFullSizeImg(result);
    }).catch(err => {
      this.sweetAlertModal.displayToast('QR ვერ დაგენერირდა', SweetAlertIcon.Error, 'red');
    });
  }
}