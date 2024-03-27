import { Conf } from "./core/conf";
import { EffectA } from "./parts/effectA";

if(Conf.IS_TOUCH_DEVICE) document.body.classList.add('-touch')
if(!Conf.IS_TOUCH_DEVICE) document.body.classList.add('-mouse')


// 画像うにょうにょ
new EffectA({
  el: document.querySelector('.l-mainCanvas') as HTMLElement,
  transparent: true,
})

