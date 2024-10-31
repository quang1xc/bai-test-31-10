import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAccount} from '../models/account.interfact';
import {map, Observable, of} from 'rxjs';
import {IResponseData} from '../models/response-data.interface';
import {IMerchant} from '../models/merchant.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<IResponseData<{token: string} | null>> {
    console.log("da goi api")
    return this.httpClient.get<IAccount[]>('http://localhost:3000/accounts')
      .pipe(map(res => {
        
        const accounts = res;
        const account = accounts.find(it => it.username === username);

        if ( !account ) {
          return {
            code: 400,
            error: 'USER_NOT_FOUND',
            data: null
          };
        }

        if (account?.password !== password) {
          return {
            code: 400,
            error: 'PASSWORD_NOT_CORRECT',
            data: null
          };
        }

        return {
          code: 200,
          error: '',
          data: {
            token: account.token
          }
        };
      }));
  }

  getMerchants(): Observable<IResponseData<IMerchant[]>> {
    return this.httpClient.get<IMerchant[]>('http://localhost:3000/merchants')
      .pipe(map(res => {
        return {
          code: 200,
          error: '',
          data: res.map(it => {
            return {
              id: it.id,
              code: it.code,
              name: it.name,
              address: it.address,
            } as IMerchant
          })
        }
      }));
  }

  getMerchant(codeMerchant: string) {
    return this.httpClient.get<IMerchant[]>('http://localhost:3000/merchants')
      .pipe(map(res => {
        // trong db id của các cửa hàng đang để giống nhau 
        const merchant = res.find(it => it.code === codeMerchant);
        if (!merchant) {
          return {
            code: 400,
            error: 'MERCHANT_NOT_FOUND',
            data: null
          }
        }

        return {
          code: 200,
          error: '',
          data: merchant
        }
      }));
  }
}
