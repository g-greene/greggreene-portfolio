export class Util {
  static regExp: any = {
    guid: '^[{(]?[0-9A-Fa-f]{8}[-]?(?:[0-9A-Fa-f]{4}[-]?){3}[0-9A-Fa-f]{12}[)}]?$',
    alpha: '^[a-zA-Z ]+$',
    numeric: '^[0-9]+$',
    alphaNumeric: '^[a-zA-Z0-9]+$'
  };

  static isEmpty(obj: any): boolean | undefined {
    if(typeof obj == 'string') {
      return Util.isStringEmpty(obj);
    }
    else if(typeof obj == 'object') {
      return Util.isArrayEmpty(obj);
    }
    
    return false;
  };

  static isStringEmpty(obj: any) {
    if(obj == null)
      return true;
  
    //alert(typeof (obj))
  
    // Note: "abc" == "string"; new String("abc") == "object"
    if(typeof obj != "string" && typeof obj != "object")
      return true;
  
    if(typeof (obj) == "object" && !(obj instanceof String))
      return true;
  
    // if Number?
    obj = new String(obj);
  
    if(obj.replace(/\s/gi, "") == "")
      return true;
  
      if(obj.replace(/\s/gi, "") == "undefined")
      return true;
  
    return false;
  };
  
  static isArrayEmpty = function (o: any, descendants_too: boolean = false, depth: number = 0): boolean | undefined {
    let ret: any = true,
      count = 0;
  
    if (typeof o != 'object' || !o)
      return true;
  
    if (depth >= 100)
      throw new Error('isArrayEmpty: possible circular reference');
  
    count = Util.count(o);
  
    if (count > 1) {
      ret = false;
    }
    else {
      if (count == 1 && typeof o[0] == 'object') {
        if (!descendants_too)
          return false;
  
        ret = Util.isArrayEmpty(o[0], descendants_too, depth + 1);
      }
      else if (count == 1) {
        ret = Util.isEmpty(o[0]);
      }
    }
  
    return ret;
  };
  
  static count(obj: any): number {
    let i = 0;
    for (let m in obj) { i++; }
    return i;
  };

  static get(obj: any, s: string, default_fail: string = '') {
    return typeof obj == 'object' ? (s in obj) ? obj[s] : default_fail : default_fail;
  }

  static tryGet(s: string, regex: string, default_fail: string = '') {
    return ((new RegExp(regex, 'gim')).test(s) ? s : default_fail);
  };

  static isEmptyResultset(a: any[]): boolean {
    a = a || [];
    return a.length == 0 || (a.length == 1 && (a[0] == null || a[0] == '' || ("" in a[0]))) ? true : false;
  }

  static urlArg (key: string): string {
    let results = new RegExp('[\?&]' + key + '=([^&#]*)')
      .exec(window.location.search);
    return (results !== null) ? results[1] || '' : '';
  };
  
  static urlPath (n: number): string {
    let results = window.location.pathname.split('/');
    return (results !== null) ? results[n] || '' : '';
  };

  static copyToClipboard(text: string, callback: Function = ()=>{}) {
    if (!window.navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      callback({ result: 'SUCCESS', error: {}});
    }, function (err) {
        callback({ result: 'FAIL', error: err });
    });
  };

  static randomf(start: number, end: number): number {
    start = typeof start == 'undefined' ? 0 : start;
    end = typeof end == 'undefined' ? 1 : end;
    return ((end) - start) * Math.random();
  };
  
  static randomi(start: number, end: number): number {
    return parseInt(Util.randomf(start, end) + '');
  };

  static checkGetGuid(s: any): any {
    return Util.tryGet(s, Util.regExp.guid);
  };
  
  static tryGetGuid(s: any): any {
    return Util.tryGet(s, Util.regExp.guid);
  };
  
  static isGuid(s: any): any {
    return (new RegExp(Util.regExp.guid, 'gim')).test(s);
  };

  static toRecord(data: any) {
    var r: any = {};
    if(data instanceof FormData) {
      // DEBUG
      // console.debug('looping through fields');
      data.forEach((value: FormDataEntryValue, key: string, parent: FormData) => {
        r[key] = value.toString();
        // DEBUG
        // console.debug(r);
      });
    }
    else {
      r = data;
    }

    return r;
  }

  static getDates(startDate: string = 'today', endDate: string = 'today'): any[] {
    let ret: any[] = [];
    let raw_sd = startDate, raw_ed = endDate;
		
		let sd = (raw_sd == 'today' ? Date.now() : (raw_sd.indexOf('d') == raw_sd.length-1 ? (parseInt(raw_sd) * 24 * 60 * 60 * 1000) + Date.now() : Date.parse(raw_sd)));
		let ed = (raw_ed == 'today' ? Date.now() : (raw_ed.indexOf('d') == raw_ed.length-1 ? (parseInt(raw_ed) * 24 * 60 * 60 * 1000) + Date.now() : Date.parse(raw_ed)));
		
		if(isNaN(sd)) {
			sd = Date.now();
    }
		
		if(isNaN(ed)) {
			ed = Date.now();
    }

		sd += 1 * 24 * 60 * 60 * 1000;

		let date_sd = new Date(sd);
		let date_ed = new Date(ed);
		
		console.debug(date_sd.toLocaleDateString());
		console.debug(date_ed.toLocaleDateString());
		
		let offset_time_sd = ((date_sd.getMinutes() * 60 + date_sd.getSeconds()) * 1000) + date_sd.getMilliseconds();
		let offset_time_ed = ((date_ed.getMinutes() * 60 + date_ed.getSeconds()) * 1000) + date_ed.getMilliseconds();
		
		sd -= offset_time_sd;
		ed -= offset_time_ed;
		
		let diff = Math.abs(ed - sd);
		let diff_days = Math.round((((diff / 1000) / 60) / 60) / 24);

		for(let i = 1; i <= diff_days; i++) {
			let prev_date = new Date(sd - Math.floor(i * 24 * 60 * 60 * 1000));
			
			//UTC to avoid DST
			let date_string = (prev_date.getUTCMonth() + 1) + '/' + prev_date.getUTCDate() + '/' + prev_date.getUTCFullYear();
			ret.push({ key: date_string, value: date_string });
		}

    return ret;
  }
}

