import { CircleGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { MyObject3D } from '../webgl/myObject3D'
import { Func } from '../core/func'
import { Util } from '../libs/util'
import { MouseMgr } from '../core/mouseMgr'

export class MaskB extends MyObject3D {

  private _item: Array<Mesh> = []

  constructor() {
    super()

    const geo = new CircleGeometry(0.5, 64, 64)
    const mat = new MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
    })

    const num = 1
    for (let i = 0; i < num; i++) {
      const mesh = new Mesh(geo, mat)
      this._item.push(mesh)
      this.add(mesh)
    }

    this._resize()
  }

  
  // ---------------------------------
  // 更新
  // ---------------------------------
  protected _update(): void {
    super._update()

    const sw = Func.sw()
    const sh = Func.sh()

    const size = Math.max(sw, sh) * 0.25

    this._item[0].scale.set(size, size, 1)

    this._item[0].position.x = MouseMgr.instance.easeNormal.x * sw * 0.5
    this._item[0].position.y = MouseMgr.instance.easeNormal.y * -sh * 0.5
  }

  // ---------------------------------
  // リサイズ
  // ---------------------------------
  protected _resize(): void {
    super._resize()

    
  }
}
