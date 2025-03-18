export enum MessageType {
  /* eslint-disable-next-line */
  CREATE_ANNOTATION = 'CREATE_ANNOTATION',
  GET_ANNOTATIONS = 'GET_ANNOTATIONS',
  DELETE_ANNOTATION = 'DELETE_ANNOTATION',
}

export interface Message {
  type: MessageType;
  annotation?: { [key: string]: unknown };
  elementSelector?: string;
}

export interface MessageResponse {
  success: boolean;
  error?: string;
}
