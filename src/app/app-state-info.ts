import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { Subject, Observable } from 'rxjs';

import { StaticStorageService } from './static-storage.service';


export class AppStateInfo
{
  private _staticStorage: StaticStorageService;
  private _appLoadedSource = new Subject<any>();
  appsLoaded$ = this._appLoadedSource.asObservable();

  public constructor(storageId: string = "") {
    this._staticStorage = StaticStorageService.getInstance();
    this._staticStorage.init('LOCAL', storageId);

    this._staticStorage.Storage['_currentHostname'] = window.location.hostname;
    this._staticStorage.Storage['_currentHostPort'] = window.location.port;

    this._staticStorage.TransientStorage['_activeStates'] = this._staticStorage.TransientStorage['_activeStates'] || {};
    this._staticStorage.TransientStorage['_activeContent'] = this._staticStorage.TransientStorage['_activeContent'] || {};
    this._staticStorage.TransientStorage['_astat'] = this._staticStorage.TransientStorage['_astat'] || {};
    this._staticStorage.TransientStorage['_userContext'] = this._staticStorage.TransientStorage['_userContext'] || {};
  }

  get Instance(): StaticStorageService {
    return this._staticStorage;
  }

  get hostName(): string {
    return this._staticStorage.Storage['_currentHostname'];
  }

  get hostPort(): string {
    return this._staticStorage.Storage['_currentHostPort'];
  }

  get states(): any {
    return this._staticStorage.TransientStorage['_activeStates'];
  }

  get content(): any {
    return this._staticStorage.TransientStorage['_activeContent'];
  }

  get authentication(): AuthenticationResult {
    return this._staticStorage.TransientStorage['_activeAuthentication'];
  }

  set authentication(value: AuthenticationResult) {
    this._staticStorage.TransientStorage['_activeAuthentication'] = value;
  }

  get astat(): any {
    return this._staticStorage.TransientStorage['_astat'];
  }

  set astat(value: any) {
    this._staticStorage.TransientStorage['_astat'] = value;
  }

  get userContext(): any {
    return this._staticStorage.TransientStorage['_userContext'];
  }

  set userContext(value: any) {
    this._staticStorage.TransientStorage['_userContext'] = value;
  }

  get breadCrumbOrigin(): string {
    return this._staticStorage.TransientStorage['breadcrumb-origin'];
  }

  set breadCrumbOrigin(value: string) {
    this._staticStorage.TransientStorage['breadcrumb-origin'] = value;
  }

  get accessToken(): string {
    return this._staticStorage.Storage['_activeAccessToken'];
  }

  set accessToken(value: string) {
    this._staticStorage.Storage['_activeAccessToken'] = value;
  }

  get accessTokenEApi(): string {
    return this._staticStorage.Storage['_activeAccessTokenEApi'];
  }

  set accessTokenEApi(value: string) {
    this._staticStorage.Storage['_activeAccessTokenEApi'] = value;
  }

  get msalAccount() {
    return this._staticStorage.TransientStorage['_activeMsalAccount'];
  }

  set msalAccount(value: AccountInfo | null) {
    if(value == null) {
      return;
    }
    this._staticStorage.TransientStorage['_activeMsalAccount'] = value;
  }

  emitAppLoaded(event: any) {
    this._appLoadedSource.next(event);
  }
}