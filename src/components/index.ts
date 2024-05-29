import { sprite } from '@/assets/icons/sprite';
import Badges from './Badges/Badges.vue';
import Button from './Button/Button.vue';
import Icon from './Icon/Icon.vue';
import Switch from './Switch/Switch.vue';

const createInsertSprite = (svgContent: string) => {
  const div = document.createElement('div');
  div.innerHTML = svgContent;
  const svgElement = div.firstElementChild as SVGSVGElement;
  if (svgElement) {
    document.body.appendChild(svgElement);
    console.log('SVG sprite inserted into DOM');
  } else {
    console.error('Failed to insert SVG sprite into DOM');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  createInsertSprite(sprite);
});

export { Badges, Button, Icon, Switch, sprite };
