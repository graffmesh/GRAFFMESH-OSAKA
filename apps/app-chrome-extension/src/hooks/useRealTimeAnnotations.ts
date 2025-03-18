import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useRealTimeAnnotations = () => {
  const socket = io(process.env.SOCKET_SERVER_URL || '');

  useEffect(() => {
    socket.on('update-annotations', (data) => {
      console.log('Annotations updated:', data);
      // ローカル状態を更新
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket };
};

export default useRealTimeAnnotations;
