import { IconNameEnum } from '../../Icon/enum/enum';

export interface IContentEditorSlashMenuItem {
    id: string;
    label: string;
    icon?: string;
    iconName?: `${IconNameEnum}`;
}
