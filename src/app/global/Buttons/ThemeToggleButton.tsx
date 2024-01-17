import './_ThemeToggleButton.scss';
import { useEffect, useState } from 'react';
import { LuSunMedium } from 'react-icons/lu';
import { BsFillCloudMoonFill } from 'react-icons/bs';

export default function ThemeToggleButton() {
  function getTheme() {
    const dark = localStorage.getItem('dark');

    if (dark === 'true') {
      document.querySelector('body')?.classList.add('dark');
      return true;
    }

    document.querySelector('body')?.classList.remove('dark');
    return false;
  }

  const [isDark, setIsDark] = useState(getTheme());

  useEffect(() => {
    if (isDark) {
      document.querySelector('body')?.classList.add('dark');
      localStorage.setItem('dark', 'true');
      return;
    }

    document.querySelector('body')?.classList.remove('dark');
    localStorage.setItem('dark', 'false');
  }, [isDark]);

  return (
    <div className='theme-button-container'>
      <button
        onClick={() => setIsDark(!isDark)}
        className='shadow-inner-groove relative h-10 w-16 rounded-3xl border-[3px] bg-gray-100 shadow-gray-200 transition-all duration-200 dark:bg-gray-800 dark:shadow-black'
      >
        <div
          className={
            'absolute top-[5px] h-6 w-6 rounded-full transition-all  ' +
            (!isDark
              ? 'left-[5px] border border-yellow-500 bg-yellow-400 text-black shadow-2xl'
              : 'right-[5px] border bg-gray-700 text-white shadow-2xl')
          }
        >
          {!isDark ? (
            <LuSunMedium className='h-full w-full p-1 ' />
          ) : (
            <BsFillCloudMoonFill className='h-full w-full p-1' />
          )}
        </div>
      </button>
    </div>
  );
}
