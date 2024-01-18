import { FaHome, FaChartArea } from 'react-icons/fa';
import { IoAnalytics } from 'react-icons/io5';
import { GoIssueTracks } from 'react-icons/go';
import { MdAddCircleOutline } from 'react-icons/md';

export const sidebarMenu = [
  {
    icon: FaHome,
    link: '/dashboard',
    menu: 'Dashboard',
  },
  {
    icon: MdAddCircleOutline,
    link: '/create',
    menu: 'New',
  },
  {
    icon: IoAnalytics,
    link: '/analytics',
    menu: 'Analytics',
  },
  {
    icon: GoIssueTracks,
    link: '/all-tracks',
    menu: 'All Tracks',
  },
  {
    icon: FaChartArea,
    link: '/conversation',
    menu: 'Chats',
  },
];
