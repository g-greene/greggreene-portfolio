import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import * as colorconvert from 'color-convert'
import { Uuid } from '../Util';

@Component({
  selector: 'app-puck',
  templateUrl: './puck.component.html',
  styleUrls: ['./puck.component.css']
})
export class PuckComponent implements OnInit {

  id = Uuid.create();

  @Input() colorDarker: string = '#eeeeee60';
  @Input() colorLighter: string = '';
  @Input() color: string = '#eeeeee60';
  @Input() position: string = 'center center';
  @Input() backgroundColor: string = '#00000050';

  @ViewChild('puck', {static: false}) puck!: ElementRef;
  @ViewChild('puckPallete', {static: false}) puckPallete!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  rgb(rgb: string): [number, number, number] {
    // DEBUG
    // alert(rgb);

    var rgb_match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  
    // Check if rgb is null
    if (rgb_match == null ) {
      // You could repalce the return with a default color, i.e. the line below
      // return "#ffffff"
      throw new Error('invalid rgb format');
    }
  
    return [
      parseInt(rgb_match[1]), parseInt(rgb_match[2]), parseInt(rgb_match[3])
    ];
    
  }

  rgbString(rgb: [number, number, number]): string {
    return('rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')');
  }

  rgb2hex(rgb: string): string {
    // DEBUG
    // alert(rgb);

    var rgb_match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  
    // DEBUG
    // alert(rgb_match);

    function hex(x:any) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    
    // Check if rgb is null
    if (rgb_match == null ) {
      // You could repalce the return with a default color, i.e. the line below
      // return "#ffffff"
      throw new Error('invalid rgb format');
    }
  
    return "#" + hex(rgb_match[1]) + hex(rgb_match[2]) + hex(rgb_match[3]);
    
  }

  onClick(): void {
    let puck = this.puck,
        darker_color = this.colorDarker,
        background_color = this.color, // this.puckPallete.nativeElement.style.backgroundColor,
        background_color_as_hex = '',
        bg = ''; //'linear-gradient(102deg, #a6d7ff77 0%, #a6d7ff77 50%, ' + background_color + ' 50%, ' + background_color + ' 100%) no-repeat';

        // alert(background_color);

        try {
          var hsl = colorconvert.rgb.hsl(this.rgb(background_color));
          hsl[2] = 90;
          
          var rgb_new = colorconvert.hsl.rgb(hsl),
          rgb_new_string = this.rgbString(rgb_new);

          // alert(background_color + ', ' + rgb_new_string);
          background_color_as_hex = this.rgb2hex(this.rgbString(rgb_new)); // this.rgb2hex(background_color);
          bg = 'linear-gradient(102deg, ' + background_color_as_hex + '70 0%, ' + background_color_as_hex + '70 50%, ' + background_color + ' 50%, ' + background_color + ' 100%) no-repeat';
        }
        catch(error: any) {
          alert(error);
        }

        document.body.style.background = bg;
        document.body.style.backgroundColor = background_color;

        document.body.style.setProperty('--site-theme-shadow-color', this.colorDarker!);
  }
}
