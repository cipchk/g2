import { each } from '@antv/util';
import Action from '../base';
import { getDelegationObject, getElements, getElementValue, isList, isSlider } from '../util';

/**
 * 元素过滤的 Action，控制元素的显示隐藏
 */
class ElementFilter extends Action {
  /**
   * 过滤
   */
  public filter() {
    const delegateObject = getDelegationObject(this.context);
    if (delegateObject) {
      const view = this.context.view;
      const { component } = delegateObject;
      const field = component.get('field');
      const elements = getElements(view);
      // 列表类的组件能够触发
      if (isList(delegateObject)) {
        if (field) {
          const unCheckedItems = component.getItemsByState('unchecked');
          const scale = view.getScaleByField(field);
          const names = unCheckedItems.map((item) => item.name);
          // 直接控制显示、隐藏
          each(elements, (el) => {
            const value = getElementValue(el, field);
            const text = scale.getText(value);
            if (names.indexOf(text) >= 0) {
              el.hide();
            } else {
              el.show();
            }
          });
        }
      } else if (isSlider(delegateObject)) {
        const range = component.getValue();
        const [min, max] = range;
        each(elements, (el) => {
          const value = getElementValue(el, field);
          if (value >= min && value <= max) {
            el.show();
          } else {
            el.hide();
          }
        });
      }
    }
  }
  /**
   * 清除过滤
   */
  public clear() {
    const elements = getElements(this.context.view);
    each(elements, (el) => {
      el.show();
    });
  }
}

export default ElementFilter;