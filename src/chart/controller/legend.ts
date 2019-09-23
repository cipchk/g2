import * as _ from '@antv/util';
import { Attribute, Scale } from '../../dependents';
import { Legend } from '../__components__';
import { ComponentType, DIRECTION, LAYER } from '../constant';
import { ComponentOption, LegendCfg } from '../interface';
import View from '../view';

/**
 * 创建 legend 组件
 * @param container
 * @param legends
 * @param view
 */

export function createLegends(container: any, legends: Record<string, LegendCfg>, view: View): ComponentOption[] {
  const legendArray: ComponentOption[] = [];

  const legendAttributes = view.getLegendAttributes();

  _.each(legendAttributes, (attr: Attribute) => {
    const scale = attr.getScale(attr.type);
    const legendCfg = _.get(legends, [scale.field]);

    // 如果配置中，用户没有关闭 legend，则添加组件
    if (legendCfg !== false) {
      legendArray.push({
        component: new Legend(container.addGroup(), [0, 0], { text: `legend ${scale.field}` }),
        layer: LAYER.FORE,
        direction: DIRECTION.TOP,
        type: ComponentType.LEGEND,
      });
    }
  });

  return legendArray;
}