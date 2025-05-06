import { defineCustomElement } from 'vue';
import Badges from './components/Badges/Badges.ce.vue';

/*
const components = {
  BadgesCe
};
*/

const BadgesElement = defineCustomElement(Badges);

customElements.define(`yui-badges`, BadgesElement);
