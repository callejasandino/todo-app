import { useToast } from 'vue-toast-notification';

/**
 * Universal toast notification utility
 * @param {string} message - The message to display
 * @param {string} type - The type of toast: success, error, warning, info
 */
export const showToast = (message, type = 'success') => {
  const toast = useToast();
  
  switch (type) {
    case 'success':
      toast.success(message, 
        {
          position: 'top-right',
          duration: 3000,
          theme: 'bootstrap',
          type: 'success'
        }
      );
      break;
    case 'error':
      toast.error(message, 
        {
          position: 'top-right',
          duration: 3000,
          theme: 'bootstrap',
          type: 'error'
        } 
      );
      break;
    case 'warning':
      toast.warning(message, 
        {
          position: 'top-right',
          duration: 3000,
          theme: 'bootstrap',
          type: 'warning'
        }
      );
      break;
    case 'info':
      toast.info(message, 
        {
          position: 'top-right',
          duration: 3000,
          theme: 'bootstrap',
          type: 'info'
        }
      );
      break;
    default:
      toast.default(message, 
        {
          position: 'top-right',
          duration: 3000,
          theme: 'bootstrap',
          type: 'default'
        }
      );
  }
}; 