import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, ShaderMaterial } from "three";
import { Canvas, CanvasConstructor } from "../webgl/canvas";
import { TexLoader } from "../webgl/texLoader";
import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Capture } from "../webgl/capture";
import { MaskA } from "./maskA";
import { MouseMgr } from "../core/mouseMgr";
import { FinishShader } from "../glsl/finishShader";
import { MaskB } from "./maskB";
import { MyObject3D } from "../webgl/myObject3D";

export class EffectA extends Canvas {

  private _con: Object3D

  // マスク用シーン
  private _maskScene: Capture
  private _mask: MyObject3D

  // 描画用シーン
  private _destScene: Capture

  // 最終出力用Mesh
  private _finish: Mesh

  private _mesh: Mesh

  constructor(opt: CanvasConstructor) {
    super(opt)

    this._con = new Object3D()
    this.mainScene.add(this._con)

    // マスク用シーンの準備
    this._maskScene = new Capture()

    // マスクの形
    this._mask = new MaskA()
    // this._mask = new MaskB()
    this._maskScene.add(this._mask)

    // 出力用シーンの準備
    this._destScene = new Capture()

    // 出力用シーン内で描画するオブジェクト
    this._mesh = new Mesh(
      new PlaneGeometry(1, 1, 64, 64),
      new MeshBasicMaterial({
        map: TexLoader.instance.get(Conf.PATH_IMG + 'sample.png'),
        transparent: true,
      })
    )
    this._destScene.add(this._mesh)

    // 最終出力用Mesh
    this._finish = new Mesh(
      new PlaneGeometry(1, 1),
      new ShaderMaterial({
        vertexShader: FinishShader.vertexShader,
        fragmentShader: FinishShader.fragmentShader,
        transparent: true,
        uniforms:{
          destTex:{value: this._destScene.texture()}, // 描画シーンの描画先テクスチャ
          maskTex:{value: this._maskScene.texture()}, // マスクシーンの描画先テクスチャ
        }
      })
    )
    this._con.add(this._finish)

    this._resize()
  }


  protected _update(): void {
    super._update()

    const w = Func.sw()
    const h = Func.sh()

    // 画像のサイズ
    const s = Math.max(w, h) * 1
    this._mesh.scale.set(s, s, 1)

    // 画像を動かす
    // this._mesh.position.x = MouseMgr.instance.easeNormal.x * -w * 0.1
    // this._mesh.position.y = MouseMgr.instance.easeNormal.y * w * 0.1

    // マスク用シーンのレンダリング
    this._maskScene.render(this.renderer, this.cameraPers)

    // 出力用シーンのレンダリング
    this._destScene.render(this.renderer, this.cameraPers)

    // レンダリング
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.render(this.mainScene, this.cameraPers)
  }


  protected _resize(): void {
    super._resize()

    const w = Func.sw()
    const h = Func.sh()

    // シーンのサイズを決める
    this._maskScene.setSize(w, h)
    this._destScene.setSize(w, h)

    this._finish.scale.set(w, h, 1)

    this.renderSize.width = w
    this.renderSize.height = h

    this._updatePersCamera(this.cameraPers, w, h)

    let pixelRatio: number = window.devicePixelRatio || 1

    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(w, h)
    this.renderer.clear()
  }
}
