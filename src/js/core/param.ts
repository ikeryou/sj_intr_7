import GUI from 'lil-gui'
import { Conf } from './conf'

export class Param {
  private static _instance: Param

  private _dat: any
  private _debug: HTMLElement | any 

  public bg = {
    radius:{value:18, min:0, max:100},
  }

  constructor() {
    if (Conf.FLG_PARAM) {
      this.makeParamGUI()
    }

    if(Conf.FLG_DEBUG_TXT) {
      this._debug = document.createElement('div')
      this._debug.classList.add('l-debug')
      document.body.appendChild(this._debug)
    }
  }

  public static get instance(): Param {
    if (!this._instance) {
      this._instance = new Param()
    }
    return this._instance
  }

  public makeParamGUI(): void {
    if (this._dat != undefined) return

    this._dat = new GUI()
    this._add(this.bg, 'bg')

    this._dat.domElement.style.zIndex = 99999999999999
  }

  private _add(obj: any, folderName: string): void {
    const folder = this._dat.addFolder(folderName)
    for (const key in obj) {
      const val: any = obj[key]
      if (val.use == undefined) {
        if (val.type == 'color') {
          folder.addColor(val, 'value').name(key)
        } else {
          if (val.list != undefined) {
            folder.add(val, 'value', val.list).name(key)
          } else {
            folder.add(val, 'value', val.min, val.max).name(key)
          }
        }
      }
    }
  }

  public addDebug(t: string): void {
    if(this._debug != undefined) {
      console.log(t)
      this._debug.innerHTML += t + '<br>'
    }
  }

  public setDebug(t: string): void {
    if(this._debug != undefined) {
      this._debug.innerHTML = t
    }
  }
}
