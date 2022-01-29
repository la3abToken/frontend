import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import detectEthereumProvider from '@metamask/detect-provider';

interface NonceResponse {
  nonce: string;
}
interface VerifyResponse {
  token: string;
  address: string;
  playerName: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public signOut() {
  }
  public signInWithMetaMask() {
    let ethereum: any;
    return from(detectEthereumProvider()).pipe(
      switchMap(async (provider) => {
        if (!provider) {
          throw new Error('Please install MetaMask');
        }
        ethereum = provider;
        return await ethereum.request({ method: 'eth_requestAccounts' });
      }),
      switchMap(() =>
        this.http.post<NonceResponse>(
          'https://toornamentapiauth.azurewebsites.net/api/getnonce',
          {
            address: ethereum.selectedAddress
          }
        )
      ),
      switchMap(
        async (response) =>
          await ethereum.request({
            method: 'personal_sign',
            params: [
              `0x${this.toHex(response.nonce)}`,
              ethereum.selectedAddress,
            ],
          })
      ),
      switchMap((sig) =>
        this.http.post<VerifyResponse>(
          'https://toornamentauthapi.azurewebsites.net/api/validateauth',
          { address: ethereum.selectedAddress, signature: sig }
        )
      ),
      switchMap(
        async (response) => {
          localStorage.setItem('access_token', response.token)
          localStorage.setItem('address', response.address)
          localStorage.setItem('playerName', response.playerName)
        }

      )
    );
  }
  private toHex(stringToConvert: string) {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }
}