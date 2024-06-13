import { Subject } from 'rxjs';
import { Uuid } from './Util';

export class StaticStorageService
{
  private constructor() {
  }

  private id: string = Uuid.create();
  private storageType: string = 'STATIC';
  private isInit = false;

  private static _singleton: StaticStorageService;

  private _storage: any = {};
  private _storageTransient: any = {};

  static getInstance(): StaticStorageService {
    return StaticStorageService._singleton || (StaticStorageService._singleton = new StaticStorageService())
  }

  private get Index(): string {
    return this.id + '_' + 'staticStorage';
  }

  public init(storageType: string = 'STATIC', id: string = ''): void {
    if(!this.isInit) {
      this.isInit = true;
      this.storageType = storageType;
      this.id = (id == '' ? this.id : id);

      // if(storageType == 'LOCAL') {
      //   if(window.localStorage) {
      //     window.localStorage.setItem(this.Ordinal, this._storage);
      //   }
      // }
      // else if(storageType == 'SESSION') {
      //   if(window.sessionStorage) {
      //     window.sessionStorage.setItem(this.Ordinal, this._storage);
      //   }
      // }
    }
  }

  public get Storage(): any {
    if(this.storageType == 'LOCAL') {
      if(window.localStorage) {
        this._storage = window.localStorage;
      }
    }
    else if(this.storageType == 'SESSION') {
      if(window.sessionStorage) {
        this._storage = window.sessionStorage;
      }
    }

    return this._storage;
  }

  public get TransientStorage(): any {
    return this._storageTransient;
  }
}