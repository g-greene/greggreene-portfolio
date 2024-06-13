import { Subject } from 'rxjs';

export class EventHubService
{
  private constructor() {
  }

  private hasStarted = false;

  private static _singleton: EventHubService;

  private _appChangedSource = new Subject<any>();
  appsChanged$ = this._appChangedSource.asObservable();

  private _userInitSource = new Subject<any>();
  userInitSource$ = this._userInitSource.asObservable();

  private _astatChanged = new Subject<any>();
  astatChanged$ = this._astatChanged.asObservable();

  private _contentTypeChanged = new Subject<any>();
  contentTypeChanged$ = this._contentTypeChanged.asObservable();

  private _closePanels = new Subject<any>();
  closePanels$ = this._closePanels.asObservable();

  private _reloadContent = new Subject<any>();
  reloadContent$ = this._reloadContent.asObservable();

  private _findTyping = new Subject<any>();
  findTyping$ = this._findTyping.asObservable();

  private _findExecutedSource = new Subject<any>();
  findExecuted$ = this._findExecutedSource.asObservable();

  private _findResultsChangedSource = new Subject<any>();
  findResultsChanged$ = this._findResultsChangedSource.asObservable();

  static getInstance(): EventHubService {
    return EventHubService._singleton || (EventHubService._singleton = new EventHubService());
  }

  public init(): void {
    if(!this.hasStarted) {
      this.hasStarted = true;
    }
  }

  emitAppChanged(event: any) {
    this._appChangedSource.next(event);
  }

  emitUserInit(event: any) {
    this._userInitSource.next(event);
  }

  emitAstatChanged(event: any) {
    this._astatChanged.next(event);
  }

  emitContentTypeChanged(event: any) {
    this._contentTypeChanged.next(event);
  }

  emitClosePanels(event: any) {
    this._closePanels.next(event);
  }

  emitReloadContent(event: any) {
    this._reloadContent.next(event);
  }

  emitFindExecuted(event: any) {
    this._findExecutedSource.next(event);
  }

  emitFindTyping(event: any) {
    this._findTyping.next(event);
  }

  emitFindResultsChanged(event: any) {
    this._findResultsChangedSource.next(event);
  }

  // TODO: add more events
}