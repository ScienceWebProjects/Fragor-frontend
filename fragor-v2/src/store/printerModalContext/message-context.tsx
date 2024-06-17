import { NoticeType } from 'antd/es/message/interface';
import React, { ReactNode, useState } from 'react';

const MessageContext = React.createContext<{
  messageType: NoticeType;
  messageText: string;
  onMessage: (messageType: NoticeType, messageText: string) => void;
}>({
  messageType: 'info',
  messageText: '',
  onMessage: (message: string) => {},
});

export const MessageContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageType, setMessageType] = useState<NoticeType>('info');
  const [messageText, setMessageText] = useState<string>('');

  return (
    <MessageContext.Provider
      value={{
        messageType: messageType,
        messageText: messageText,
        onMessage: (type, text) => {
          setMessageType(type);
          setMessageText(text);
        },
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
