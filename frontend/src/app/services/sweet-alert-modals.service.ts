import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from '../enums';
import { SharedFunctionsService } from './shared-functions.service';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertModalsService {

  constructor(private sharedFunctions: SharedFunctionsService) { }

  public displayToast(text: string, Icon: string, color: string, time: number = 1500): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: color,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: Icon as SweetAlertIcon,
      title: text,
    });
  }

  public displayModal(icon: SweetAlertIcon, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  public async downloadHtml(title: string, label: string, placeHolder: string, code: string, fileExtension: string = "text") {
    const { value: file } = await Swal.fire({
      title: title,
      input: 'text',
      inputLabel: label,
      inputPlaceholder: placeHolder
    })

    if (file) {
      Swal.fire({
        title: `Your file downloaded`,
        icon: 'success'
      });
      this.sharedFunctions.downloadFile(code, file, fileExtension);
    }
  }

  public emptyTemplateDownload(code: string, title: string = "Do you want to download empty template ?", icon: SweetAlertIcon = SweetAlertIcon.Question): void {
    Swal.fire({
      title: title,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Your file downloaded`,
          icon: 'success'
        });
        this.sharedFunctions.downloadFile(code, "empty", "html");
      }
    })
  }

  public displayDialog(title: string, confirmText: string, denyButtonText: string, successResult: string, successDescription: string, successResultIcon: string ,action: () => void){
    Swal.fire({
      title: title,
      showDenyButton: true,
      confirmButtonText: confirmText,
      denyButtonText: denyButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(successResult, successDescription, successResultIcon as SweetAlertIcon);
        action();
      }
    })
  }
}
