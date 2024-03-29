const FinishShader = {
  uniforms: {},

  vertexShader: /* glsl */ `
    uniform float time;
    varying vec2 vUv;

    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,

  fragmentShader: /* glsl */ `
    uniform sampler2D destTex;
    uniform sampler2D maskTex;

    varying vec2 vUv;

    void main(void) {
      vec4 d = texture2D(destTex, vUv);
      vec4 m = texture2D(maskTex, vUv);

      // r=1.0なら描画
      d.a = m.r;

      gl_FragColor = d;
      // gl_FragColor = m;
    }`,
}

export { FinishShader }
