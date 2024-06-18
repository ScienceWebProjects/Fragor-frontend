import { NoticeType } from 'antd/es/message/interface';
import React, { ReactNode, useEffect, useState } from 'react';
import { message } from 'antd';

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

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messageText) {
      messageApi.open({
        type: messageType,
        content: messageText,
      });
    }
  }, [messageType, messageText, messageApi]);

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
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
