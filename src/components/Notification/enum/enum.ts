import { IconNameEnum } from '../../Icon/enum/enum';

export enum MessageTypeEnum {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

export enum MessageTitleDefaultEnum {
  success = 'Успешно',
  warning = 'Предупреждение',
  error = 'Ошибка',
  info = 'Уведомление'
}

export enum MessageIconEnum {
  success = IconNameEnum.checkbox,
  warning = IconNameEnum.alertTriangle,
  error = IconNameEnum.exitCircle,
  info = IconNameEnum.info
}
