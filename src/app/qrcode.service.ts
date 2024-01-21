import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QrCode } from './qrcode.model';


@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  baseUrl = 'http://localhost:3000/qrcodes';

  constructor(private http: HttpClient) { }


  create(data: QrCode): Observable<QrCode> {
    return this.http.post<QrCode>(this.baseUrl, data);
  }

  getQrcode(): Observable<QrCode>{
    return this.http.get<QrCode>(`${this.baseUrl}`)
  }
  getQrcodeById(id: string | null): Observable<QrCode>{
    return this.http.get<QrCode>(`${this.baseUrl}/${id}`)
  }

}
