import { Injectable } from '@angular/core';
import { DEFAULT_IMAGE_SRC } from '../constants';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  private getFileName(name: string = "untitled", extension: string = "text") {
    return `${name}.${extension}`;
  }

  private async toDataUrl(url: string) {
    const blob = await fetch(url).then(res => res.blob()).catch(() => null);
    return blob ? URL.createObjectURL(blob || new Blob()) : DEFAULT_IMAGE_SRC;
  }

  public downloadFile(text: string, fileName: string = "code", fileExtension: string = "text"): void {
    const element = document.createElement("a");
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', this.getFileName(fileName, fileExtension));
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  public async downloadImage(src: string) {

    const getImageName = (imageSrc: string) => {
      let isUploadedOnPostImg = imageSrc.search('postimg') >= 0;
      return isUploadedOnPostImg ? imageSrc.split('/').pop() : this.getFileName('generated_image', 'jpg');
    }

    const imageUrl = await this.toDataUrl(src);

    if (imageUrl === DEFAULT_IMAGE_SRC) {
      Swal.fire({
        title: 'სურათი ვერ მოიძებნა გადმოსაწერად, ცადეთ თავიდან',
        icon: 'error'
      });
      return;
    }

    const element = document.createElement('a');
    element.setAttribute('href', imageUrl);
    element.setAttribute('download', getImageName(src) || 'untitled.img');
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
