import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs';
import { QrcodeService } from 'src/app/qrcode.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private deviceDetector: DeviceDetectorService,
    private qrcodeService: QrcodeService,
    private route: ActivatedRoute
  ) {}

  errorMsg: string = ""


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.qrcodeService
    .getQrcodeById(id)
    .pipe(take(1))
    .subscribe((qrcode) => {

        if (
          this.deviceDetector.isMobile() &&
          this.deviceDetector.os === 'Android'
        ) {
          qrcode.androidMobileUrl
            ? (window.location.href = `https://${qrcode.androidMobileUrl}`)
            : (window.location.href = '');
        } else if (
          this.deviceDetector.isMobile() &&
          this.deviceDetector.os === 'iOS'
        ) {
          qrcode.androidTabletUrl
            ? (window.location.href = `https://${qrcode.androidTabletUrl}`)
            : (window.location.href = '');
        } else if (
          this.deviceDetector.isTablet() &&
          this.deviceDetector.os === 'Android'
        ) {
          qrcode.iosMobileUrl
            ? (window.location.href = `https://${qrcode.iosMobileUrl}`)
            : (window.location.href = '');
        } else if (
          this.deviceDetector.isTablet() &&
          this.deviceDetector.os === 'iOS'
        ) {
          qrcode.iosTabletUrl
            ? (window.location.href = `https://${qrcode.iosTabletUrl}`)
            : (window.location.href = '');
        }
      }, (err) => {
        console.log(err)
        this.errorMsg = `${err.statusText} - ${err.status} - Error QrCode not found!`
      });
  }

}

