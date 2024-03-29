import { Injectable } from '@angular/core';
import { createCanvas, loadImage } from 'canvas';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  public generateQrCode(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(text, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  public async generateQRCodeWithImage(value: string, imageSrc: string): Promise<string> {
    const qrCode = await QRCode.create(value, { errorCorrectionLevel: 'H' });
    const canvas = createCanvas(qrCode.modules.size * 8, qrCode.modules.size * 8);
    const ctx = canvas.getContext('2d');
    QRCode.toCanvas(canvas, value, { errorCorrectionLevel: 'H', margin: 0 }, function (error) {
      if (error) return error;
      else return '';
    });

    const center = canvas.width / 2;
    const imageWidth = canvas.width / 4;
    const imageHeight = canvas.height / 4;

    ctx.beginPath();
    ctx.arc(center, center, imageWidth / 2 + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.fill();

    const image = await loadImage(imageSrc);
    ctx.drawImage(image, center - imageWidth / 2, center - imageHeight / 2, imageWidth, imageHeight);
    return canvas.toDataURL();
  }
}