export class DateUtil {
  static diff(interval: string, date1: string, date2: string = ''): number {
    let mult: any = {
      'd': 1000 * 60 * 60 * 24,
      'mm': 1000 * 60 * 60,
      'ss': 1000 * 60
    }, 
    d1: number = Date.parse(date1), 
    d2: number = (date2 == '' ? Date.now() : Date.parse(date2));

    return ((d2 - d1) / mult[interval]);
  }
}

export class Browser {
  static queryParameter(key: string): string {
    let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.search);
    return (results !== null) ? results[1] || '' : '';
  }

  static urlPath(n: number): string {
    let results = window.location.pathname.split('/');
    return (results !== null) ? results[n] || '' : '';
  }
}

export class UserAgent {
  static isMobile(): boolean {
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        return true;
      }
      return false;
  }

  static browser(): string {
    return('ua:' + navigator.userAgent);
  }

  static version(): string {
    var re = /rv:([0-9.]+)/gim;
    let v = re.exec(navigator.userAgent);
    return(v ? v.length > 1 ? v[1] : '' : '');
  }
}

export class Device {
  static isMobile(): boolean {
      return window.innerWidth <= 759 ? true : false;
   }

   static isTablet(): boolean {
      return window.innerWidth <= 1229 && window.innerWidth > 759 ? true : false;
   }

   static isDesktop(): boolean {
      return window.innerWidth >= 1230 ? true : false;
   }
 }

export class Uuid {
    static create(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
