import { IconNameEnum } from './enum/enum';
import { IVectorIcon } from './interface/interface';

export const alertTriangle: IVectorIcon = {
  name: 'alert-triangle',
  style: 'line',
  viewbox: '0 0 20 20',
  path: `
<path d="M8.57465 3.21659L1.51632 14.9999C1.37079 15.2519 1.29379 15.5377 1.29298 15.8287C1.29216 16.1197 1.36756 16.4059 1.51167 16.6587C1.65579 16.9115 1.86359 17.1222 2.11441 17.2698C2.36523 17.4174 2.65032 17.4967 2.94132 17.4999H17.058C17.349 17.4967 17.6341 17.4174 17.8849 17.2698C18.1357 17.1222 18.3435 16.9115 18.4876 16.6587C18.6317 16.4059 18.7071 16.1197 18.7063 15.8287C18.7055 15.5377 18.6285 15.2519 18.483 14.9999L11.4247 3.21659C11.2761 2.97168 11.0669 2.76919 10.8173 2.62866C10.5677 2.48813 10.2861 2.41431 9.99965 2.41431C9.71321 2.41431 9.43159 2.48813 9.18199 2.62866C8.93238 2.76919 8.72321 2.97168 8.57465 3.21659Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10 7.5V10.8333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14.1666H10.0095" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const help: IVectorIcon = {
  name: IconNameEnum.help,
  style: 'line',
  fill: 'none',
  path: `
<path d="M11.5 21C16.4706 21 20.5 16.9706 20.5 12C20.5 7.02944 16.4706 3 11.5 3C6.52944 3 2.5 7.02944 2.5 12C2.5 16.9706 6.52944 21 11.5 21Z" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.88135 9.3C9.09294 8.6985 9.51058 8.1913 10.0603 7.86822C10.61 7.54514 11.2564 7.42704 11.8848 7.53484C12.5133 7.64264 13.0833 7.96937 13.4939 8.45718C13.9046 8.94498 14.1293 9.56237 14.1283 10.2C14.1283 12 11.4283 12.9 11.4283 12.9" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 16.5H11.508" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
  </path>`
};

export const notification: IVectorIcon = {
  name: 'notification',
  style: 'line',
  path: `
    <path
      d="M11.7199 21.1649C12.2013 21.1631 12.6628 20.9711 13.0031 20.6306C13.3436 20.2901 13.5357 19.8288 13.5374 19.3474H9.90235C9.90404 19.8288 10.0962 20.2901 10.4367 20.6306C10.777 20.9711 11.2385 21.1631 11.7199 21.1649ZM18.2665 16.3565C17.8556 15.9477 17.624 15.3921 17.6225 14.8123V10.7184C17.6225 9.48322 17.2346 8.27925 16.5136 7.2764C15.7925 6.27339 14.7746 5.52242 13.6037 5.12914C13.4529 5.08036 13.3215 4.98513 13.228 4.85727C13.1344 4.72926 13.0838 4.57509 13.0832 4.4166C13.0883 4.05534 12.9532 3.70609 12.7065 3.44223C12.4598 3.17821 12.1205 3.01987 11.7597 3.00065C11.3915 2.98927 11.0346 3.12759 10.7702 3.38407C10.5058 3.64055 10.3567 3.9932 10.3568 4.36151V4.41659C10.3562 4.57507 10.3056 4.72923 10.212 4.85726C10.1185 4.98512 9.9871 5.08036 9.83632 5.12913C8.66544 5.52239 7.64754 6.27338 6.92639 7.27639C6.2054 8.27925 5.81755 9.48317 5.81755 10.7184V14.8056C5.81601 15.3854 5.58445 15.9408 5.17348 16.3496L4.6419 16.8812C4.23357 17.2917 4.00307 17.8462 4 18.4251H19.44C19.4369 17.8462 19.2064 17.2917 18.7981 16.8812L18.2665 16.3565Z"
      fill="currentColor">
    </path>`
};

export const moonFill: IVectorIcon = {
  name: 'moon-fill',
  style: 'line',
  path: `
    <path
      d="M21.958 15.325C22.162 14.839 21.579 14.425 21.09 14.641C20.1126 15.07 19.0565 15.2907 17.989 15.289C13.804 15.289 10.412 11.965 10.412 7.864C10.4105 6.47934 10.8039 5.12297 11.546 3.954C11.83 3.506 11.489 2.886 10.969 3.018C6.96 4.041 4 7.613 4 11.862C4 16.909 8.175 21 13.326 21C17.226 21 20.566 18.655 21.958 15.325Z"
      fill="currentColor" />
    <path
      d="M15.611 3.103C15.081 2.749 14.449 3.381 14.802 3.911L15.432 4.856C15.6876 5.23916 15.824 5.68942 15.824 6.15C15.824 6.61057 15.6876 7.06084 15.432 7.444L14.802 8.389C14.449 8.919 15.082 9.551 15.612 9.197L16.556 8.567C16.9392 8.31143 17.3894 8.17505 17.85 8.17505C18.3106 8.17505 18.7608 8.31143 19.144 8.567L20.089 9.197C20.619 9.551 21.251 8.919 20.897 8.389L20.267 7.444C20.0114 7.06084 19.8751 6.61057 19.8751 6.15C19.8751 5.68942 20.0114 5.23916 20.267 4.856L20.897 3.911C21.251 3.381 20.619 2.749 20.088 3.103L19.144 3.733C18.7608 3.98857 18.3106 4.12495 17.85 4.12495C17.3894 4.12495 16.9392 3.98857 16.556 3.733L15.611 3.103Z"
      fill="currentColor" />`
};

export const arrowLeft: IVectorIcon = {
  name: 'arrow-left',
  style: 'line',
  path: `
    <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  />
    <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
};

export const arrowUp: IVectorIcon = {
  name: 'arrow-up',
  style: 'line',
  viewbox: '0 0 16 16',
  path: `
    <path d="M8 13.3333V2.66663M8 2.66663L4 6.66663M8 2.66663L12 6.66663" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>

    `
};

export const arrowDown: IVectorIcon = {
  name: 'arrow-down',
  style: 'line',
  viewbox: '0 0 16 16',
  path: `
    <path d="M8 2.66663V13.3333M8 13.3333L12 9.33329M8 13.3333L4 9.33329" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const stepArrowUp: IVectorIcon = {
  name: 'step-arrow-up',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
       <path d="M12 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M5 12L12 5L19 12" stroke="currentColor" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const stepArrowDown: IVectorIcon = {
  name: 'step-arrow-up',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
      <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 12L12 19L5 12" stroke="currentColor" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const chevronDown: IVectorIcon = {
  name: 'chevron-down',
  style: 'line',
  fill: 'none',
  path: `
    <path d="M18 9L12 15L6 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const chevronRight: IVectorIcon = {
  name: 'chevron-right',
  viewbox: '0 0 24 25',
  style: 'line',
  path: `
<path d="M9 18.6271L15 12.6271L9 6.62714" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `
};

export const chevronLeft: IVectorIcon = {
  name: 'chevron-left',
  viewbox: '0 0 24 25',
  style: 'line',
  path: `
<path d="M15 18.6271L9 12.6271L15 6.62714" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `
};

export const chevronUp: IVectorIcon = {
  name: 'chevron-up',
  style: 'line',
  fill: 'none',
  path: `
<path d="M6.97559 15L12.9756 9L18.9756 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const checkbox: IVectorIcon = {
  name: 'checkbox',
  style: 'line',
  fill: 'none',
  path: `
<path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0Z" fill="currentColor"/>
<path d="M19 7L9 17.01L6 14.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const dark: IVectorIcon = {
  name: 'dark',
  style: 'line',
  path: `
    <path
      d="M15.3636 16.6364C15.3636 15.6117 14.9566 14.6289 14.232 13.9044C13.5074 13.1798 12.5247 12.7727 11.5 12.7727C10.4753 12.7727 9.49257 13.1798 8.768 13.9044C8.04342 14.6289 7.63636 15.6117 7.63636 16.6364"
      stroke="currentColor" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M11.5 9.68182V4.27273" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M5.48818 10.6245L6.58545 11.7218" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M3 16.6364H4.54545" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round"  />
    <path d="M18.4545 16.6364H20" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M16.4145 11.7218L17.5118 10.6245" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M20 19.7273H3" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M14.5909 6.59091L11.5 9.68182L8.40909 6.59091" stroke="currentColor" stroke-width="1.54545"
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
};

export const exitBig: IVectorIcon = {
  name: 'exit-big',
  style: 'line',
  fill: 'none',
  path: `
    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
};

export const exitSmall: IVectorIcon = {
  name: 'exit-small',
  style: 'line',
  path: `
    <path d="M16 8L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 8L16 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />`
};

