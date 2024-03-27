import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { MyObject3D } from '../webgl/myObject3D'
import { Func } from '../core/func'
import { Util } from '../libs/util'

export class MaskA extends MyObject3D {

  private _item: Array<Mesh> = []
  // private _line: number = 10
  private _line: number = 1

  constructor() {
    super()

    const geo = new PlaneGeometry(1, 1)
    const mat = new MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      side: DoubleSide
    })

    const num = this._line * this._line
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

    const size = (Math.max(sw, sh) / this._line) * 1

    this._item.forEach((mesh, i) => {
      const ix = i % this._line
      const iy = Math.floor(i / this._line)

      const scale = Util.map(Math.sin(Util.radian(ix * iy * 10 + this._c * 2)), 0.01, 1, -1, 1)

      if(this._line > 1) {
        mesh.position.x = ix * size - sw / 2 + size / 2
        mesh.position.y = iy * size - sh / 2 + size / 2
      }
      
      mesh.scale.set(size * scale, size * scale, 1)

      // mesh.rotation.y = Util.radian(ix * iy * 10 + this._c * 5)
    })
  }

  // ---------------------------------
  // リサイズ
  // ---------------------------------
  protected _resize(): void {
    super._resize()

    
  }
}
