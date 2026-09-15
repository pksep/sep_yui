export interface IChatMessageSurfaceProps {
  outgoing?: boolean;
  unstyled?: boolean;
}

export interface IChatMessageMetaProps {
  time: string;
  datetime?: string;
  outgoing?: boolean;
  isRead?: boolean;
}

export interface IChatFileDetailsProps {
  name: string;
  size?: string;
  dataTestid?: string;
}