export const externalLink: IVectorIcon = {
  name: 'external-link',
  style: 'line',
  fill: 'none',
  path: `
<path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 3H21V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14L21 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const exit: IVectorIcon = {
  name: 'exit',
  style: 'line',
  path: `
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M20.7569 12.5228L17.944 15.2781C17.1669 16.0531 16.0008 14.8906 16.7779 14.1155L17.7274 13.1721C17.9436 12.9574 17.8725 12.7834 17.5686 12.7834H8.29528C7.83503 12.7834 7.4685 12.4153 7.4685 11.9612C7.4685 11.5082 7.83866 11.1392 8.29528 11.1392H17.5686C17.8713 11.1392 17.9436 10.965 17.7274 10.7503L16.7779 9.80675C16.0008 9.03193 17.1668 7.86914 17.944 8.64416L20.753 11.3712C21.0814 11.6899 21.082 12.2044 20.7569 12.5229L20.7569 12.5228ZM15.9011 6.61737C16.2766 6.99289 16.2766 7.60188 15.9011 7.97763C15.5254 8.35315 14.9164 8.35315 14.5409 7.97763C12.3408 5.77758 8.77377 5.77758 6.57382 7.97763C4.37386 10.1777 4.37377 13.7447 6.57382 15.9447C8.77387 18.1447 12.3409 18.1447 14.5409 15.9447C14.9164 15.569 15.5254 15.569 15.9011 15.9447C16.2766 16.3202 16.2766 16.9292 15.9011 17.3049C12.9498 20.2562 8.16472 20.2562 5.21346 17.3049C2.2622 14.3536 2.26215 9.56853 5.21346 6.61727C8.16477 3.66601 12.9498 3.66596 15.9011 6.61727V6.61737Z"
      fill="currentColor" />`
};

export const exitCircle: IVectorIcon = {
  name: 'exit-circle',
  style: 'line',
  fill: 'none',
  path: `
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const leftBigSmall: IVectorIcon = {
  name: 'left-big-small',
  style: 'line',
  path: `
    <path d="M12.5 15L10 12L12.5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" fill="none"/>`
};

export const leftBig: IVectorIcon = {
  name: 'left-big',
  style: 'line',
  path: `
     <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const light: IVectorIcon = {
  name: 'light',
  style: 'line',
  path: `
    <path
      d="M15.3636 16.6364C15.3636 15.6117 14.9566 14.6289 14.232 13.9044C13.5074 13.1798 12.5247 12.7727 11.5 12.7727C10.4753 12.7727 9.49257 13.1798 8.76799 13.9044C8.04342 14.6289 7.63636 15.6117 7.63636 16.6364"
      stroke="currentColor" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M11.5 4.27273V9.68182" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M5.48818 10.6245L6.58545 11.7218" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M3 16.6364H4.54545" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M18.4545 16.6364H20" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M16.4145 11.7218L17.5118 10.6245" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M20 19.7273H3" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M8.40909 7.36364L11.5 4.27273L14.5909 7.36364" stroke="currentColor" stroke-width="1.54545"
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
};

export const notificationYes: IVectorIcon = {
  name: 'notification-yes',
  style: 'line',
  path: `
    <path
      d="M11.7199 21.1649C12.2013 21.1631 12.6628 20.9711 13.0031 20.6306C13.3436 20.2901 13.5357 19.8288 13.5374 19.3474H9.90235C9.90404 19.8288 10.0962 20.2901 10.4367 20.6306C10.777 20.9711 11.2385 21.1631 11.7199 21.1649ZM18.2665 16.3565C17.8556 15.9477 17.624 15.3921 17.6225 14.8123V10.7184C17.6225 9.48322 17.2346 8.27925 16.5136 7.2764C15.7925 6.27339 14.7746 5.52242 13.6037 5.12914C13.4529 5.08036 13.3215 4.98513 13.228 4.85727C13.1344 4.72926 13.0838 4.57509 13.0832 4.4166C13.0883 4.05534 12.9532 3.70609 12.7065 3.44223C12.4598 3.17821 12.1205 3.01987 11.7597 3.00065C11.3915 2.98927 11.0346 3.12759 10.7702 3.38407C10.5058 3.64055 10.3567 3.9932 10.3568 4.36151V4.41659C10.3562 4.57507 10.3056 4.72923 10.212 4.85726C10.1185 4.98512 9.9871 5.08036 9.83632 5.12913C8.66544 5.52239 7.64754 6.27338 6.92639 7.27639C6.2054 8.27925 5.81755 9.48317 5.81755 10.7184V14.8056C5.81601 15.3854 5.58445 15.9408 5.17348 16.3496L4.6419 16.8812C4.23357 17.2917 4.00307 17.8462 4 18.4251H19.44C19.4369 17.8462 19.2064 17.2917 18.7981 16.8812L18.2665 16.3565Z"
      fill="currentColor" />
    <circle cx="17" cy="7" r="4" fill="#FF344D" />`
};

export const plusSmall: IVectorIcon = {
  name: 'plus-small',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
<path d="M12 6.34315V17.6569" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.34314 12H17.6568" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>`
};

export const plus16: IVectorIcon = {
  name: 'plus-16',
  style: 'line',
  viewbox: '0 0 16 16',
  path: `
<path d="M7.6665 3.6665V12.3331" stroke="currentColor" stroke-width="1.23809" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.3335 8H12.0001" stroke="currentColor" stroke-width="1.23809" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const plus: IVectorIcon = {
  name: 'plus',
  style: 'line',
  viewbox: '0 0 24 22',
  path: `
<path d="M12.0001 3.51472V20.4853" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.51477 12H20.4853" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
};

export const minus: IVectorIcon = {
  name: 'minus',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
    <path d="M3.51465 12H20.4852" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const profileIcon: IVectorIcon = {
  name: 'profile-icon',
  style: 'line',
  path: `
         <path
      d="M15.8498 8.84991C15.8498 6.73244 14.1173 5 11.9999 5C9.88252 5 8.15002 6.7325 8.15002 8.84991C8.15002 10.9673 9.88252 12.6998 11.9999 12.6998C14.1173 12.6998 15.8498 10.9673 15.8498 8.84991Z"
      fill="currentColor" />
    <path
      d="M13.5224 13.5047C13.0325 13.6622 12.5249 13.7497 11.9999 13.7497C11.4749 13.7497 10.9674 13.6622 10.4774 13.5047C8.93745 12.9972 7.2224 13.4172 6.2075 14.6597C5.45492 15.5872 5 16.7773 5 18.0548C5 18.7724 5.5775 19.3499 6.29504 19.3499H17.705C18.4225 19.3499 19 18.7724 19 18.0548C19 16.7774 18.545 15.5873 17.7925 14.6597C16.76 13.4173 15.0624 12.9973 13.5223 13.5047H13.5224Z"
      fill="currentColor" />`
};

export const profile: IVectorIcon = {
  name: 'profile',
  style: 'line',
  path: `
    <path
      d="M19 19.875V18.125C19 17.1967 18.6313 16.3065 17.9749 15.6501C17.3185 14.9937 16.4283 14.625 15.5 14.625H8.5C7.57174 14.625 6.6815 14.9937 6.02513 15.6501C5.36875 16.3065 5 17.1967 5 18.125V19.875"
      stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
    <path
      d="M12 11.125C13.933 11.125 15.5 9.558 15.5 7.625C15.5 5.692 13.933 4.125 12 4.125C10.067 4.125 8.5 5.692 8.5 7.625C8.5 9.558 10.067 11.125 12 11.125Z"
      stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
};

export const rightBig: IVectorIcon = {
  name: 'right-big',
  style: 'line',
  path: `
    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
`
};

export const rightSmall: IVectorIcon = {
  name: 'right-small',
  style: 'line',
  path: `
    <path d="M11 9L13.5529 11.9551L11.1066 14.9991" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round"  fill="none" />`
};

export const settings: IVectorIcon = {
  name: 'settings',
  style: 'line',
  path: `
<path d="M19.6845 13.0172V11.976L21.0264 10.8328C21.2738 10.6205 21.4361 10.3299 21.4847 10.0124C21.5333 9.69483 21.4651 9.37079 21.292 9.09751L19.6426 6.37552C19.52 6.16883 19.3438 5.99715 19.1315 5.87771C18.9193 5.75827 18.6786 5.69527 18.4334 5.69502C18.2815 5.69389 18.1304 5.71687 17.9861 5.76307L16.2877 6.32108C15.9949 6.13074 15.689 5.96022 15.3722 5.81071L15.0157 4.09585C14.9518 3.78255 14.7767 3.50112 14.5212 3.30083C14.2656 3.10053 13.9459 2.99413 13.6179 3.00025H10.3469C10.0189 2.99413 9.69914 3.10053 9.44359 3.30083C9.18804 3.50112 9.01298 3.78255 8.94907 4.09585L8.59262 5.81071C8.27388 5.96086 7.96568 6.13136 7.67004 6.32108L6.00661 5.73585C5.86074 5.69885 5.70969 5.68506 5.5593 5.69502C5.31417 5.69527 5.07341 5.75827 4.86119 5.87771C4.64896 5.99715 4.47273 6.16883 4.35016 6.37552L2.70071 9.09751C2.53757 9.37038 2.47695 9.68999 2.52923 10.0016C2.5815 10.3132 2.74343 10.5974 2.98726 10.8056L4.30823 11.9828V13.024L2.98726 14.1672C2.73654 14.3768 2.57019 14.6661 2.51773 14.9838C2.46527 15.3014 2.5301 15.6269 2.70071 15.9025L4.35016 18.6245C4.47273 18.8312 4.64896 19.0029 4.86119 19.1223C5.07341 19.2417 5.31417 19.3047 5.5593 19.305C5.71121 19.3061 5.86229 19.2831 6.00661 19.2369L7.70499 18.6789C7.99782 18.8693 8.30374 19.0398 8.62057 19.1893L8.97703 20.9042C9.04094 21.2174 9.21599 21.4989 9.47154 21.6992C9.7271 21.8995 10.0469 22.0059 10.3749 21.9998H13.6738C14.0018 22.0059 14.3216 21.8995 14.5771 21.6992C14.8327 21.4989 15.0077 21.2174 15.0716 20.9042L15.4281 19.1893C15.7468 19.0391 16.055 18.8686 16.3506 18.6789L18.042 19.2369C18.1864 19.2831 18.3374 19.3061 18.4894 19.305C18.7345 19.3047 18.9752 19.2417 19.1875 19.1223C19.3997 19.0029 19.5759 18.8312 19.6985 18.6245L21.292 15.9025C21.4552 15.6296 21.5158 15.31 21.4635 14.9984C21.4112 14.6868 21.2493 14.4026 21.0055 14.1944L19.6845 13.0172ZM18.4334 17.944L16.0361 17.1546C15.4746 17.6169 14.8333 17.9787 14.1421 18.223L13.6458 20.666H10.3469L9.85068 18.2502C9.16486 17.999 8.52703 17.6379 7.96359 17.1818L5.5593 17.944L3.90984 15.222L5.81091 13.5888C5.68168 12.8844 5.68168 12.1632 5.81091 11.4588L3.90984 9.77801L5.5593 7.05602L7.9566 7.8454C8.51813 7.38306 9.15942 7.02133 9.85068 6.77701L10.3469 4.33403H13.6458L14.1421 6.74979C14.8279 7.00097 15.4657 7.36208 16.0291 7.81818L18.4334 7.05602L20.0829 9.77801L18.1818 11.4112C18.3111 12.1156 18.3111 12.8368 18.1818 13.5412L20.0829 15.222L18.4334 17.944Z" fill="currentColor"/>
<path d="M11.9999 16.4998C11.2088 16.4998 10.4355 16.2652 9.77767 15.8257C9.1199 15.3862 8.60722 14.7615 8.30448 14.0306C8.00173 13.2997 7.92252 12.4955 8.07686 11.7196C8.2312 10.9437 8.61215 10.2309 9.17154 9.67154C9.73094 9.11215 10.4437 8.7312 11.2196 8.57686C11.9955 8.42252 12.7997 8.50173 13.5306 8.80448C14.2615 9.10722 14.8862 9.6199 15.3257 10.2777C15.7652 10.9355 15.9998 11.7088 15.9998 12.4999C16.0051 13.0267 15.9053 13.5492 15.7062 14.0369C15.5071 14.5246 15.2127 14.9677 14.8402 15.3402C14.4677 15.7127 14.0246 16.0071 13.5369 16.2062C13.0492 16.4053 12.5267 16.5051 11.9999 16.4998ZM11.9999 9.8333C11.6475 9.82509 11.297 9.88845 10.9698 10.0196C10.6426 10.1507 10.3453 10.3468 10.096 10.596C9.84678 10.8453 9.65066 11.1426 9.51956 11.4698C9.38845 11.797 9.32509 12.1475 9.3333 12.4999C9.32509 12.8523 9.38845 13.2028 9.51956 13.53C9.65066 13.8572 9.84678 14.1545 10.096 14.4037C10.3453 14.653 10.6426 14.8491 10.9698 14.9802C11.297 15.1113 11.6475 15.1747 11.9999 15.1665C12.3523 15.1747 12.7028 15.1113 13.03 14.9802C13.3572 14.8491 13.6545 14.653 13.9037 14.4037C14.153 14.1545 14.3491 13.8572 14.4802 13.53C14.6113 13.2028 14.6747 12.8523 14.6665 12.4999C14.6747 12.1475 14.6113 11.797 14.4802 11.4698C14.3491 11.1426 14.153 10.8453 13.9037 10.596C13.6545 10.3468 13.3572 10.1507 13.03 10.0196C12.7028 9.88845 12.3523 9.82509 11.9999 9.8333Z" fill="currentColor"/>
`
};

export const settingsDark: IVectorIcon = {
  name: 'settings-dark',
  style: 'line',
  path: `
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12.6242 4H10.9557C10.7047 4.00516 10.4623 4.09264 10.2657 4.24896C10.0693 4.4054 9.92973 4.62203 9.86844 4.86559L9.74211 5.34388C9.6845 5.56196 9.5284 5.74052 9.31996 5.82676C9.11165 5.91312 8.87494 5.89706 8.68008 5.78353L8.25268 5.53479C8.03179 5.40284 7.77284 5.34905 7.51758 5.38218C7.26244 5.41519 7.02572 5.53333 6.84582 5.71727L5.71744 6.84576H5.71755C5.53361 7.02577 5.41569 7.26238 5.38258 7.51752C5.34946 7.77267 5.40324 8.03152 5.53508 8.25239L5.78314 8.67968C5.89668 8.87452 5.91274 9.11125 5.82649 9.31968C5.74013 9.52799 5.56147 9.68421 5.34337 9.7417L4.86566 9.86838C4.61613 9.93137 4.39514 10.0764 4.23814 10.2802C4.08114 10.484 3.99726 10.7347 4.00007 10.992V12.5882C3.99726 12.8454 4.08115 13.0961 4.23814 13.3C4.39513 13.5038 4.61612 13.6488 4.86566 13.7118L5.34418 13.838C5.56226 13.8954 5.74094 14.0515 5.8273 14.2598C5.91354 14.4683 5.89748 14.705 5.78384 14.8998L5.53521 15.3272C5.40337 15.5482 5.34958 15.8071 5.38271 16.0623C5.41583 16.3175 5.53375 16.5541 5.71768 16.7341L6.84606 17.8626C7.02596 18.0465 7.26257 18.1646 7.51783 18.1977C7.77297 18.2308 8.03193 18.1771 8.25281 18.0452L8.68021 17.7961C8.87516 17.6827 9.1119 17.6667 9.32021 17.7531C9.52864 17.8394 9.68474 18.0181 9.74235 18.2362L9.86846 18.7143C9.93146 18.9638 10.0764 19.1848 10.2803 19.3418C10.4841 19.4988 10.7348 19.5827 10.9921 19.5799H12.5879C12.8452 19.5827 13.0959 19.4989 13.2998 19.3419C13.5036 19.1848 13.6487 18.9638 13.7116 18.7143L13.8379 18.236C13.8955 18.0179 14.0516 17.8392 14.2599 17.753C14.4682 17.6666 14.7049 17.6824 14.8999 17.796L15.3275 18.0449V18.0448C15.5484 18.1769 15.8074 18.2307 16.0625 18.1976C16.3178 18.1644 16.5544 18.0464 16.7343 17.8624L17.8624 16.7339C18.0464 16.554 18.1645 16.3174 18.1976 16.0622C18.2308 15.8071 18.177 15.5481 18.0451 15.3272L17.7969 14.8997C17.6833 14.7048 17.6673 14.468 17.7535 14.2597C17.8399 14.0513 18.0185 13.8952 18.2366 13.8376L18.7143 13.7115C18.9639 13.6485 19.1849 13.5034 19.3419 13.2996C19.4989 13.0957 19.5827 12.8451 19.5799 12.5878V10.9917C19.5827 10.7344 19.499 10.4836 19.342 10.2798C19.1849 10.076 18.9639 9.9309 18.7143 9.86802L18.2357 9.74169C18.0176 9.68419 17.839 9.5281 17.7527 9.31978C17.6664 9.11135 17.6824 8.87464 17.7961 8.67978L18.0448 8.25215V8.25226C18.1767 8.03125 18.2303 7.77242 18.1972 7.51728C18.1641 7.26213 18.0461 7.02553 17.8621 6.84563L16.734 5.71713V5.71702C16.5541 5.53308 16.3173 5.41505 16.0621 5.38205C15.8069 5.34892 15.548 5.40271 15.327 5.53466L14.8999 5.78306C14.7051 5.89648 14.4685 5.91243 14.2602 5.82619C14.0517 5.74005 13.8956 5.5615 13.8379 5.34353L13.7116 4.86559C13.6504 4.62201 13.5108 4.40527 13.3143 4.24885C13.1179 4.09253 12.8753 4.00504 12.6243 3.99999L12.6242 4ZM11.79 14.5225C11.0652 14.5225 10.37 14.2346 9.85752 13.722C9.34499 13.2094 9.05705 12.5142 9.05705 11.7895C9.05716 11.0646 9.34511 10.3696 9.85763 9.85703C10.3702 9.3445 11.0654 9.05667 11.7902 9.05667C12.515 9.05679 13.2101 9.34473 13.7226 9.85738C14.235 10.3699 14.523 11.0652 14.5229 11.7899C14.5222 12.5145 14.234 13.2092 13.7216 13.7215C13.2092 14.2338 12.5145 14.5218 11.79 14.5225H11.79ZM11.79 8.61728V8.61717C12.6314 8.61717 13.4384 8.95137 14.0333 9.54632C14.6283 10.1413 14.9626 10.9482 14.9627 11.7896C14.9627 12.6311 14.6285 13.438 14.0336 14.033C13.4386 14.6279 12.6317 14.9622 11.7903 14.9624C10.9488 14.9624 10.1419 14.6282 9.54692 14.0332C8.95197 13.4383 8.61765 12.6314 8.61754 11.7899C8.61855 10.9488 8.95298 10.1424 9.5477 9.54756C10.1424 8.95281 10.9488 8.61818 11.79 8.61717V8.61728Z"
      fill="currentColor" />`
};

export const searchNormal: IVectorIcon = {
  name: 'search-normal',
  style: 'line',
  path: `
    <path
      d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58332C17.5 5.21107 13.9555 1.66666 9.58329 1.66666C5.21104 1.66666 1.66663 5.21107 1.66663 9.58332C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
      stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"  fill="none" />
    <path d="M18.3333 18.3333L16.6666 16.6667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
      stroke-linejoin="round"  />`
};

export const search: IVectorIcon = {
  name: 'search',
  style: 'line',
  path: `
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
  <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
};

export const filter: IVectorIcon = {
  name: 'filter',
  style: 'line',
  path: `
<path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
};

export const bgNotContent: IVectorIcon = {
  name: 'bg-not-content',
  style: 'line',
  path: `
<path d="M106.375 87.875C106.375 90.3283 105.4 92.681 103.666 94.4157C101.931 96.1504 99.5783 97.125 97.125 97.125H13.875C11.4217 97.125 9.06897 96.1504 7.33426 94.4157C5.59955 92.681 4.625 90.3283 4.625 87.875V37C4.625 34.5467 5.59955 32.194 7.33426 30.4593C9.06897 28.7246 11.4217 27.75 13.875 27.75H32.375L41.625 13.875H69.375L78.625 27.75H97.125C99.5783 27.75 101.931 28.7246 103.666 30.4593C105.4 32.194 106.375 34.5467 106.375 37V87.875Z" stroke="currentColor" stroke-width="9.25" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
<path d="M55.5 78.625C65.7173 78.625 74 70.3423 74 60.125C74 49.9077 65.7173 41.625 55.5 41.625C45.2827 41.625 37 49.9077 37 60.125C37 70.3423 45.2827 78.625 55.5 78.625Z" stroke="currentColor" stroke-width="9.25" stroke-linecap="round" stroke-linejoin="round"  fill="none" />`
};

export const document: IVectorIcon = {
  name: 'document',
  style: 'line',
  path: `
    <path d="M8.71429 16.6428H14.2857M8.71429 13.8571H14.2857M12.4289 3.64363C12.3402 3.64282 12.2404 3.64282 12.1265 3.64282H7.97161C6.93151 3.64282 6.41108 3.64282 6.01381 3.84524C5.66437 4.02329 5.38047 4.30719 5.20242 4.65663C5 5.0539 5 5.57433 5 6.61443V17.3859C5 18.426 5 18.9457 5.20242 19.343C5.38047 19.6924 5.66437 19.9768 6.01381 20.1549C6.41069 20.3571 6.9305 20.3571 7.96859 20.3571L15.0314 20.3571C16.0695 20.3571 16.5886 20.3571 16.9854 20.1549C17.3349 19.9768 17.6197 19.6924 17.7978 19.343C18 18.9461 18 18.4271 18 17.389V9.51667C18 9.40277 17.9999 9.30296 17.9991 9.21425M12.4289 3.64363C12.694 3.64605 12.861 3.65588 13.0212 3.69433C13.2107 3.73982 13.3923 3.81485 13.5585 3.91668C13.7458 4.03149 13.9067 4.19236 14.2277 4.51336L17.1299 7.41559C17.4511 7.73679 17.6108 7.89694 17.7257 8.08436C17.8275 8.25052 17.9028 8.4317 17.9483 8.6212C17.9868 8.78134 17.9967 8.94919 17.9991 9.21425M12.4289 3.64363L12.4286 6.24302C12.4286 7.28311 12.4286 7.80296 12.631 8.20023C12.809 8.54967 13.0929 8.83398 13.4424 9.01203C13.8393 9.21425 14.3591 9.21425 15.3971 9.21425H17.9991" stroke="currentColor" stroke-width="0.928571" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  `
};

export const baseDetail: IVectorIcon = {
  name: 'base-detail',
  style: 'line',
  fill: 'none',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.39106 17C9.26443 17 9.1676 16.9625 9.10056 16.8876C9.03352 16.8127 9 16.7079 9 16.573V15.1798C9 14.8802 9.14898 14.7303 9.44693 14.7303H9.98324L9.44693 14.9213C9.64804 14.6517 9.80819 14.3596 9.92737 14.0449C10.054 13.7228 10.1471 13.3633 10.2067 12.9663C10.2663 12.5693 10.2961 12.1161 10.2961 11.6067V10.5169C10.2961 10.3446 10.3408 10.2172 10.4302 10.1348C10.5196 10.0449 10.6462 10 10.8101 10H13.6257C13.797 10 13.9237 10.0449 14.0056 10.1348C14.095 10.2172 14.1397 10.3446 14.1397 10.5169V15.1461L13.7263 14.7303H14.5531C14.6946 14.7303 14.8026 14.7678 14.8771 14.8427C14.959 14.9176 15 15.03 15 15.1798V16.573C15 16.8577 14.8696 17 14.6089 17C14.4823 17 14.3855 16.9625 14.3184 16.8876C14.2514 16.8127 14.2179 16.7079 14.2179 16.573V15.4607H9.77095V16.573C9.77095 16.8577 9.64432 17 9.39106 17ZM10.4413 14.7303H13.2793V10.7191H11.1006V11.764C11.1006 12.3258 11.0447 12.8689 10.933 13.3933C10.8212 13.9101 10.6574 14.3558 10.4413 14.7303Z" fill="currentColor"/>
`
};

export const baseProduct: IVectorIcon = {
  name: 'base-product',
  style: 'line',
  fill: 'none',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.58019 17C9.39151 17 9.24528 16.9479 9.14151 16.8438C9.04717 16.7397 9 16.593 9 16.4037V10.6531C9 10.4354 9.0566 10.2745 9.16981 10.1704C9.28302 10.0568 9.4434 10 9.65094 10H14.3491C14.5566 10 14.717 10.0568 14.8302 10.1704C14.9434 10.2745 15 10.4354 15 10.6531V16.4037C15 16.593 14.9481 16.7397 14.8443 16.8438C14.7406 16.9479 14.5991 17 14.4198 17C14.2406 17 14.0991 16.9479 13.9953 16.8438C13.9009 16.7397 13.8538 16.593 13.8538 16.4037V10.9229H10.1462V16.4037C10.1462 16.593 10.0991 16.7397 10.0047 16.8438C9.91038 16.9479 9.76887 17 9.58019 17Z" fill="currentColor"/>
`
};

export const addPlus: IVectorIcon = {
  name: 'add-plus',
  style: 'line',
  path: `
   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const closeVision: IVectorIcon = {
  name: 'close-vision',
  style: 'line',
  path: `
   <g clip-path="url(#clip0_2721_198626)">
<path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</g>
<defs>
<clipPath id="clip0_2721_198626" >
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
`
};

export const deleteSmall: IVectorIcon = {
  name: 'deleteSmall',
  style: 'line',
  fill: 'none',
  path: `
<path d="M4.5 7.87256H5.77778H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 7.87256V19.1726C18 19.6234 17.8194 20.0558 17.4979 20.3746C17.1764 20.6935 16.7404 20.8726 16.2857 20.8726H7.71429C7.25963 20.8726 6.82359 20.6935 6.5021 20.3746C6.18061 20.0558 6 19.6234 6 19.1726V7.87256M8.57143 7.27256V5.57256C8.57143 5.12169 8.75204 4.68929 9.07353 4.37048C9.39502 4.05167 9.83106 3.87256 10.2857 3.87256H13.7143C14.1689 3.87256 14.605 4.05167 14.9265 4.37048C15.248 4.68929 15.4286 5.12169 15.4286 5.57256V7.27256" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 11.8726V16.8726" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 11.8726V16.8726" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const openVision: IVectorIcon = {
  name: 'openVision',
  style: 'line',
  path: `
   <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const trash: IVectorIcon = {
  name: 'trash',
  style: 'line',
  path: `
   <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const trashSmall: IVectorIcon = {
  name: 'trashSmall',
  style: 'line',
  path: `
    <path d="M4.5 7H5.77778H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 7V18.3C18 18.7509 17.8194 19.1833 17.4979 19.5021C17.1764 19.8209 16.7404 20 16.2857 20H7.71429C7.25963 20 6.82359 19.8209 6.5021 19.5021C6.18061 19.1833 6 18.7509 6 18.3V7M8.57143 6.4V4.7C8.57143 4.24913 8.75204 3.81673 9.07353 3.49792C9.39502 3.17911 9.83106 3 10.2857 3H13.7143C14.1689 3 14.605 3.17911 14.9265 3.49792C15.248 3.81673 15.4286 4.24913 15.4286 4.7V6.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M10 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const printer: IVectorIcon = {
  name: 'printer',
  style: 'line',
  viewbox: '0 0 16 16',
  path: `
   <g clip-path="url(#clip0_2392_27633)">
<path d="M4 5.99998V1.33331H12V5.99998" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M4.00001 12H2.66668C2.31305 12 1.97392 11.8595 1.72387 11.6095C1.47382 11.3594 1.33334 11.0203 1.33334 10.6667V7.33333C1.33334 6.97971 1.47382 6.64057 1.72387 6.39052C1.97392 6.14048 2.31305 6 2.66668 6H13.3333C13.687 6 14.0261 6.14048 14.2762 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V10.6667C14.6667 11.0203 14.5262 11.3594 14.2762 11.6095C14.0261 11.8595 13.687 12 13.3333 12H12" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 9.33331H4V14.6666H12V9.33331Z" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
<defs>
<clipPath id="clip0_2392_27633">
<rect width="16" height="16" fill="currentColor"/>
</clipPath>
</defs>
`
};

export const uploadCloud: IVectorIcon = {
  name: 'upload-cloud',
  style: 'line',
  viewbox: '0 0 16 16',
  path: `
<path d="M10.6667 10.6667L8.00001 8L5.33334 10.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"fill="none" />
<path d="M8 8V14" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
<path d="M13.5936 12.26C14.2439 11.9055 14.7575 11.3446 15.0536 10.6658C15.3496 9.98692 15.4111 9.22883 15.2284 8.51114C15.0458 7.79344 14.6293 7.15702 14.0448 6.70231C13.4602 6.2476 12.7409 6.0005 12.0003 6.00001H11.1603C10.9585 5.2195 10.5824 4.4949 10.0603 3.88067C9.53813 3.26644 8.88354 2.77858 8.14571 2.45375C7.40788 2.12892 6.60601 1.97558 5.80039 2.00526C4.99477 2.03495 4.20635 2.24688 3.49443 2.62512C2.7825 3.00336 2.16558 3.53808 1.69006 4.18906C1.21453 4.84005 0.892769 5.59037 0.748962 6.38361C0.605156 7.17684 0.643046 7.99236 0.859785 8.76885C1.07652 9.54534 1.46647 10.2626 2.00031 10.8667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10.6667 10.6667L8.00001 8L5.33334 10.6667" stroke="blacurrentColorck" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const archive: IVectorIcon = {
  name: 'archive',
  style: 'line',
  viewbox: '0 0 16 13',
  path: `
    <path d="M14 5.33344V13.2001C14 13.6419 13.6418 14.0001 13.2 14.0001H2.8C2.35817 14.0001 2 13.6419 2 13.2001V5.33344" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M14.5332 2H1.4665C1.02468 2 0.666504 2.35817 0.666504 2.8V4.53333C0.666504 4.97516 1.02468 5.33333 1.4665 5.33333H14.5332C14.975 5.33333 15.3332 4.97516 15.3332 4.53333V2.8C15.3332 2.35817 14.975 2 14.5332 2Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M6.6665 8H9.33317" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `
};

export const menuArchive: IVectorIcon = {
  name: 'menu-archive',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
    <path d="M7.20812 8.46154H16.7926M7.20812 8.46154C6.7111 8.46154 6.46197 8.46154 6.27214 8.5873C6.10516 8.69792 5.96949 8.87431 5.88441 9.09142C5.78768 9.33824 5.78768 9.66159 5.78768 10.3078V16.3078C5.78768 17.6002 5.78768 18.2466 5.98113 18.7402C6.1513 19.1744 6.42263 19.5275 6.7566 19.7487C7.1359 20 7.63268 20 8.62477 20H15.3746C16.3666 20 16.8627 20 17.242 19.7487C17.576 19.5275 17.8485 19.1744 18.0187 18.7401C18.212 18.247 18.212 17.6019 18.212 16.312V10.2973C18.212 9.65809 18.212 9.33691 18.1158 9.09142C18.0307 8.87431 17.8944 8.69792 17.7274 8.5873C17.5376 8.46154 17.2896 8.46154 16.7926 8.46154M7.20812 8.46154H5.76577C5.01224 8.46154 4.6357 8.46154 4.42184 8.29026C4.13645 8.0617 3.97464 7.64322 4.00325 7.20901C4.02471 6.88334 4.249 6.48949 4.69831 5.70084C4.82826 5.47274 4.89325 5.35866 4.9728 5.27156C5.07886 5.15542 5.20472 5.07295 5.33963 5.03126C5.44081 5 5.54941 5 5.76775 5H18.2314C18.4498 5 18.5586 5 18.6598 5.03126C18.7947 5.07295 18.9205 5.15542 19.0266 5.27156C19.1062 5.35866 19.1714 5.4722 19.3013 5.70031C19.7506 6.48894 19.9753 6.88328 19.9968 7.20894C20.0254 7.64316 19.863 8.0617 19.5776 8.29026C19.3637 8.46154 18.9863 8.46154 18.2328 8.46154H16.7926M10.2249 14.2308H13.7747" stroke="currentColor" fill="transparent" stroke-width="0.761905" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const menuClose: IVectorIcon = {
  name: 'menu-close',
  style: 'line',
  path: `
   <path d="M11 17L6 12L11 6.99997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M17.9998 17L12.9998 12L17.9998 6.99997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const menuOpen: IVectorIcon = {
  name: 'menu-open',
  style: 'line',
  path: `
   <path d="M17 9.99997H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M21 6H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M21 14H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M17 18H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const bookOpen: IVectorIcon = {
  name: 'book-open',
  style: 'line',
  path: `
<g id="menu/bookOpen">
<path id="Vector" d="M11.5 10.4799V20M11.5 10.4799C11.5 8.91171 11.5 8.12795 11.7725 7.52899C12.0122 7.00213 12.3943 6.57363 12.8647 6.30519C13.3995 6 14.0997 6 15.4998 6H17.6665C18.1332 6 18.3667 6 18.545 6.10173C18.7018 6.19121 18.829 6.33389 18.9089 6.50951C18.9997 6.70917 19 6.97072 19 7.49344V15.7069C19 16.2296 18.9997 16.4906 18.9089 16.6903C18.829 16.8659 18.7021 17.009 18.5453 17.0985C18.3672 17.2001 18.1342 17.2001 17.6684 17.2001H15.3078C14.5251 17.2001 14.1331 17.2001 13.7778 17.321C13.4634 17.4279 13.1714 17.6031 12.9175 17.8368C12.6307 18.1008 12.4134 18.4655 11.9792 19.1949L11.5 20M11.5 10.4799C11.5 8.91171 11.4999 8.12795 11.2274 7.52899C10.9877 7.00213 10.6052 6.57363 10.1348 6.30519C9.60003 6 8.89981 6 7.49967 6H5.33301C4.8663 6 4.63318 6 4.45492 6.10173C4.29811 6.19121 4.17072 6.33389 4.09083 6.50951C4 6.70917 4 6.97072 4 7.49344V15.7069C4 16.2296 4 16.4906 4.09083 16.6903C4.17072 16.8659 4.29811 17.009 4.45492 17.0985C4.633 17.2001 4.86584 17.2001 5.33164 17.2001H7.69227C8.47495 17.2001 8.86618 17.2001 9.2214 17.321C9.53588 17.4279 9.82927 17.6031 10.0832 17.8368C10.3688 18.0997 10.5848 18.4626 11.0154 19.186L11.5 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const chartLine: IVectorIcon = {
  name: 'chart-line',
  style: 'line',
  path: `
<g id="menu/chartLine">
<path id="Vector" d="M5 14.6669V16.2267C5 17.1974 5 17.6825 5.16954 18.0532C5.31868 18.3794 5.55647 18.6451 5.84917 18.8113C6.18159 19 6.61698 19 7.48646 19H19M5 14.6669V6M5 14.6669L7.99705 11.8839L7.99953 11.8816C8.5417 11.3782 8.81331 11.126 9.10782 11.0235C9.45574 10.9025 9.8305 10.9217 10.1672 11.0773C10.4526 11.2092 10.7028 11.4881 11.2033 12.0458L11.2083 12.0514C11.7166 12.6177 11.9714 12.9017 12.2614 13.0333C12.6045 13.1891 12.9865 13.2025 13.3382 13.0725C13.6364 12.9623 13.9087 12.6972 14.4532 12.1663L18.9998 7.73333" stroke="currentColor" stroke-width="0.888879" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const marriage: IVectorIcon = {
  name: 'marriage',
  style: 'line',
  path: `
<g id="menu/marriage">
<path id="Vector" d="M6 9.81909V17.6353C6 18.5767 6 19.0471 6.18321 19.4067C6.34436 19.723 6.60132 19.9806 6.91761 20.1418C7.27682 20.3248 7.74731 20.3248 8.68687 20.3248H13.3986C14.3382 20.3248 14.808 20.3248 15.1672 20.1418C15.4835 19.9806 15.7413 19.723 15.9025 19.4067C16.0855 19.0475 16.0855 18.5775 16.0855 17.6379V9.81909" stroke="currentColor" stroke-width="0.840457" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path id="Vector_2" d="M6.80635 5.33121L8.54187 5.84109M6.80635 5.33121L5.99997 5.0943M6.80635 5.33121L8.41911 5.80502M8.54187 5.84109L14.8701 7.70027M8.54187 5.84109C8.76264 5.08964 8.75021 4.67803 8.96004 4.41772M14.8701 7.70027L16.4829 8.17408L17.2893 8.41099M14.8701 7.70027C15.0909 6.94882 15.2011 6.57326 15.1654 6.24081C15.1179 5.79756 14.8963 5.39119 14.5492 5.11141C14.2889 4.90157 13.9132 4.79119 13.1617 4.57042L11.549 4.09661C10.7975 3.87584 10.4216 3.76539 10.0891 3.80108C9.64587 3.84867 9.23982 4.07064 8.96004 4.41772M14.8701 7.70027L8.41911 5.80502M8.96004 4.41772C8.75021 4.67803 8.63988 5.05357 8.41911 5.80502" stroke="currentColor" stroke-width="0.840457" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<g id="Vector 1">
<path d="M9.7821 12.3404V13.1809H11.0428V11.9202H9.7821V12.3404Z" fill="currentColor"/>
<path d="M9.7821 13.1809V12.3404V11.9202M9.7821 13.1809H11.0428V11.9202H9.7821M9.7821 13.1809V11.9202" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 3">
<path d="M8.32306 8.45776L8.03974 8.72483L8.47973 9.19158L8.90471 8.79097L8.46472 8.32422L8.32306 8.45776Z" fill="currentColor"/>
<path d="M8.03974 8.72483L8.32306 8.45776L8.46472 8.32422M8.03974 8.72483L8.47973 9.19158L8.90471 8.79097L8.46472 8.32422M8.03974 8.72483L8.46472 8.32422" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 2">
<path d="M9.72908 16.4218L9.36181 17.0202L10.3551 17.6298L10.906 16.7322L9.91272 16.1226L9.72908 16.4218Z" fill="currentColor"/>
<path d="M9.36181 17.0202L9.72908 16.4218L9.91272 16.1226M9.36181 17.0202L10.3551 17.6298L10.906 16.7322L9.91272 16.1226M9.36181 17.0202L9.91272 16.1226" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 4">
<path d="M13.2956 13.7254L13.0532 13.824L13.2275 14.2525L13.591 14.1047L13.4167 13.6761L13.2956 13.7254Z" fill="currentColor"/>
<path d="M13.0532 13.824L13.2956 13.7254L13.4167 13.6761M13.0532 13.824L13.2275 14.2525L13.591 14.1047L13.4167 13.6761M13.0532 13.824L13.4167 13.6761" stroke="currentColor" stroke-width="0.840457"/>
</g>
</g>
`
};

export const baseOfAssemblyUnits: IVectorIcon = {
  name: 'base-of-assembly-units',
  style: 'line',
  fill: 'none',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.571 17c-.736 0-1.372-.148-1.906-.444a3.116 3.116 0 0 1-1.241-1.237C9.14 14.782 9 14.162 9 13.46c0-.538.08-1.02.242-1.445a2.87 2.87 0 0 1 .711-1.083 3.085 3.085 0 0 1 1.12-.695A4.463 4.463 0 0 1 12.571 10c.363 0 .742.05 1.135.153a2.94 2.94 0 0 1 1.075.528.45.45 0 0 1 .196.236c.03.092.03.185 0 .277a.559.559 0 0 1-.151.223.492.492 0 0 1-.59 0 2.554 2.554 0 0 0-.802-.39 2.995 2.995 0 0 0-.787-.11c-.393 0-.736.06-1.03.18-.292.111-.539.273-.74.486a2.195 2.195 0 0 0-.47.792 3.6 3.6 0 0 0-.151 1.097c0 .806.207 1.445.62 1.917.414.463 1.004.694 1.77.694a2.831 2.831 0 0 0 1.59-.5.492.492 0 0 1 .318-.097c.1.01.186.046.257.111.07.056.116.13.136.222.03.093.03.186 0 .278a.46.46 0 0 1-.197.222 3.29 3.29 0 0 1-1.059.528 4.35 4.35 0 0 1-1.12.153Z" fill="currentColor"/>
  `
};

export const equipmentBase: IVectorIcon = {
  name: 'equipment-base',
  style: 'line',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 17C11.3879 17 10.8578 16.836 10.4095 16.5079C9.96121 16.1799 9.61207 15.7196 9.36207 15.127C9.12069 14.5238 9 13.8148 9 13C9 12.3862 9.06897 11.836 9.2069 11.3492C9.34483 10.8519 9.54741 10.4286 9.81466 10.0794C10.0819 9.73016 10.3966 9.46561 10.7586 9.28572C11.1293 9.09524 11.5431 9 12 9C12.6121 9 13.1422 9.16402 13.5905 9.49206C14.0388 9.82011 14.3836 10.2857 14.625 10.8889C14.875 11.4815 15 12.1852 15 13C15 13.6138 14.931 14.164 14.7931 14.6508C14.6552 15.1376 14.4526 15.5608 14.1853 15.9206C13.9181 16.2698 13.5991 16.5397 13.2284 16.7302C12.8664 16.9101 12.4569 17 12 17ZM12 15.9683C12.3879 15.9683 12.7284 15.8519 13.0216 15.619C13.3147 15.3862 13.5388 15.0476 13.694 14.6032C13.8578 14.1587 13.9397 13.6243 13.9397 13C13.9397 12.037 13.7629 11.3016 13.4095 10.7937C13.0647 10.2857 12.5948 10.0317 12 10.0317C11.6034 10.0317 11.2586 10.1481 10.9655 10.381C10.681 10.6032 10.4569 10.9365 10.2931 11.381C10.1379 11.8148 10.0603 12.3545 10.0603 13C10.0603 13.9524 10.2371 14.6878 10.5905 15.2063C10.944 15.7143 11.4138 15.9683 12 15.9683Z" fill="currentColor"/>
`
};

export const supplierDatabase: IVectorIcon = {
  name: 'supplier-database',
  style: 'line',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M9.58019 16C9.39151 16 9.24528 15.9554 9.14151 15.8661C9.04717 15.7769 9 15.6511 9 15.4888V10.5598C9 10.3732 9.0566 10.2353 9.16981 10.146C9.28302 10.0487 9.4434 10 9.65094 10H14.3491C14.5566 10 14.717 10.0487 14.8302 10.146C14.9434 10.2353 15 10.3732 15 10.5598V15.4888C15 15.6511 14.9481 15.7769 14.8443 15.8661C14.7406 15.9554 14.5991 16 14.4198 16C14.2406 16 14.0991 15.9554 13.9953 15.8661C13.9009 15.7769 13.8538 15.6511 13.8538 15.4888V10.7911H10.1462V15.4888C10.1462 15.6511 10.0991 15.7769 10.0047 15.8661C9.91038 15.9554 9.76887 16 9.58019 16Z" fill="currentColor"/>
`
};

export const theDatabaseOfMaterials: IVectorIcon = {
  name: 'the-database-of-materials',
  style: 'line',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M9.432 16C9.296 16 9.188 15.96 9.108 15.88C9.036 15.792 9 15.676 9 15.532V10.516C9 10.404 9.016 10.312 9.048 10.24C9.08 10.16 9.128 10.1 9.192 10.06C9.256 10.02 9.336 10 9.432 10C9.528 10 9.608 10.016 9.672 10.048C9.736 10.072 9.792 10.112 9.84 10.168C9.888 10.216 9.928 10.276 9.96 10.348L12 13.984L14.04 10.348C14.072 10.276 14.112 10.216 14.16 10.168C14.208 10.112 14.264 10.072 14.328 10.048C14.392 10.016 14.468 10 14.556 10C14.7 10 14.808 10.044 14.88 10.132C14.952 10.212 14.988 10.34 14.988 10.516V15.532C14.988 15.676 14.952 15.792 14.88 15.88C14.808 15.96 14.7 16 14.556 16C14.42 16 14.312 15.96 14.232 15.88C14.16 15.792 14.124 15.676 14.124 15.532V11.2H14.4L12.348 14.8C12.316 14.864 12.272 14.92 12.216 14.968C12.16 15.008 12.088 15.028 12 15.028C11.904 15.028 11.828 15.004 11.772 14.956C11.724 14.908 11.68 14.856 11.64 14.8L9.588 11.2H9.864V15.532C9.864 15.676 9.824 15.792 9.744 15.88C9.672 15.96 9.568 16 9.432 16Z" fill="currentColor"/>
`
};

export const theBaseOfTheTool: IVectorIcon = {
  name: 'the-base-of-the-tool',
  style: 'line',
  fill: 'none',
  path: `
<path d="M19 6.57576V14.5V17.9091C19 19.6162 15.866 21 12 21C8.13401 21 5 19.6162 5 17.9091V14.5V6.57576M19 6.57576C19 4.8687 15.866 4 12 4C8.13401 4 5 4.8687 5 6.57576M19 6.57576C19 7.5 15.866 8.5 12 8.5C8.13401 8.5 5 7.5 5 6.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.52358 17C9.41981 17 9.32547 16.98 9.24057 16.94C9.16509 16.908 9.10377 16.852 9.0566 16.772C9.01887 16.692 9 16.592 9 16.472V11.48C9 11.32 9.04717 11.2 9.14151 11.12C9.23585 11.04 9.36321 11 9.52358 11C9.6934 11 9.82075 11.04 9.90566 11.12C10 11.2 10.0472 11.32 10.0472 11.48V15.992H9.6934L13.8113 11.312C13.8868 11.224 13.9764 11.152 14.0802 11.096C14.184 11.032 14.316 11 14.4764 11C14.5896 11 14.684 11.016 14.7594 11.048C14.8349 11.08 14.8915 11.136 14.9292 11.216C14.9764 11.288 15 11.388 15 11.516V16.52C15 16.672 14.9528 16.792 14.8585 16.88C14.7736 16.96 14.6462 17 14.4764 17C14.3066 17 14.1745 16.96 14.0802 16.88C13.9953 16.792 13.9528 16.672 13.9528 16.52V11.996H14.4764L10.1745 16.688C10.1085 16.768 10.0236 16.84 9.91981 16.904C9.82547 16.968 9.6934 17 9.52358 17Z" fill="currentColor"/>
`
};

export const fileDatabase: IVectorIcon = {
  name: 'file-database',
  style: 'line',
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12.0055 18C11.858 18 11.7437 17.957 11.6625 17.8711C11.5814 17.7852 11.5408 17.6641 11.5408 17.5078V16.7344L11.7953 17.0039H11.5187C10.7884 17.0039 10.1614 16.8594 9.63762 16.5703C9.11388 16.2813 8.70816 15.875 8.42047 15.3516C8.14016 14.8203 8 14.1914 8 13.4648C8 12.9102 8.07746 12.4141 8.23237 11.9766C8.38728 11.5391 8.61595 11.1719 8.9184 10.875C9.22084 10.5703 9.58967 10.3398 10.0249 10.1836C10.4601 10.0195 10.958 9.9375 11.5187 9.9375H11.7953L11.5408 10.207V9.49219C11.5408 9.32812 11.5814 9.20703 11.6625 9.12891C11.7437 9.04297 11.858 9 12.0055 9C12.1531 9 12.2637 9.04297 12.3375 9.12891C12.4186 9.20703 12.4592 9.32812 12.4592 9.49219V10.207L12.2158 9.9375H12.4924C13.2374 9.9375 13.8718 10.0781 14.3956 10.3594C14.9193 10.6406 15.3177 11.0469 15.5906 11.5781C15.8635 12.1016 16 12.7305 16 13.4648C16 14.0117 15.9189 14.5039 15.7566 14.9414C15.6017 15.3789 15.373 15.75 15.0705 16.0547C14.7681 16.3594 14.3993 16.5938 13.964 16.7578C13.5288 16.9219 13.0383 17.0039 12.4924 17.0039H12.2158L12.4592 16.7344V17.5078C12.4592 17.6641 12.4223 17.7852 12.3485 17.8711C12.2748 17.957 12.1604 18 12.0055 18ZM11.5519 16.4297V10.5117L11.7732 10.7109H11.3859C11.0171 10.7109 10.6814 10.7734 10.379 10.8984C10.0765 11.0156 9.81835 11.1914 9.60443 11.4258C9.3905 11.6602 9.22453 11.9492 9.1065 12.293C8.99585 12.6289 8.94053 13.0195 8.94053 13.4648C8.94053 14.0352 9.0438 14.5273 9.25035 14.9414C9.45689 15.3555 9.74458 15.6719 10.1134 15.8906C10.4822 16.1094 10.9064 16.2188 11.3859 16.2188H11.7732L11.5519 16.4297ZM12.4592 16.4297L12.2268 16.2188H12.6141C12.9756 16.2188 13.3075 16.1562 13.61 16.0312C13.9124 15.9062 14.1706 15.7266 14.3845 15.4922C14.5984 15.25 14.7644 14.9609 14.8824 14.625C15.0005 14.2813 15.0595 13.8945 15.0595 13.4648C15.0595 12.8711 14.9599 12.3711 14.7607 11.9648C14.5615 11.5508 14.2775 11.2383 13.9087 11.0273C13.5473 10.8164 13.1157 10.7109 12.6141 10.7109H12.2268L12.4592 10.5117V16.4297Z" fill="currentColor"/>
`
};

export const mainPage: IVectorIcon = {
  name: 'main-page',
  style: 'line',
  path: `
<path d="M4 18.2952H5.6M5.6 18.2952H10.4M5.6 18.2952V11.4955C5.6 11.0705 5.6 10.8578 5.65198 10.66C5.69804 10.4848 5.77423 10.3189 5.87656 10.169C5.99203 9.99986 6.15251 9.85961 6.47422 9.5797L10.3155 6.23759C10.9119 5.7187 11.2101 5.45924 11.5459 5.36048C11.8421 5.27339 12.1578 5.27339 12.4539 5.36048C12.79 5.45931 13.0886 5.71902 13.6859 6.23869L17.5259 9.5797C17.8476 9.8596 18.0082 9.99987 18.1237 10.169C18.226 10.3189 18.3016 10.4848 18.3477 10.66C18.3996 10.8578 18.4 11.0705 18.4 11.4955V18.2952M10.4 18.2952H13.6M10.4 18.2952V15.1133C10.4 14.2346 11.1163 13.5223 12 13.5223C12.8837 13.5223 13.6 14.2346 13.6 15.1133V18.2952M13.6 18.2952H18.4M18.4 18.2952H20" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
};

export const shopping: IVectorIcon = {
  name: 'shopping',
  style: 'line',
  path: `
<g id="menu/shopping">
<path id="Vector" d="M15.8918 16.6667C14.9535 16.6667 14.1929 17.4129 14.1929 18.3333C14.1929 19.2538 14.9535 20 15.8918 20C16.83 20 17.5906 19.2538 17.5906 18.3333C17.5906 17.4129 16.83 16.6667 15.8918 16.6667ZM15.8918 16.6667H9.34615C8.95452 16.6667 8.75834 16.6667 8.59711 16.5983C8.45487 16.538 8.33147 16.4409 8.24157 16.3171C8.1408 16.1783 8.10027 15.9928 8.02005 15.6254L5.92942 6.05387C5.84733 5.67803 5.80574 5.49031 5.7038 5.34993C5.61389 5.22612 5.49052 5.12868 5.34828 5.06837C5.18701 5 4.99193 5 4.60014 5H4M6.54823 7.5H17.4829C18.096 7.5 18.4022 7.5 18.608 7.6253C18.7882 7.73505 18.9202 7.90718 18.9777 8.1075C19.0434 8.33619 18.959 8.62497 18.7891 9.20288L17.613 13.2029C17.5114 13.5484 17.4606 13.7209 17.3575 13.8491C17.2665 13.9622 17.1465 14.0508 17.0105 14.1052C16.8568 14.1667 16.6742 14.1667 16.3098 14.1667H8.01811M8.24706 20C7.30882 20 6.54823 19.2538 6.54823 18.3333C6.54823 17.4129 7.30882 16.6667 8.24706 16.6667C9.18529 16.6667 9.94588 17.4129 9.94588 18.3333C9.94588 19.2538 9.18529 20 8.24706 20Z" stroke="currentColor" stroke-width="0.906039" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const shippingTasks: IVectorIcon = {
  name: 'shipping-tasks',
  style: 'line',
  path: `
<g id="menu/shippingTasks">
<path id="Vector" d="M12 15.6428V10.9286M12 10.9286L9.81818 12.5M12 10.9286L14.1818 12.5M20 14.8571C20 13.1214 18.6976 11.7143 17.0909 11.7143C17.0737 11.7143 17.0569 11.7144 17.0398 11.7147C16.6871 9.04915 14.5649 7 12 7C9.96607 7 8.21105 8.2886 7.3956 10.1513C5.49968 10.2854 4 11.9891 4 14.0713C4 16.241 5.62806 18 7.63636 18L17.0909 17.9999C18.6976 17.9999 20 16.5928 20 14.8571Z" stroke="currentColor" stroke-width="0.863636" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const warehouse: IVectorIcon = {
  name: 'warehouse',
  style: 'line',
  path: `
<g id="menu/warehouse">
<path id="Vector" d="M4 19H5.6M5.6 19H14.4M5.6 19V14.4241C5.6 13.9973 5.6 13.7837 5.6504 13.5847C5.69507 13.4082 5.76859 13.2409 5.86797 13.0892C5.98004 12.9182 6.13691 12.775 6.44922 12.49L8.29048 10.81C8.89427 10.2591 9.19639 9.98339 9.53799 9.87881C9.83915 9.78662 10.1606 9.78662 10.4617 9.87881C10.8036 9.98348 11.1061 10.2593 11.7109 10.8111L13.5509 12.49C13.8636 12.7753 14.0196 12.9181 14.1317 13.0892C14.2311 13.2409 14.3046 13.4082 14.3492 13.5847C14.3996 13.7837 14.4 13.9973 14.4 14.4241V19M14.4 19H18.4M18.4 19H20M18.4 19V8.59749C18.4 7.68918 18.4 7.23435 18.2258 6.88708C18.0724 6.58132 17.827 6.33291 17.5259 6.17711C17.1837 6 16.7362 6 15.8402 6H10.5602C9.66407 6 9.2157 6 8.87344 6.17711C8.57238 6.33291 8.32779 6.58132 8.17439 6.88708C8 7.23469 8 7.69007 8 8.60016V10.8752" stroke="currentColor" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const action: IVectorIcon = {
  name: 'action',
  style: 'line',
  fill: 'none',
  path: `
<path d="M13.6153 10.8848L8.15381 10.8848" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.8461 14.1152H8.15381" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.6923 7.65381H9.23073H8.15381" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5715 19H6V6.66683C6 5.73341 6 5.26635 6.21799 4.90983C6.40973 4.59623 6.71547 4.34144 7.0918 4.18166C7.51962 4 8.08009 4 9.20019 4H13.6747C13.7973 4 13.9045 4 14 4.00072" stroke="currentColor" stroke-width="0.942296" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 12V5.95568C18 5.27117 18 4.92866 17.8365 4.66721C17.6927 4.43723 17.4634 4.25039 17.1812 4.13321C16.8603 4 16.4399 4 15.5999 4H12.244C12.152 4 12.0716 4 12 4.00053" stroke="currentColor" stroke-width="0.942296" stroke-linecap="round" stroke-linejoin="round"/>
<g clip-path="url(#clip0_8085_22453)">
<path d="M15.6923 20.9363C17.6748 20.9363 19.282 19.3291 19.282 17.3466C19.282 15.364 17.6748 13.7568 15.6923 13.7568C13.7097 13.7568 12.1025 15.364 12.1025 17.3466C12.1025 19.3291 13.7097 20.9363 15.6923 20.9363Z" stroke="currentColor" stroke-width="0.861539" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.6924 15.1924V17.3462L17.1283 18.0642" stroke="currentColor" stroke-width="0.861539" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8085_22453">
<rect width="8.61539" height="8.61539" fill="white" transform="translate(11.3848 13.0386)"/>
</clipPath>
</defs>
`
};

export const company: IVectorIcon = {
  name: 'company',
  style: 'line',
  fill: 'none',
  path: `
<path d="M0 0H24V24H0V0Z" fill="white" fill-opacity="0.01"/>
<path d="M6 10H10V19H6V10Z" stroke="currentColor" stroke-width="0.691338" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 5H15V19H10V5Z" stroke="currentColor" stroke-width="0.691338" stroke-linejoin="round"/>
<path d="M15 13H19V19H15V13Z" stroke="currentColor" stroke-width="0.691338" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const production: IVectorIcon = {
  name: 'production',
  style: 'line',
  path: `
<path d="M14.802 20.7087H4.79445C4.57346 20.7087 4.38403 20.5351 4.38403 20.3327V18.8865C4.38403 18.684 4.57346 18.5105 4.79445 18.5105H14.802C15.023 18.5105 15.2125 18.684 15.2125 18.8865V20.3327C15.1809 20.5351 14.9915 20.7087 14.802 20.7087ZM5.20485 19.9856H14.3601V19.2625H5.20485V19.9856Z" fill="currentColor"/>
<path d="M17.9906 19.2626H14.8021C14.6127 19.2626 14.4548 19.1469 14.4232 18.9734L12.7816 11.7426C12.75 11.6269 12.7816 11.5112 12.8763 11.4533C12.9395 11.3666 13.0657 11.3087 13.192 11.3087H15.9702C16.1596 11.3087 16.3174 11.4244 16.349 11.569L18.3695 18.7998C18.401 18.9155 18.3695 19.0312 18.3063 19.118C18.2116 19.2048 18.0853 19.2626 17.9906 19.2626ZM15.1178 18.5395H17.4855L15.6545 12.0318H13.6024L15.1178 18.5395Z" fill="currentColor"/>
<path d="M14.802 19.2625H4.79445C4.66817 19.2625 4.57346 19.2047 4.47875 19.1179C4.41561 19.0311 4.38403 18.9154 4.38403 18.8287L6.40449 9.80461C6.43606 9.63107 6.59392 9.51538 6.78333 9.51538H12.7816C12.971 9.51538 13.1289 9.63107 13.1604 9.80461L13.5077 11.5979L15.1493 18.8287C15.1809 18.9444 15.1493 19.0601 15.0546 19.1179C15.023 19.2047 14.8968 19.2625 14.802 19.2625ZM5.26799 18.5394H14.2654L12.7184 11.7425L12.4343 10.2385H7.09903L5.26799 18.5394Z" fill="currentColor"/>
<path d="M17.9907 20.7087H14.8021C14.5811 20.7087 14.3917 20.5351 14.3917 20.3327V18.8865C14.3917 18.684 14.5811 18.5105 14.8021 18.5105H17.9907C18.2117 18.5105 18.4011 18.684 18.4011 18.8865V20.3327C18.3695 20.5351 18.1801 20.7087 17.9907 20.7087ZM15.181 19.9856H17.5803V19.2625H15.181V19.9856Z" fill="currentColor"/>
<path d="M17.8747 20.7087H14.4288C14.3012 20.7087 14.1918 20.5448 14.1918 20.3537V18.9884C14.1918 18.7973 14.3012 18.6334 14.4288 18.6334H17.8747C18.0023 18.6334 18.1117 18.7973 18.1117 18.9884V20.3537C18.1117 20.5448 18.0023 20.7087 17.8747 20.7087ZM14.6476 20.026H17.6559V19.3434H14.6476V20.026Z" fill="currentColor"/>
<path d="M12.7816 10.2384H6.81495C6.59397 10.2384 6.40454 10.0649 6.40454 9.86245V8.41628C6.40454 8.21382 6.59397 8.04028 6.81495 8.04028H12.7816C13.0026 8.04028 13.192 8.21382 13.192 8.41628V9.86245C13.192 10.0649 13.0026 10.2384 12.7816 10.2384ZM7.19378 9.51536H12.4028V8.79228H7.19378V9.51536Z" fill="currentColor"/>
<path d="M18.5208 20.7086H4.3249C4.14995 20.7086 4 20.549 4 20.3627C4 20.1765 4.14995 20.0168 4.3249 20.0168H18.5707C18.7457 20.0168 18.8956 20.1765 18.8956 20.3627C18.8457 20.549 18.6957 20.7086 18.5208 20.7086Z" fill="currentColor"/>
<path d="M15.3723 8.51845C14.4177 8.51845 13.6062 7.90506 13.3437 7.03214C12.9141 6.96136 12.5084 6.70185 12.2697 6.34796C12.1026 6.41874 11.9356 6.46592 11.7446 6.46592C11.6014 6.46592 11.4582 6.44233 11.315 6.39514C11.1241 6.79621 10.7184 7.05573 10.2172 7.05573C9.54893 7.05573 9 6.5367 9 5.87612C9 5.21553 9.52506 4.6965 10.2172 4.6965C10.3604 4.6965 10.5036 4.72009 10.6468 4.76727C10.8377 4.3662 11.2434 4.10669 11.7446 4.10669C12.0549 4.10669 12.3652 4.22465 12.58 4.43698C12.8425 4.22465 13.1766 4.10669 13.5346 4.10669C13.9403 4.10669 14.2983 4.27183 14.6086 4.53135C14.8473 4.43698 15.0859 4.38979 15.3484 4.38979C15.6826 4.38979 16.0167 4.46057 16.3031 4.62572C16.5895 4.29542 16.9952 4.10669 17.4725 4.10669C18.284 4.10669 19 4.76727 19 5.593C19 6.41874 18.3317 7.07933 17.4725 7.07933C17.4487 7.07933 17.4248 7.07933 17.3771 7.07933C17.1146 7.88147 16.2792 8.51845 15.3723 8.51845ZM13.5823 6.44233C13.7255 6.44233 13.8449 6.5367 13.8687 6.67825C13.9881 7.38602 14.6086 7.90506 15.3723 7.90506C16.1122 7.90506 16.7566 7.36243 16.8759 6.63107C16.8998 6.5367 16.9475 6.46592 17.0191 6.41874C17.0907 6.37155 17.1862 6.34796 17.2578 6.37156C17.3294 6.39515 17.4248 6.39514 17.4964 6.39514C17.9976 6.39514 18.4033 5.99408 18.4033 5.49864C18.4033 5.0032 17.9976 4.60213 17.4964 4.60213C17.1623 4.60213 16.852 4.79087 16.7088 5.07398C16.6611 5.14475 16.5895 5.19193 16.5179 5.21553C16.4463 5.23912 16.3508 5.21553 16.2792 5.16834C16.0167 4.97961 15.7303 4.88523 15.4201 4.88523C15.1814 4.88523 14.9427 4.93242 14.7279 5.05038C14.5847 5.12116 14.4415 5.07398 14.3461 4.95602C14.179 4.72009 13.9165 4.57854 13.6301 4.57854C13.3437 4.57854 13.0573 4.72009 12.8902 4.95602C12.8186 5.05038 12.7232 5.09757 12.6277 5.07398C12.5322 5.07398 12.4368 5.0032 12.389 4.90883C12.2936 4.6965 12.0788 4.57854 11.8401 4.57854C11.5298 4.57854 11.2673 4.81446 11.2434 5.12116C11.2434 5.23912 11.1718 5.33349 11.0525 5.38067C10.957 5.42786 10.8377 5.40426 10.7422 5.33349C10.6229 5.23912 10.4797 5.19194 10.3365 5.19194C10.0024 5.19194 9.73986 5.45145 9.73986 5.78175C9.73986 6.11204 10.0024 6.37156 10.3365 6.37156C10.6468 6.37156 10.9093 6.13563 10.9332 5.82893C10.9332 5.71097 11.0048 5.6166 11.1241 5.56941C11.2196 5.52223 11.3389 5.54582 11.4344 5.6166C11.5537 5.71097 11.6969 5.75815 11.8401 5.75815C12.0072 5.75815 12.1504 5.68737 12.2697 5.56941C12.3413 5.49863 12.4606 5.45145 12.5561 5.49864C12.6516 5.52223 12.747 5.593 12.7709 5.71097C12.8902 6.08844 13.2243 6.34796 13.6301 6.34796V6.44233C13.5585 6.44233 13.5585 6.44233 13.5823 6.44233Z" fill="currentColor"/>
`
};

export const wastes: IVectorIcon = {
  name: 'wastes',
  style: 'line',
  path: `
<g id="menu/wastes">
<g id="Vector">
<path d="M12.842 6.02625C12.8413 5.71666 12.5053 4.63997 12.421 4.34204C16.6048 4.34663 19.9953 7.74397 19.9999 11.921C20.0135 16.0999 16.6067 19.486 12.421 19.4997C8.23527 19.5132 4.85564 17.3631 4.84204 13.1841C5.77819 13.3827 6.57654 14.0137 8.21046 13.6052C9.89467 13.1841 9.47362 9.81573 9.05257 8.97362C8.84204 8.55257 8.67033 8.34265 8.63151 8.12535C9.48864 8.46519 10.8207 8.6557 11.5789 8.13151C12.42 7.5452 12.842 6.86836 12.842 6.02625Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M4.84369 7.71215V7.71046H4.84204V7.71211L4.84369 7.71215Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.05421 4.34373V4.34204H9.05257V4.34369L9.05421 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.68579 4.34373V4.34204H5.68415V4.34369L5.68579 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.7384 16.1332V16.1315H10.7368V16.1332L10.7384 16.1332Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.9489 14.449V14.4473H14.9473V14.4489L14.9489 14.449Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5805 11.9227V11.921H11.5789V11.9226L11.5805 11.9227Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7911 10.2385V10.2368H15.7894V10.2384L15.7911 10.2385Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.84369 7.71215V7.71046H4.84204V7.71211L4.84369 7.71215Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.05421 4.34373V4.34204H9.05257V4.34369L9.05421 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.68579 4.34373V4.34204H5.68415V4.34369L5.68579 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<circle id="Ellipse 16" cx="11.5789" cy="11.921" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 17" cx="15.7895" cy="10.2369" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 18" cx="14.9473" cy="14.4473" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 19" cx="10.7369" cy="16.1315" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 20" cx="4.84211" cy="7.71051" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 21" cx="9.05268" cy="4.34211" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 22" cx="5.68415" cy="4.34211" r="0.842105" fill="currentColor"/>
</g>
`
};

export const writeDowns: IVectorIcon = {
  name: 'write-downs',
  style: 'line',
  path: `
<g id="menu/write-downs">
<path id="Vector" d="M9.33327 12.8888H14.6665M4 6.66667V16.2666C4 17.2622 4 17.7595 4.19376 18.1398C4.3642 18.4743 4.63597 18.747 4.97047 18.9174C5.35039 19.111 5.84797 19.111 6.84166 19.111H17.1587C18.1524 19.111 18.6493 19.111 19.0292 18.9174C19.3637 18.747 19.6358 18.4746 19.8062 18.1401C20 17.7598 20 17.262 20 16.2664L20 9.51089C20 8.51525 20 8.01743 19.8062 7.63715C19.6358 7.30264 19.3631 7.03088 19.0286 6.86044C18.6483 6.66667 18.151 6.66667 17.1554 6.66667H11.9999M4 6.66667H11.9999M4 6.66667C4 5.68484 4.79593 4.88892 5.77776 4.88892H9.04395C9.47878 4.88892 9.69696 4.88892 9.90155 4.93804C10.0829 4.98158 10.2558 5.05359 10.4149 5.15107C10.5942 5.26097 10.7482 5.41498 11.0555 5.72224L11.9999 6.66667" stroke="currentColor" stroke-width="0.888878" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const theComplaint: IVectorIcon = {
  name: 'the-complaint',
  style: 'line',
  path: `
<g id="menu/theComplaint">
<path id="Vector" d="M11.5 8.76276V12.573M19 10.8251C19 17.0817 14.3424 19.8867 12.3679 20.7948L12.3654 20.7959C12.1578 20.8914 12.0537 20.9393 11.8177 20.9804C11.6682 21.0065 11.3327 21.0065 11.1833 20.9804C10.9463 20.9391 10.8412 20.8911 10.6318 20.7948C8.65731 19.8867 4 17.0817 4 10.8251V7.04835C4 5.98139 4 5.44752 4.20436 5.03999C4.38413 4.68152 4.67076 4.39029 5.02356 4.20764C5.42464 4 5.95008 4 7.00018 4H16.0002C17.0503 4 17.5746 4 17.9757 4.20764C18.3285 4.39029 18.6161 4.68152 18.7958 5.03999C19 5.44712 19 5.98035 19 7.04522V10.8251ZM11.5467 15.4306V15.5259L11.4533 15.5261V15.4306H11.5467Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const baseOfEquipmentAndInventory: IVectorIcon = {
  name: 'base-of-equipment-and-inventory',
  style: 'line',
  path: `
<g id="menu/baseOfEquipmentAndInventory">
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12.0067 16C11.8374 16 11.7038 15.9554 11.6058 15.8661C11.5078 15.7769 11.4588 15.6511 11.4588 15.4888V10.7911H9.5078C9.16927 10.7911 9 10.6572 9 10.3895C9 10.2677 9.04454 10.1744 9.13363 10.1095C9.22272 10.0365 9.34744 10 9.5078 10H14.5056C14.8352 10 15 10.1298 15 10.3895C15 10.5193 14.9555 10.6207 14.8664 10.6937C14.7862 10.7586 14.6659 10.7911 14.5056 10.7911H12.5412V15.4888C12.5412 15.6511 12.4967 15.7769 12.4076 15.8661C12.3274 15.9554 12.1938 16 12.0067 16Z" fill="currentColor"/>
</g>
`
};

export const usersGroup: IVectorIcon = {
  name: 'users-group',
  style: 'line',
  path: `
<g id="menu/usersGroup">
<path id="Vector" d="M16.4444 19.1667C16.4444 17.6939 14.4546 16.5 12 16.5C9.5454 16.5 7.55556 17.6939 7.55556 19.1667M20 16.5004C20 15.4069 18.903 14.4671 17.3333 14.0556M4 16.5004C4 15.4069 5.09697 14.4671 6.66667 14.0556M17.3333 10.4877C17.8789 9.99941 18.2222 9.28982 18.2222 8.50004C18.2222 7.02728 17.0283 5.83337 15.5556 5.83337C14.8726 5.83337 14.2496 6.09013 13.7778 6.51239M6.66667 10.4877C6.12111 9.99941 5.77778 9.28982 5.77778 8.50004C5.77778 7.02728 6.97169 5.83337 8.44444 5.83337C9.12743 5.83337 9.75044 6.09013 10.2222 6.51239M12 13.8334C10.5272 13.8334 9.33333 12.6395 9.33333 11.1667C9.33333 9.69395 10.5272 8.50004 12 8.50004C13.4728 8.50004 14.6667 9.69395 14.6667 11.1667C14.6667 12.6395 13.4728 13.8334 12 13.8334Z" stroke="currentColor" stroke-width="0.888889" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const reports: IVectorIcon = {
  name: 'reports',
  style: 'line',
  path: `
<g id="menu/reports">
<path id="Vector" d="M6.74998 11.1252V6.92526C6.74998 5.94518 6.74998 5.45477 6.94071 5.08043C7.10849 4.75115 7.37601 4.48363 7.70529 4.31586C8.07963 4.12512 8.57004 4.12512 9.55012 4.12512H13.4653C13.5725 4.12512 13.6663 4.12512 13.7499 4.12588M18.999 9.37506C18.9998 9.45871 18.9998 9.55265 18.9998 9.66003V17.0781C18.9998 18.0562 18.9998 18.5454 18.8093 18.9193C18.6415 19.2486 18.3733 19.5166 18.044 19.6844C17.67 19.8749 17.1807 19.8749 16.2025 19.8749L12.8749 19.8749M18.999 9.37506C18.9966 9.12526 18.9873 8.9671 18.9511 8.81623C18.9083 8.63767 18.8373 8.46694 18.7413 8.31037C18.6331 8.13377 18.4826 7.98285 18.1799 7.68019L15.4452 4.94542C15.1427 4.64296 14.9911 4.49136 14.8146 4.38318C14.658 4.28723 14.4874 4.21634 14.3089 4.17347C14.1579 4.13724 13.9998 4.12816 13.7499 4.12588M18.999 9.37506H19M18.999 9.37506H16.5472C15.569 9.37506 15.0792 9.37506 14.7052 9.18451C14.3759 9.01673 14.1084 8.74849 13.9406 8.41921C13.7499 8.04487 13.7499 7.55517 13.7499 6.57509V4.12588M9.37495 13.75L11.1249 15.5M5 19.8749V17.6875L11.5624 11.125L13.7499 13.3125L7.18747 19.8749H5Z" stroke="currentColor" stroke-width="0.874989" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
};

export const editing: IVectorIcon = {
  name: 'editing',
  style: 'line',
  viewbox: '0 0 16 14',
  path: `
    <g id="menu/editing">
      <path d="M8 13.3336H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M11 2.33377C11.2652 2.06855 11.6249 1.91956 12 1.91956C12.1857 1.91956 12.3696 1.95614 12.5412 2.02721C12.7128 2.09828 12.8687 2.20245 13 2.33377C13.1313 2.46509 13.2355 2.62099 13.3066 2.79257C13.3776 2.96415 13.4142 3.14805 13.4142 3.33377C13.4142 3.51949 13.3776 3.70338 13.3066 3.87497C13.2355 4.04655 13.1313 4.20245 13 4.33377L4.66667 12.6671L2 13.3338L2.66667 10.6671L11 2.33377Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
`
};

export const paperClip: IVectorIcon = {
  name: 'paper-clip',
  style: 'line',
  path: `
    <path d="M20.4398 11.0509L11.2498 20.2409C10.124 21.3667 8.59699 21.9992 7.0048 21.9992C5.41262 21.9992 3.88565 21.3667 2.7598 20.2409C1.63396 19.1151 1.00146 17.5881 1.00146 15.9959C1.00146 14.4037 1.63396 12.8767 2.7598 11.7509L11.9498 2.5609C12.7004 1.81033 13.7183 1.38867 14.7798 1.38867C15.8413 1.38867 16.8592 1.81033 17.6098 2.5609C18.3604 3.31146 18.782 4.32944 18.782 5.3909C18.782 6.45235 18.3604 7.47033 17.6098 8.2209L8.4098 17.4109C8.03452 17.7862 7.52553 17.997 6.9948 17.997C6.46407 17.997 5.95508 17.7862 5.5798 17.4109C5.20452 17.0356 4.99369 16.5266 4.99369 15.9959C4.99369 15.4652 5.20452 14.9562 5.5798 14.5809L14.0698 6.1009" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  `
};

export const shadedArrowDown: IVectorIcon = {
  name: 'shaded-arrow-down',
  style: 'line',
  path: `
    <path d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z" fill="none" stroke="currentColor" />
  `
};

export const shadedArrowRight: IVectorIcon = {
  name: 'shaded-arrow-right',
  style: 'line',
  path: `
    <path d="M6 4L-3.26266e-07 7.4641L-2.34249e-08 0.535898L6 4Z" fill="none" stroke="currentColor" />
  `
};

export const shadedArrowLeft: IVectorIcon = {
  name: 'shaded-arrow-left',
  style: 'line',
  path: `
    <path d="M4.76995e-08 4L6 0.535898L6 7.4641L4.76995e-08 4Z" fill="none" stroke="currentColor" />
  `
};

export const shadedArrowUp: IVectorIcon = {
  name: 'shaded-arrow-up',
  style: 'line',
  path: `
    <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="none" stroke="currentColor" />
  `
};

export const star: IVectorIcon = {
  name: 'star',
  style: 'line',
  path: `
    <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const info: IVectorIcon = {
  name: 'info',
  style: 'line',
  path: `
    <g id="info">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 16V12" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8H12.01" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
};

export const files: IVectorIcon = {
  name: 'files',
  style: 'line',
  path: `
    <path d="M20.0306 6.21938L16.2806 2.46938C16.2109 2.39975 16.1282 2.34454 16.0371 2.3069C15.9461 2.26926 15.8485 2.24992 15.75 2.25H8.25C7.85218 2.25 7.47064 2.40804 7.18934 2.68934C6.90804 2.97064 6.75 3.35218 6.75 3.75V5.25H5.25C4.85218 5.25 4.47064 5.40804 4.18934 5.68934C3.90804 5.97064 3.75 6.35218 3.75 6.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H15.75C16.1478 21.75 16.5294 21.592 16.8107 21.3107C17.092 21.0294 17.25 20.6478 17.25 20.25V18.75H18.75C19.1478 18.75 19.5294 18.592 19.8107 18.3107C20.092 18.0294 20.25 17.6478 20.25 17.25V6.75C20.2501 6.65148 20.2307 6.55391 20.1931 6.46286C20.1555 6.37182 20.1003 6.28908 20.0306 6.21938ZM15.75 20.25H5.25V6.75H12.4397L15.75 10.0603V20.25ZM18.75 17.25H17.25V9.75C17.2501 9.65148 17.2307 9.55391 17.1931 9.46286C17.1555 9.37182 17.1003 9.28908 17.0306 9.21937L13.2806 5.46938C13.2109 5.39975 13.1282 5.34454 13.0371 5.3069C12.9461 5.26926 12.8485 5.24992 12.75 5.25H8.25V3.75H15.4397L18.75 7.06031V17.25ZM13.5 14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15H8.25C8.05109 15 7.86032 14.921 7.71967 14.7803C7.57902 14.6397 7.5 14.4489 7.5 14.25C7.5 14.0511 7.57902 13.8603 7.71967 13.7197C7.86032 13.579 8.05109 13.5 8.25 13.5H12.75C12.9489 13.5 13.1397 13.579 13.2803 13.7197C13.421 13.8603 13.5 14.0511 13.5 14.25ZM13.5 17.25C13.5 17.4489 13.421 17.6397 13.2803 17.7803C13.1397 17.921 12.9489 18 12.75 18H8.25C8.05109 18 7.86032 17.921 7.71967 17.7803C7.57902 17.6397 7.5 17.4489 7.5 17.25C7.5 17.0511 7.57902 16.8603 7.71967 16.7197C7.86032 16.579 8.05109 16.5 8.25 16.5H12.75C12.9489 16.5 13.1397 16.579 13.2803 16.7197C13.421 16.8603 13.5 17.0511 13.5 17.25Z" fill="black"/>
  `
};

export const moreHorizontal: IVectorIcon = {
  name: 'more-horizontal',
  style: 'line',
  path: `
    <g id="moreHorizontal">
      <path d="M12 13.6271C12.5523 13.6271 13 13.1794 13 12.6271C13 12.0749 12.5523 11.6271 12 11.6271C11.4477 11.6271 11 12.0749 11 12.6271C11 13.1794 11.4477 13.6271 12 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 13.6271C19.5523 13.6271 20 13.1794 20 12.6271C20 12.0749 19.5523 11.6271 19 11.6271C18.4477 11.6271 18 12.0749 18 12.6271C18 13.1794 18.4477 13.6271 19 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 13.6271C5.55228 13.6271 6 13.1794 6 12.6271C6 12.0749 5.55228 11.6271 5 11.6271C4.44772 11.6271 4 12.0749 4 12.6271C4 13.1794 4.44772 13.6271 5 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
};

export const moreVertical: IVectorIcon = {
  name: 'more-vertical',
  style: 'line',
  path: `
    <g id="moreVertical">
      <path d="M8.66683 8.0013C8.66683 7.63311 8.36835 7.33464 8.00016 7.33464C7.63197 7.33464 7.3335 7.63311 7.3335 8.0013C7.3335 8.36949 7.63197 8.66797 8.00016 8.66797C8.36835 8.66797 8.66683 8.36949 8.66683 8.0013Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.66683 3.33333C8.66683 2.96514 8.36835 2.66667 8.00016 2.66667C7.63197 2.66667 7.3335 2.96514 7.3335 3.33333C7.3335 3.70152 7.63197 4 8.00016 4C8.36835 4 8.66683 3.70152 8.66683 3.33333Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.66683 12.6654C8.66683 12.2972 8.36835 11.9987 8.00016 11.9987C7.63197 11.9987 7.3335 12.2972 7.3335 12.6654C7.3335 13.0336 7.63197 13.332 8.00016 13.332C8.36835 13.332 8.66683 13.0336 8.66683 12.6654Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `,
  viewbox: '0 0 16 16'
};

export const fileText: IVectorIcon = {
  name: 'file-text',
  style: 'line',
  path: `
    <g id="fileText">
      <path d="M14 2.87256H6C5.46957 2.87256 4.96086 3.08327 4.58579 3.45834C4.21071 3.83342 4 4.34213 4 4.87256V20.8726C4 21.403 4.21071 21.9117 4.58579 22.2868C4.96086 22.6618 5.46957 22.8726 6 22.8726H18C18.5304 22.8726 19.0391 22.6618 19.4142 22.2868C19.7893 21.9117 20 21.403 20 20.8726V8.87256L14 2.87256Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 2.87256V8.87256H20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 13.8726H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 17.8726H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 9.87256H9H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
};

export const gitPullRequest: IVectorIcon = {
  name: 'git-pull-request',
  style: 'line',
  path: `
    <g id="gitPullRequest">
      <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15" stroke="currentColor" fill="none"stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9V21" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
};

export const folder: IVectorIcon = {
  name: 'folder',
  style: 'line',
  path: `
    <path d="M14.3333 12.1667C14.3333 12.5203 14.1929 12.8594 13.9428 13.1095C13.6928 13.3595 13.3536 13.5 13 13.5H2.33333C1.97971 13.5 1.64057 13.3595 1.39052 13.1095C1.14048 12.8594 1 12.5203 1 12.1667V2.83333C1 2.47971 1.14048 2.14057 1.39052 1.89052C1.64057 1.64048 1.97971 1.5 2.33333 1.5H5.66667L7 3.5H13C13.3536 3.5 13.6928 3.64048 13.9428 3.89052C14.1929 4.14057 14.3333 4.47971 14.3333 4.83333V12.1667Z" stroke="currentColor" fill="none" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const crossSmall: IVectorIcon = {
  name: 'cross-small',
  style: 'line',
  path: `
<path d="M16 8.62714L8 16.6271" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 8.62714L16 16.6271" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const crossLarge: IVectorIcon = {
  name: 'cross-large',
  style: 'line',
  path: `
    <path d="M18 6.62714L6 18.6271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" fill="none"/>
    <path d="M6 6.62714L18 18.6271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" fill="none"/>
  `
};

export const copy: IVectorIcon = {
  name: 'copy',
  style: 'line',
  path: `
    <path d="M18 6.94C17.9897 6.84812 17.9695 6.75761 17.94 6.67V6.58C17.893 6.47655 17.8288 6.38186 17.75 6.3L11.75 0.3C11.6681 0.221221 11.5734 0.156968 11.47 0.11C11.4402 0.105474 11.4098 0.105474 11.38 0.11C11.2782 0.0522223 11.1661 0.014858 11.05 0H7C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3V4H3C2.20435 4 1.44129 4.31607 0.87868 4.87868C0.316071 5.44129 0 6.20435 0 7V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H11C11.7956 20 12.5587 19.6839 13.1213 19.1213C13.6839 18.5587 14 17.7956 14 17V16H15C15.7956 16 16.5587 15.6839 17.1213 15.1213C17.6839 14.5587 18 13.7956 18 13V6.94ZM12 3.41L14.59 6H13C12.7348 6 12.4804 5.89464 12.2929 5.70711C12.1054 5.51957 12 5.26522 12 5V3.41ZM12 17C12 17.2652 11.8946 17.5196 11.7071 17.7071C11.5196 17.8946 11.2652 18 11 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V7C2 6.73478 2.10536 6.48043 2.29289 6.29289C2.48043 6.10536 2.73478 6 3 6H4V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H12V17ZM16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2H10V5C10 5.79565 10.3161 6.55871 10.8787 7.12132C11.4413 7.68393 12.2044 8 13 8H16V13Z" fill="#A6A3AD"/>
  `
};

export const reset: IVectorIcon = {
  name: 'reset',
  style: 'line',
  fill: 'none',
  path: `
<path d="M4 6.00195V10.5023H8.50032" stroke-width="1.50011" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" />
<path d="M5.88263 14.2534C6.36896 15.6338 7.29073 16.8187 8.50906 17.6297C9.72739 18.4406 11.1763 18.8337 12.6374 18.7496C14.0985 18.6655 15.4927 18.1088 16.61 17.1634C17.7272 16.2181 18.507 14.9352 18.8317 13.5081C19.1565 12.0811 19.0086 10.5871 18.4105 9.25138C17.8123 7.91564 16.7963 6.81047 15.5154 6.1024C14.2346 5.39433 12.7583 5.12171 11.309 5.32561C9.85975 5.52952 8.516 6.1989 7.48025 7.23291L4 10.5031" stroke="currentColor" stroke-width="1.50011" stroke-linecap="round" stroke-linejoin="round"/>
   `
};

export const move: IVectorIcon = {
  name: 'move',
  style: 'line',
  fill: 'none',
  path: `
<circle cx="8.5" cy="4.5" r="1.5" fill="currentColor"/>
<circle cx="8.5" cy="11.5" r="1.5" fill="currentColor"/>
<circle cx="8.5" cy="18.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="18.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="11.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="4.5" r="1.5" fill="currentColor"/>
  `
};

export const eye: IVectorIcon = {
  name: 'eye',
  fill: 'none',
  style: 'line',
  path: `
<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const eyeOff: IVectorIcon = {
  name: 'eye-off',
  fill: 'none',
  style: 'line',
  path: `
<path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 2.5L21.5 21.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
};

export const handSignEmoji: IVectorIcon = {
  name: 'hand-sign-emoji',
  fill: 'none',
  style: 'line',
  viewbox: '0 0 40 40',
  path: `
<path d="M10.463 29.8727C10.1628 29.8136 9.92276 29.7546 9.62266 29.6365C9.32255 29.5184 9.08247 29.4593 8.84239 29.3412C8.3022 29.105 7.82203 28.8098 7.34186 28.4555C6.38153 27.8059 5.60126 26.9202 5.00105 25.8573C4.40084 24.8535 4.04071 23.6725 3.98069 22.5506C3.92067 21.9601 3.98069 21.4287 4.04071 20.8382C4.10073 20.5429 4.16075 20.3067 4.22077 20.0115C4.2808 19.7162 4.40084 19.48 4.46086 19.1848L4.52088 20.0115C4.52088 20.3067 4.5809 20.5429 4.64092 20.8382C4.70094 21.3696 4.82098 21.9011 4.94103 22.3734C5.18111 23.3773 5.54124 24.3221 6.08142 25.2078C6.62161 26.0935 7.22182 26.9202 8.00209 27.6878C8.36222 28.0421 8.78237 28.3964 9.20251 28.7507C9.38258 28.9279 9.62266 29.105 9.86274 29.2822L10.463 29.8727ZM10.2829 31.9984C10.1028 32.1165 9.86274 32.1756 9.62266 32.2346C9.38258 32.2937 9.20251 32.3527 8.96243 32.3527C8.54228 32.4118 8.06211 32.4708 7.58195 32.4118C6.68163 32.3527 5.7213 32.1165 4.94103 31.7032C4.10073 31.2898 3.38048 30.6403 2.90031 29.8727C2.66023 29.5184 2.42015 29.105 2.24008 28.6917C2.18006 28.5145 2.12004 28.2783 2.06002 28.0421C2.06002 27.865 2 27.6878 2 27.4516C2.18006 27.6288 2.3001 27.8059 2.42015 27.924C2.60021 28.1012 2.72025 28.2783 2.84029 28.3964C3.1404 28.6917 3.38048 28.9869 3.68059 29.2231C4.2808 29.7546 4.881 30.2269 5.60126 30.5812C6.26149 30.9355 7.04176 31.2308 7.76201 31.467C8.12214 31.5851 8.54228 31.6441 8.96243 31.7622C9.14249 31.8213 9.38258 31.8213 9.56264 31.8803C9.86274 31.9394 10.0428 31.9394 10.2829 31.9984ZM23.8476 3.30065C24.1477 3.3597 24.3878 3.4778 24.6879 3.59589C24.988 3.71399 25.2281 3.83209 25.4682 3.95019C26.0084 4.24543 26.4885 4.54068 26.9687 4.89497C27.929 5.60356 28.7093 6.54834 29.2495 7.61122C29.7897 8.6741 30.0898 9.85508 30.0898 10.977C30.0898 11.5675 30.0298 12.0989 29.9097 12.6894C29.8497 12.9847 29.7897 13.2209 29.6697 13.5161C29.5496 13.8114 29.4896 14.0475 29.3695 14.2837L29.3095 13.4571C29.3095 13.1618 29.3095 12.9256 29.2495 12.6304L29.0694 11.0361C28.8894 10.0322 28.5293 9.02839 28.0491 8.08361C27.5689 7.13883 26.9687 6.31214 26.2485 5.54451C25.8883 5.13116 25.4682 4.77687 25.1081 4.36353C24.928 4.18638 24.6879 4.00924 24.4478 3.83209L23.8476 3.30065ZM29.0694 3.06445C29.3095 3.1235 29.4896 3.18255 29.6697 3.30065C29.8497 3.3597 30.0898 3.4778 30.2699 3.59589C30.63 3.83209 30.9901 4.06828 31.3502 4.36353C32.0105 4.95402 32.5507 5.6626 32.8508 6.48929C33.2109 7.31597 33.3309 8.20171 33.2109 9.08744C33.1509 9.50078 33.0308 9.91412 32.9108 10.3275C32.8508 10.5046 32.7307 10.7408 32.6707 10.918C32.5507 11.0951 32.4906 11.2722 32.3106 11.4494V10.8589V10.2684C32.3106 9.85508 32.2506 9.50078 32.2506 9.14649C32.1305 8.37885 32.0105 7.67027 31.7104 7.02073C31.4103 6.31214 31.0501 5.72165 30.63 5.07212C30.3899 4.77687 30.1498 4.42258 29.9097 4.12733C29.7897 3.95019 29.6697 3.83209 29.4896 3.65494C29.3695 3.3597 29.1895 3.18255 29.0694 3.06445Z" fill="currentColor"/>
<path d="M6.789 11.8622C5.58859 12.3937 5.16844 13.8108 5.70863 14.9918L13.2713 30.5217L17.4727 28.573L9.91009 12.9841C9.3699 11.8032 7.98942 11.2717 6.789 11.8622ZM26.6559 24.2034L31.0975 22.1367L22.4545 4.42205C21.8543 3.24107 20.4138 2.70963 19.1533 3.30012C17.9529 3.89061 17.4127 5.30778 18.0129 6.54781L26.6559 24.2034Z" fill="#FFDD67"/>
<path d="M19.2195 3.24123C19.0995 3.30028 18.9794 3.35933 18.8594 3.47742C19.9998 3.18218 21.2002 3.71362 21.7404 4.7765L30.3834 22.4912L31.1637 22.1369L22.5207 4.42221C21.9204 3.18218 20.4799 2.65074 19.2195 3.24123Z" fill="#EBA352"/>
<path d="M17.498 28.5134L22.1196 26.3286L13.2965 8.25962C12.6963 7.01959 11.1357 6.4291 9.87531 7.01959C8.61487 7.61008 8.07468 9.14535 8.67489 10.3854L17.498 28.5134Z" fill="#FFDD67"/>
<path d="M9.87575 7.07983C9.75571 7.13888 9.63567 7.19793 9.51562 7.31602C10.656 7.02078 11.9765 7.55222 12.5167 8.67415L17.9786 19.9525L19.299 20.7201L13.2969 8.31985C12.6967 7.02078 11.1962 6.48934 9.87575 7.07983Z" fill="#EBA352"/>
<path d="M21.3964 24.9126L26.018 22.7278L17.1949 4.65884C16.5947 3.41881 15.0342 2.82832 13.7737 3.47786C12.5133 4.06835 11.9731 5.60362 12.5733 6.84365L21.3964 24.9126Z" fill="#FFDD67"/>
<path d="M13.7679 3.41869C13.6478 3.47774 13.5278 3.59584 13.4077 3.65489C14.5481 3.35965 15.8686 3.89109 16.4088 5.01302L22.5909 17.7676L23.9114 18.5352L17.1891 4.65872C16.5888 3.35965 15.0283 2.82821 13.7679 3.41869ZM6.80544 11.8627C6.6854 11.9217 6.56535 11.9808 6.44531 12.0989C7.52569 11.8036 8.66609 12.3351 9.14625 13.398L13.6478 22.6686L14.9683 23.4363L9.92653 13.0437C9.38634 11.8036 8.00586 11.2722 6.80544 11.8627Z" fill="#EBA352"/>
<path d="M37.2968 10.0913C35.6763 8.85128 33.0353 10.2094 31.7149 14.4609C30.8146 17.4134 30.6945 18.2991 28.7738 19.1848L27.6935 17C27.6935 17 10.6475 25.0897 11.3078 26.3888C11.3078 26.3888 13.3485 32.648 16.8297 35.5414C21.9915 39.911 34.0557 35.2461 34.5959 23.9678C34.896 17.4134 39.0374 11.4494 37.2968 10.0913Z" fill="#FFDD67"/>
<path d="M37.2841 10.0901C36.984 9.8539 36.6238 9.73581 36.2637 9.67676C36.3237 9.73581 36.4438 9.73581 36.5038 9.79486C38.3044 11.153 36.4438 14.2826 35.4234 17.1169C34.5831 19.3608 33.8629 21.6637 33.9829 23.9075C34.4631 33.7097 24.4396 38.3745 18.4375 36.6031C24.3196 39.0241 35.2434 34.4182 34.7632 24.2028C34.6432 21.9589 35.3034 19.7741 36.2037 17.4122C37.164 14.5778 39.0247 11.4482 37.2841 10.0901Z" fill="#EBA352"/>
<path d="M29.2855 18.9473C25.5642 19.3606 20.1023 24.616 23.9437 30.3437C21.1227 24.5569 25.7443 20.6597 28.6853 19.3016C28.9854 19.0654 29.2855 18.9473 29.2855 18.9473Z" fill="#EBA352"/>
`
};

export const calendar: IVectorIcon = {
  name: 'calendar',
  fill: 'none',
  style: 'line',
  path: `
<path d="M19 5H5C3.89543 5 3 5.79594 3 6.77778V19.2222C3 20.2041 3.89543 21 5 21H19C20.1046 21 21 20.2041 21 19.2222V6.77778C21 5.79594 20.1046 5 19 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 11H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
};

export const paint: IVectorIcon = {
  name: 'paint',
  fill: 'none',
  style: 'line',
  viewbox: '0 0 24 24',
  path: `
  <path d="M10.4185 14.3826C10.2133 13.8535 9.83866 13.4155 9.35871 13.1435C8.87876 12.8716 8.32336 12.7827 7.78765 12.8921C7.25194 13.0015 6.76924 13.3023 6.42224 13.743C6.07524 14.1838 5.88552 14.7371 5.88558 15.3081C5.88558 15.5609 5.83596 15.8109 5.73978 16.0428C5.6436 16.2747 5.50292 16.4835 5.32646 16.6562C5.15 16.8289 4.94151 16.9618 4.71393 17.0467C4.48635 17.1317 4.24451 17.1668 4.00342 17.1499C4.39118 17.8546 4.99048 18.4057 5.70829 18.7176C6.42609 19.0295 7.22224 19.0848 7.97314 18.8748C8.72404 18.6649 9.38768 18.2014 9.86104 17.5565C10.3344 16.9116 10.591 16.1212 10.591 15.3081C10.591 14.9807 10.5298 14.6681 10.4185 14.3826ZM10.4185 14.3826C11.3509 14.0502 12.2427 13.6041 13.0755 13.0535C14.5626 12.0705 15.8347 10.7712 16.8108 9.24019L19.8505 4.47023C19.9669 4.28855 20.0195 4.07022 19.9991 3.85252C19.9788 3.63482 19.8869 3.43125 19.739 3.27658C19.5912 3.12191 19.3966 3.02574 19.1885 3.00447C18.9804 2.98321 18.7717 3.03818 18.598 3.16001L14.0385 6.3408C12.5747 7.36184 11.3325 8.69349 10.3926 10.2493C11.5859 10.8079 12.5408 11.8068 13.0747 13.0552M9.12056 13.033C9.43838 12.0555 9.86534 11.1206 10.3926 10.2477" stroke="currentColor" stroke-width="1.41615" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const closeTag: IVectorIcon = {
  name: 'close-tag',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M7.5 2.5L2.5 7.5" stroke="currentColor" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 2.5L7.5 7.5" stroke="currentColor" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
`,
  viewbox: '0 0 10 10'
};

export const slashCircle: IVectorIcon = {
  name: 'slash-circle',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M3.28671 3.28671L12.7134 12.7134M12.7133 3.2867L3.28666 12.7134M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
`,
  viewbox: '0 0 16 16'
};

export const openDocument: IVectorIcon = {
  name: 'open-document',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M7.5 15.1673H3.9974C3.64377 15.1673 3.30464 15.0268 3.05459 14.7768C2.80454 14.5267 2.66406 14.1876 2.66406 13.834V3.16732C2.66406 2.8137 2.80454 2.47456 3.05459 2.22451C3.30464 1.97446 3.64377 1.83398 3.9974 1.83398H9.33073H11.6641C12.6641 1.83398 13.3307 2.50065 13.3307 3.50065V9" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10.6693 8.5H5.33594" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.33594 11.166H5.33594" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/> <path d="M6.66927 5.83398H6.0026H5.33594" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.3188 11.5H13.5V13.6811" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 15L13.4987 11.5" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/> `,
  viewbox: '0 0 16 17'
};

export const time: IVectorIcon = {
  name: 'time',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.5 3.5V6.5L8.5 7.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>`,
  viewbox: '0 0 13 13'
};

export const remains: IVectorIcon = {
  name: 'remains',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <mask id="path-2-inside-1_20300_3161" fill="white">
    <path d="M12.0013 17C11.4484 17 10.9284 16.8951 10.4413 16.6853C9.95452 16.4753 9.53096 16.1902 9.17067 15.8302C8.81037 15.4702 8.52519 15.0471 8.31511 14.5609C8.10504 14.0747 8 13.5548 8 13.0013C8 12.4479 8.10504 11.9279 8.31511 11.4413C8.52489 10.9545 8.80948 10.531 9.16889 10.1707C9.5283 9.81037 9.95156 9.52519 10.4387 9.31511C10.9258 9.10504 11.4458 9 11.9987 9C12.5516 9 13.0716 9.10504 13.5587 9.31511C14.0455 9.52489 14.469 9.80963 14.8293 10.1693C15.1896 10.529 15.4748 10.9523 15.6849 11.4391C15.895 11.9259 16 12.4458 16 12.9987C16 13.5516 15.8951 14.0716 15.6853 14.5587C15.4756 15.0458 15.1905 15.4693 14.8302 15.8293C14.4699 16.1893 14.0468 16.4745 13.5609 16.6849C13.075 16.8953 12.5551 17.0003 12.0013 17ZM12 16.5556C12.9926 16.5556 13.8333 16.2111 14.5222 15.5222C15.2111 14.8333 15.5556 13.9926 15.5556 13C15.5556 12.5259 15.4652 12.0719 15.2844 11.6378C15.1037 11.2034 14.8473 10.8197 14.5151 10.4867L12 13V9.44444C11.0074 9.44444 10.1667 9.78889 9.47778 10.4778C8.78889 11.1667 8.44444 12.0074 8.44444 13C8.44444 13.9926 8.78889 14.8333 9.47778 15.5222C10.1667 16.2111 11.0074 16.5556 12 16.5556Z"/>
    </mask>
    <path d="M12.0013 17C11.4484 17 10.9284 16.8951 10.4413 16.6853C9.95452 16.4753 9.53096 16.1902 9.17067 15.8302C8.81037 15.4702 8.52519 15.0471 8.31511 14.5609C8.10504 14.0747 8 13.5548 8 13.0013C8 12.4479 8.10504 11.9279 8.31511 11.4413C8.52489 10.9545 8.80948 10.531 9.16889 10.1707C9.5283 9.81037 9.95156 9.52519 10.4387 9.31511C10.9258 9.10504 11.4458 9 11.9987 9C12.5516 9 13.0716 9.10504 13.5587 9.31511C14.0455 9.52489 14.469 9.80963 14.8293 10.1693C15.1896 10.529 15.4748 10.9523 15.6849 11.4391C15.895 11.9259 16 12.4458 16 12.9987C16 13.5516 15.8951 14.0716 15.6853 14.5587C15.4756 15.0458 15.1905 15.4693 14.8302 15.8293C14.4699 16.1893 14.0468 16.4745 13.5609 16.6849C13.075 16.8953 12.5551 17.0003 12.0013 17ZM12 16.5556C12.9926 16.5556 13.8333 16.2111 14.5222 15.5222C15.2111 14.8333 15.5556 13.9926 15.5556 13C15.5556 12.5259 15.4652 12.0719 15.2844 11.6378C15.1037 11.2034 14.8473 10.8197 14.5151 10.4867L12 13V9.44444C11.0074 9.44444 10.1667 9.78889 9.47778 10.4778C8.78889 11.1667 8.44444 12.0074 8.44444 13C8.44444 13.9926 8.78889 14.8333 9.47778 15.5222C10.1667 16.2111 11.0074 16.5556 12 16.5556Z" fill="black"/>
    <path d="M12.0013 17L12.0067 7H12.0013V17ZM10.4413 16.6853L6.47922 25.8669L6.48596 25.8698L10.4413 16.6853ZM8.31511 11.4413L17.4958 15.4055L17.4987 15.3987L8.31511 11.4413ZM13.5587 9.31511L9.59859 18.4976L9.60127 18.4987L13.5587 9.31511ZM15.2844 11.6378L6.05181 15.4795L6.05274 15.4817L15.2844 11.6378ZM14.5151 10.4867L21.5956 3.42505L14.5271 -3.66242L7.44654 3.4131L14.5151 10.4867ZM12 13H2V37.1301L19.0686 20.0736L12 13ZM12 9.44444H22V-0.555555H12V9.44444ZM12.0013 17V7C12.7497 7 13.5815 7.14975 14.3967 7.50083L10.4413 16.6853L6.48596 25.8698C8.2754 26.6405 10.1472 27 12.0013 27V17ZM10.4413 16.6853L14.4034 7.50374C15.0274 7.773 15.6696 8.18749 16.2388 8.75625L9.17067 15.8302L2.10251 22.9042C3.39232 24.193 4.88162 25.1775 6.47922 25.8669L10.4413 16.6853ZM9.17067 15.8302L16.2388 8.75625C16.8081 9.32502 17.2242 9.96799 17.4949 10.5947L8.31511 14.5609L-0.864725 18.5271C-0.173802 20.1262 0.812675 21.6154 2.10251 22.9042L9.17067 15.8302ZM8.31511 14.5609L17.4949 10.5947C17.8502 11.417 18 12.2532 18 13.0013H8H-2C-2 14.8564 -1.64014 16.7324 -0.864725 18.5271L8.31511 14.5609ZM8 13.0013H18C18 13.7494 17.8502 14.5848 17.4958 15.4055L8.31511 11.4413L-0.865604 7.47719C-1.64014 9.27095 -2 11.1463 -2 13.0013H8ZM8.31511 11.4413L17.4987 15.3987C17.2305 16.0213 16.817 16.6632 16.2487 17.233L9.16889 10.1707L2.08909 3.10834C0.801929 4.39868 -0.180682 5.88773 -0.868515 7.48393L8.31511 11.4413ZM9.16889 10.1707L16.2487 17.233C15.6743 17.8088 15.0264 18.2269 14.3987 18.4976L10.4387 9.31511L6.47859 0.132641C4.8767 0.823477 3.38232 1.81191 2.08909 3.10834L9.16889 10.1707ZM10.4387 9.31511L14.3987 18.4976C13.5824 18.8496 12.749 19 11.9987 19V9V-1C10.1426 -1 8.26911 -0.63955 6.47859 0.132641L10.4387 9.31511ZM11.9987 9V19C11.2484 19 10.4149 18.8496 9.59859 18.4976L13.5587 9.31511L17.5187 0.132641C15.7282 -0.639551 13.8547 -1 11.9987 -1V9ZM13.5587 9.31511L9.60127 18.4987C8.97698 18.2297 8.33411 17.8153 7.76409 17.2462L14.8293 10.1693L21.8946 3.09245C20.604 1.80395 19.114 0.820058 17.5161 0.131485L13.5587 9.31511ZM14.8293 10.1693L7.76409 17.2462C7.19105 16.6741 6.77391 16.0283 6.5033 15.4012L15.6849 11.4391L24.8665 7.477C24.1757 5.87625 23.1882 4.38395 21.8946 3.09245L14.8293 10.1693ZM15.6849 11.4391L6.5033 15.4012C6.15037 14.5834 6 13.7489 6 12.9987H16H26C26 11.1426 25.6396 9.26847 24.8665 7.477L15.6849 11.4391ZM16 12.9987H6C6 12.2503 6.14976 11.4185 6.50083 10.6033L15.6853 14.5587L24.8698 18.514C25.6405 16.7246 26 14.8528 26 12.9987H16ZM15.6853 14.5587L6.50083 10.6033C6.7714 9.97503 7.18872 9.32823 7.76206 8.75536L14.8302 15.8293L21.8984 22.9033C23.1923 21.6104 24.1797 20.1165 24.8698 18.514L15.6853 14.5587ZM14.8302 15.8293L7.76206 8.75536C8.32718 8.19071 8.96554 7.77743 9.58796 7.50797L13.5609 16.6849L17.5338 25.8618C19.1281 25.1716 20.6127 24.188 21.8984 22.9033L14.8302 15.8293ZM13.5609 16.6849L9.58796 7.50797C10.4153 7.14981 11.256 6.9996 12.0067 7L12.0013 17L11.996 27C13.8542 27.001 15.7347 26.6407 17.5338 25.8618L13.5609 16.6849ZM12 16.5556V26.5556C15.5887 26.5556 18.9898 25.1968 21.5933 22.5933L14.5222 15.5222L7.45115 8.45115C7.97593 7.92638 8.69039 7.40977 9.58391 7.0437C10.4737 6.67916 11.317 6.55556 12 6.55556V16.5556ZM14.5222 15.5222L21.5933 22.5933C24.1968 19.9898 25.5556 16.5887 25.5556 13H15.5556H5.55556C5.55556 12.317 5.67916 11.4737 6.0437 10.5839C6.40977 9.69039 6.92638 8.97593 7.45115 8.45115L14.5222 15.5222ZM15.5556 13H25.5556C25.5556 11.2176 25.2083 9.45627 24.5161 7.79386L15.2844 11.6378L6.05274 15.4817C5.72203 14.6874 5.55556 13.8342 5.55556 13H15.5556ZM15.2844 11.6378L24.5171 7.7961C23.8358 6.15874 22.8484 4.68114 21.5956 3.42505L14.5151 10.4867L7.4346 17.5483C6.84616 16.9583 6.37163 16.2481 6.05181 15.4795L15.2844 11.6378ZM14.5151 10.4867L7.44654 3.4131L4.93143 5.92643L12 13L19.0686 20.0736L21.5837 17.5602L14.5151 10.4867ZM12 13H22V9.44444H12H2V13H12ZM12 9.44444V-0.555555C8.4113 -0.555555 5.01023 0.803189 2.40671 3.40671L9.47778 10.4778L16.5488 17.5488C16.0241 18.0736 15.3096 18.5902 14.4161 18.9563C13.5263 19.3208 12.683 19.4444 12 19.4444V9.44444ZM9.47778 10.4778L2.40671 3.40671C-0.196811 6.01023 -1.55556 9.4113 -1.55556 13H8.44444H18.4444C18.4444 13.683 18.3208 14.5263 17.9563 15.4161C17.5902 16.3096 17.0736 17.0241 16.5488 17.5488L9.47778 10.4778ZM8.44444 13H-1.55556C-1.55556 16.5887 -0.196809 19.9898 2.40671 22.5933L9.47778 15.5222L16.5488 8.45115C17.0736 8.97593 17.5902 9.69039 17.9563 10.5839C18.3208 11.4737 18.4444 12.317 18.4444 13H8.44444ZM9.47778 15.5222L2.40671 22.5933C5.01023 25.1968 8.41129 26.5556 12 26.5556V16.5556V6.55556C12.683 6.55556 13.5263 6.67916 14.4161 7.0437C15.3096 7.40977 16.0241 7.92638 16.5488 8.45115L9.47778 15.5222Z" fill="black" mask="url(#path-2-inside-1_20300_3161)"/>
  `,
  viewbox: '0 0 24 24'
};

export const atSign: IVectorIcon = {
  name: 'at-sign',
  fill: 'none',
  style: 'line',
  path: `
    <g clip-path="url(#clip0_21868_2326)">
    <path d="M7.9987 10.6654C9.47146 10.6654 10.6654 9.47146 10.6654 7.9987C10.6654 6.52594 9.47146 5.33203 7.9987 5.33203C6.52594 5.33203 5.33203 6.52594 5.33203 7.9987C5.33203 9.47146 6.52594 10.6654 7.9987 10.6654Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.6654 5.33552V8.66886C10.6654 9.19929 10.8761 9.708 11.2512 10.0831C11.6262 10.4581 12.1349 10.6689 12.6654 10.6689C13.1958 10.6689 13.7045 10.4581 14.0796 10.0831C14.4547 9.708 14.6654 9.19929 14.6654 8.66886V8.00219C14.6653 6.49754 14.1562 5.03718 13.2209 3.85854C12.2856 2.67991 10.9791 1.85234 9.5138 1.51039C8.04852 1.16844 6.51066 1.33222 5.15027 1.9751C3.78988 2.61799 2.68697 3.70216 2.02088 5.05134C1.35478 6.40052 1.16468 7.93535 1.48148 9.40627C1.79828 10.8772 2.60335 12.1977 3.76579 13.153C4.92823 14.1084 6.37966 14.6424 7.88408 14.6683C9.38851 14.6942 10.8574 14.2104 12.052 13.2955" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_21868_2326">
    <rect width="16" height="16" fill="transparent"/>
    </clipPath>
    </defs>
  `,
  viewbox: '0 0 16 16'
};

export const smile: IVectorIcon = {
  name: 'smile',
  fill: 'none',
  style: 'line',
  path: `
    <g clip-path="url(#clip0_21871_4710)">
    <path d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.33203 9.33203C5.33203 9.33203 6.33203 10.6654 7.9987 10.6654C9.66536 10.6654 10.6654 9.33203 10.6654 9.33203" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 6H6.00667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 6H10.0067" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_21871_4710">
    <rect width="16" height="16" fill="transparent"/>
    </clipPath>
    </defs>
  `,
  viewbox: '0 0 16 16'
};

export const planeRight: IVectorIcon = {
  name: 'plane-right',
  fill: 'none',
  style: 'line',
  path: `
    <path d="M1.75488 1.00391C2.04378 0.981219 2.33422 1.03257 2.58691 1.15039L14.8125 6.96387L14.8115 6.96777H14.8213C15.0385 7.07133 15.2194 7.21936 15.3447 7.39844C15.4711 7.57901 15.5371 7.78418 15.5371 7.99219C15.5371 8.20019 15.4711 8.40538 15.3447 8.58594C15.2184 8.7664 15.0359 8.91589 14.8164 9.01953H14.8154L2.59473 14.8438L2.59277 14.8447L2.58789 14.8477C2.37432 14.9477 2.13321 15.0005 1.8877 15.001C1.65919 15.0008 1.43397 14.9546 1.23145 14.8672C1.02896 14.7798 0.854633 14.6533 0.723633 14.499C0.592862 14.3449 0.508691 14.1674 0.477539 13.9814C0.454166 13.8419 0.461487 13.7004 0.498047 13.5635L0.543945 13.4277L2.73926 8.01074L2.74414 7.99902L2.73926 7.9873L0.543945 2.57031C0.449116 2.34469 0.438884 2.10049 0.514648 1.87012C0.590526 1.63957 0.749261 1.43234 0.970703 1.27734C1.19217 1.12236 1.46582 1.02664 1.75488 1.00391ZM2.38184 2.71973L4.23145 7.2832L4.23926 7.30176H8.28906C8.51404 7.30176 8.72896 7.37644 8.88672 7.50781C9.04431 7.63914 9.1318 7.81613 9.13184 7.99902C9.13184 8.18195 9.04434 8.35889 8.88672 8.49023C8.72896 8.62165 8.51409 8.69628 8.28906 8.69629H4.23926L4.23145 8.71484L2.38281 13.2773L2.35254 13.3496L2.42383 13.3164L13.5352 8.01953L13.5928 7.99219L13.5352 7.96484L2.42285 2.68066L2.35254 2.64746L2.38184 2.71973Z" fill="currentColor" stroke="currentColor" stroke-width="0.0606218"/>
  `,
  viewbox: '0 0 16 16'
};

export const sidebar: IVectorIcon = {
  name: IconNameEnum.sidebar,
  style: 'line',
  fill: 'none',
  path: `
<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `
};

export const pin: IVectorIcon = {
  name: IconNameEnum.pin,
  style: 'line',
  fill: 'none',
  viewbox: '0 0 16 16',
  path: `
<path d="M9.82606 2L9.30431 3.56517L9.82606 4.08693L6.85534 7.05763C6.43352 6.85174 5.97317 6.68568 5.52115 6.58145C5.15448 6.49691 4.79703 6.45529 4.47105 6.45863C4.03764 6.46309 3.66022 6.54717 3.39075 6.71531L9.28459 12.6091C9.5792 12.137 9.61538 11.3328 9.41842 10.4788C9.31419 10.0267 9.14814 9.56641 8.9423 9.14458L11.913 6.17381L12.4348 6.69559L14 6.17383L9.82606 2ZM5.50885 9.48858L2 13.9999L6.51137 10.4911L5.50885 9.48858Z" fill="currentColor"/>
`
};

export const read: IVectorIcon = {
  name: IconNameEnum.read,
  style: 'line',
  fill: 'none',
  viewbox: '0 0 16 16',
  path: `
<path d="M10.9956 4.22973C10.6853 3.91648 10.1795 3.91253 9.8643 4.22092L3.95096 10.0539L1.38037 7.39791C1.07378 7.07899 0.566209 7.06852 0.246696 7.37452C-0.072851 7.68051 -0.0833393 8.1871 0.223254 8.50599C0.224643 8.50741 0.225997 8.50883 0.227386 8.51025L3.36166 11.7521C3.51166 11.9048 3.71667 11.9913 3.93095 11.9921H3.93977C4.14999 11.9915 4.35156 11.9084 4.50104 11.7609L10.9884 5.35888C11.3019 5.04865 11.3051 4.54394 10.9956 4.22973Z" fill="currentColor"/>
<path d="M8.17142 11.7522C8.32104 11.9045 8.52539 11.9909 8.73911 11.9923H8.74793C8.95815 11.9916 9.15972 11.9085 9.3092 11.761L15.7966 5.359C16.0907 5.02853 16.0606 4.52274 15.7296 4.22926C15.4294 3.96319 14.9784 3.95969 14.6741 4.22104L8.76315 10.0541L8.55227 9.83558C8.24571 9.51665 7.73814 9.50615 7.41859 9.81215C7.09904 10.1181 7.08852 10.6247 7.39511 10.9436C7.3965 10.9451 7.39789 10.9465 7.39928 10.9479L8.17142 11.7522Z" fill="currentColor"/>
`
};

export const addUser: IVectorIcon = {
  name: IconNameEnum.addUser,
  style: 'line',
  fill: 'none',
  path: `
<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 8V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 11H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
};

export const noDistrub: IVectorIcon = {
  name: IconNameEnum.noDistrub,
  viewbox: '0 0 25 24',
  style: 'line',
  fill: 'none',
  path: `
<path d="M14.2295 21C14.0537 21.3031 13.8014 21.5547 13.4978 21.7295C13.1941 21.9044 12.8499 21.9965 12.4995 21.9965C12.1492 21.9965 11.8049 21.9044 11.5013 21.7295C11.1977 21.5547 10.9453 21.3031 10.7695 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.1284 13C18.6835 11.3714 18.4714 9.68804 18.4984 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.76 6.26172C6.58627 6.82533 6.49861 7.41194 6.5 8.00172C6.5 15.0017 3.5 17.0017 3.5 17.0017H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5019 8.00109C18.5035 6.91415 18.2098 5.8472 17.6522 4.91418C17.0946 3.98117 16.294 3.21715 15.336 2.70373C14.378 2.19031 13.2984 1.94678 12.2128 1.99916C11.1271 2.05153 10.076 2.39784 9.17188 3.00109" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.5 1L23.5 23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const logout: IVectorIcon = {
  name: IconNameEnum.logout,
  viewbox: '0 0 25 24',
  style: 'line',
  fill: 'none',
  path: `
<path d="M9 20H5.66667C5.22464 20 4.80072 19.8127 4.48816 19.4793C4.17559 19.1459 4 18.6937 4 18.2222V5.77778C4 5.30628 4.17559 4.8541 4.48816 4.5207C4.80072 4.1873 5.22464 4 5.66667 4H9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.833 16.1666L19.9997 11.9999L15.833 7.83325" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 12H10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const keyboard: IVectorIcon = {
  name: IconNameEnum.keyboard,
  viewbox: '0 0 24 24',
  style: 'line',
  fill: 'none',
  path: `
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 5H4C2.9 5 2.01 5.96429 2.01 7.14286L2 17.8571C2 19.0357 2.9 20 4 20H20C21.1 20 22 19.0357 22 17.8571V7.14286C22 5.96429 21.1 5 20 5ZM20 7.14286V17.8571H4V7.14286H20ZM13 8.21429H11V10.3571H13V8.21429ZM11 11.4286H13V13.5714H11V11.4286ZM10 8.21429H8V10.3571H10V8.21429ZM8 11.4286H10V13.5714H8V11.4286ZM7 11.4286H5V13.5714H7V11.4286ZM5 8.21429H7V10.3571H5V8.21429ZM16 14.6429H8V16.7857H16V14.6429ZM14 11.4286H16V13.5714H14V11.4286ZM16 8.21429H14V10.3571H16V8.21429ZM17 11.4286H19V13.5714H17V11.4286ZM19 8.21429H17V10.3571H19V8.21429Z" fill="currentColor"/>
`
};

export const message: IVectorIcon = {
  name: IconNameEnum.message,
  style: 'line',
  fill: 'none',
  path: `
<path d="M21.9598 10.9707C22.0134 11.8009 22.0134 12.6607 21.9598 13.4909C21.6856 17.7332 18.3536 21.1125 14.1706 21.3905C12.7435 21.4854 11.2536 21.4852 9.8294 21.3905C9.33896 21.3579 8.8044 21.2409 8.34401 21.0513C7.83177 20.8403 7.5756 20.7348 7.44544 20.7508C7.31527 20.7668 7.1264 20.9061 6.74868 21.1846C6.08268 21.6757 5.24367 22.0285 3.99943 21.9982C3.37026 21.9829 3.05568 21.9752 2.91484 21.7351C2.77401 21.495 2.94941 21.1626 3.30021 20.4978C3.78674 19.5758 4.09501 18.5203 3.62791 17.6746C2.82343 16.4666 2.1401 15.036 2.04024 13.4909C1.98659 12.6607 1.98659 11.8009 2.04024 10.9707C2.31441 6.72838 5.64639 3.34913 9.8294 3.07107C11.0318 2.99114 11.2812 2.97856 12.5 3.03368" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z" stroke="currentColor" stroke-width="1.5"/>
    `
};

export const darkThemeSwitcher: IVectorIcon = {
  name: IconNameEnum.darkThemeSwitcher,
  style: 'line',
  path: `
<path d="M15.3635 16.6363C15.3635 15.6116 14.9564 14.6289 14.2319 13.9043C13.5073 13.1798 12.5246 12.7727 11.4999 12.7727C10.4752 12.7727 9.49244 13.1798 8.76786 13.9043C8.04329 14.6289 7.63623 15.6116 7.63623 16.6363" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M11.5 9.6818V4.27271" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.48828 10.6245L6.58555 11.7218" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 16.6364H4.54545" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.4546 16.6364H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4146 11.7218L17.5118 10.6245" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 19.7273H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.591 6.59094L11.5001 9.68185L8.40918 6.59094" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
`
};

export const qrCode: IVectorIcon = {
  name: IconNameEnum.qrCode,
  style: 'line',
  path: `
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 19H13V21H11V19ZM19 11H21V13H19V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM4 3H12C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM4.2 4.2V11.8H11.8V4.2H4.2ZM7 7H9V9H7V7ZM16 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V8C21 8.26522 20.8946 8.51957 20.7071 8.70711C20.5196 8.89464 20.2652 9 20 9H16C15.7348 9 15.4804 8.89464 15.2929 8.70711C15.1054 8.51957 15 8.26522 15 8V4C15 3.73478 15.1054 3.48043 15.2929 3.29289C15.4804 3.10536 15.7348 3 16 3ZM16.2 7.8H19.8V4.2H16.2V7.8ZM16 15H20C20.2652 15 20.5196 15.1054 20.7071 15.2929C20.8946 15.4804 21 15.7348 21 16V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H16C15.7348 21 15.4804 20.8946 15.2929 20.7071C15.1054 20.5196 15 20.2652 15 20V16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15ZM16.2 19.8H19.8V16.2H16.2V19.8ZM4 15H8C8.26522 15 8.51957 15.1054 8.70711 15.2929C8.89464 15.4804 9 15.7348 9 16V20C9 20.2652 8.89464 20.5196 8.70711 20.7071C8.51957 20.8946 8.26522 21 8 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V16C3 15.7348 3.10536 15.4804 3.29289 15.2929C3.48043 15.1054 3.73478 15 4 15ZM4.2 19.8H7.8V16.2H4.2V19.8Z" fill="currentColor"/>
`
};
