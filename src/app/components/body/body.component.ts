import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QrcodeService } from '../../qrcode.service';
import { QrCode } from '../../qrcode.model';
import { BehaviorSubject, take } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  sourceUrl: string = window.location.href
  borderSlider: number = 1


  newQrcode = false;

  qrcode: QrCode = {
    androidMobileUrl: '',
    iosMobileUrl: '',
    androidTabletUrl: '',
    iosTabletUrl: '',
  }

  form: FormGroup = new FormGroup({})

  constructor(private router: Router, private qrcodeService: QrcodeService) { }

  ngOnInit(): void {


  }


  createQrCode(): void {
    if(this.qrcode.androidMobileUrl || this.qrcode.iosMobileUrl || this.qrcode.androidTabletUrl || this.qrcode.iosTabletUrl) {

      this.newQrcode = true;
      let baseUrl = `${window.location.href}`
      this.qrcodeService.create(this.qrcode)
      .pipe(
        take(1))
        .subscribe(res => {
          res.id ? (this.sourceUrl = `${baseUrl}${res.id}`) : (this.sourceUrl = ``)
          console.log(this.sourceUrl)

        }, err => console.log('Error on Qr Code create!'))
      } else {
        console.log("Please fill some field!")
      }
    }

    newQrcodeHandle(): void {
      this.qrcode.androidMobileUrl = '';
      this.qrcode.iosMobileUrl = '';
      this.qrcode.androidTabletUrl = '';
      this.qrcode.iosTabletUrl = '';

      this.newQrcode = false;
      this.sourceUrl = window.location.href
    }

}
