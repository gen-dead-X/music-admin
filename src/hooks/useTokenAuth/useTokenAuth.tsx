import { errorMessageToast } from '@/app/ui/global/toast/reactToastify';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useTokenAuth() {
  const router = useRouter();

  const redirectToLogin = useCallback(() => {
    const theme = localStorage.getItem('dark');

    console.log(
      '%c Token Not Found! \n Kicking Out Now 🥾',
      'background-color:red;padding-right:0.5rem;font-size:1.2rem;'
    );
    errorMessageToast('Please Login Again!');

    localStorage.clear();
    localStorage.setItem('dark', theme ?? '');
    router.push('/');
  }, []);

  return {
    redirectToLogin,
  };
}
