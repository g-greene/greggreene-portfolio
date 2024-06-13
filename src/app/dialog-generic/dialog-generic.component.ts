import { Component, ViewChild, TemplateRef, ElementRef, Renderer2, Inject, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, AfterContentInit, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogGenericData } from './dialog-generic-data';

@Component({
  selector: 'dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrls: ['./dialog-generic.component.css']
})
export class DialogGenericComponent implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @ViewChild('dialogTemplate', { read: TemplateRef }) _dialogTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { read: TemplateRef }) _activeTemplate!: TemplateRef<any>;

  _instances: DialogInstance[] = [];
  _config: any = {};
  _activeInstance!: DialogInstance;

  constructor(
      public ref: ElementRef,
      public dialog: MatDialog,
      public renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    // EXAMPLE: instantiating a template via a container
    // @ViewChild('dialogContainer', { read: ViewContainerRef }) _dialogContainer!: ViewContainerRef;
    // const view = this._dialogTemplate.createEmbeddedView({fromContext: 'John'});
    // this._dialogContainer.insert(view);
  }

  ngAfterContentChecked(): void {
    
  }

  ngAfterContentInit(): void {
    this.renderer.addClass(this.ref.nativeElement, 'hide');
  }

  ngAfterViewInit(): void {

  }

  public get ActiveDialogTemplate(): TemplateRef<any> {
    return this._activeTemplate;
  }

  public set ActiveDialogTemplate(value: TemplateRef<any>) {
    this._activeTemplate = value;
  }

  public get DialogTemplate(): TemplateRef<any> {
    return this._dialogTemplate;
  }

  public set DialogTemplate(template: TemplateRef<any>) {
    this._dialogTemplate = template;
  }

  public get Config(): any {
    return this._config;
  }

  public set Config(config: any) {
    this._config = config;
  }

  public resetTemplate() {
    this._activeTemplate = this._dialogTemplate;
  }

  private _initInstance(template: any = null): DialogInstance {

    let instance: DialogInstance = new DialogInstance(this.dialog.open((template ? template : this._activeTemplate), this._config));
    this._instances[this._instances.length] = instance;
    this._activeInstance = instance;

    return instance;
  }

  public get(type: string, template: any = null, message: string, title: string = 'Heads up!', buttonOk: string = '', buttonCancel = ''): DialogInstance {
    let instance: DialogInstance = this._initInstance(template);
        
    instance.Message = message;
    instance.Title = title;
    instance.ButtonOk = buttonOk == '' ? 'OK' : buttonOk;
    instance.ButtonCancel = buttonCancel == '' ? 'Cancel' : buttonCancel;

    if(type != 'CONFIRM') {
        this.renderer.addClass(instance.ButtonCancelRef.nativeElement, 'hide');
    }
    else {
        this.renderer.removeClass(instance.ButtonCancelRef.nativeElement, 'hide');
        instance.ButtonOk = buttonOk == '' ? 'Yes' : buttonOk;
        instance.ButtonCancel = buttonCancel == '' ? 'No' : buttonCancel;
    }

    return instance;
  }

  public open(type: string, message: string, title: string = 'Heads up!', buttonOk: string = 'OK', buttonCancel = 'Cancel'): DialogInstance {
    let instance = this.get(type, message, title, buttonOk, buttonCancel);
    instance.Ref.afterClosed().subscribe(result => {});
    return instance;
  }
}



export class DialogInstance {
  private _ref!: MatDialogRef<any>;
  private _title: ElementRef = new ElementRef({});
  private _message: ElementRef = new ElementRef({});
  private _buttonOk: ElementRef = new ElementRef({});
  private _buttonCancel: ElementRef = new ElementRef({});

  constructor(ref: MatDialogRef<any>) {
    this._init(ref);
  }
  
  public get Ref(): MatDialogRef<any> {
    return this._ref;
  }

  public get TitleRef(): ElementRef {
    return this._title;
  }

  public get MessageRef(): ElementRef {
    return this._message;
  }

  public get ButtonOkRef(): ElementRef {
    return this._buttonOk;
  }

  public get ButtonCancelRef(): ElementRef {
    return this._buttonCancel;
  }

  public get Title(): string {
    return this._title.nativeElement.innerHTML;
  }

  public get Message(): string {
    return this._message.nativeElement.innerHTML;
  }

  public get ButtonOk(): string {
    return this._buttonOk.nativeElement.innerHTML;
  }

  public get ButtonCancel(): string {
    return this._buttonCancel.nativeElement.innerHTML;
  }

  public set Title(html: string) {
    this._title.nativeElement.innerHTML = html;
  }

  public set Message(html: string) {
    this._message.nativeElement.innerHTML = html;
  }

  public set ButtonOk(html: string) {
    this._buttonOk.nativeElement.innerHTML = html;
  }

  public set ButtonCancel(html: string) {
    this._buttonCancel.nativeElement.innerHTML = html;
  }

  private _getInfo(ref: MatDialogRef<any>): any {
    var domElement = ref._containerInstance['_elementRef'].nativeElement,
    ret: any = {
      title: domElement.getElementsByClassName('dialog-generic-title').item(0),
      message: domElement.getElementsByClassName('dialog-generic-message').item(0),
      buttonOk: domElement.getElementsByClassName('dialog-generic-button-ok').item(0),
      buttonCancel: domElement.getElementsByClassName('dialog-generic-button-cancel').item(0)
    };

    // DEBUG
    // console.debug(ret);

    return ret;
  }

  private _init(ref: MatDialogRef<any>) {
    let info = this._getInfo(ref);

    this._title = new ElementRef(info.title);
    this._message = new ElementRef(info.message);
    this._buttonOk = new ElementRef(info.buttonOk);
    this._buttonCancel = new ElementRef(info.buttonCancel);

    this._ref = ref;
  }
}
