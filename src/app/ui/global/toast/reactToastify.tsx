import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircleLoader from '../loaders/circle-loader';

export const errorMessageToast = (message: string) => toast.error(message);

export const successMessageToast = (message: string) => toast.success(message);

export const infoMessageToast = (message: string) => toast.info(message);

export const warningMessageToast = (message: string) => toast.warn(message);

export const loadingMessageToast = (message: string) =>
  toast(
    <div className="flex items-center">
      <CircleLoader />
      <p className="px-2">{message}</p>
    </div>,
    {
      hideProgressBar: true,
    }
  );
