import {
    Bell,
    Bookmark,
    Home,
    Mail,
    Search,
    Settings,
    User,
} from 'lucide-react';

export const mainSidebarMenus = [
    {
        href: '/',
        label: 'Home',
        icon: Home,
    },
    {
        href: '/explore',
        label: 'Explore',
        icon: Search,
    },
    {
        href: '/notifications',
        label: 'Notifications',
        icon: Bell,
    },
    {
        href: '/messages',
        label: 'Messages',
        icon: Mail,
    },
    {
        href: '/bookmarks',
        label: 'Bookmarks',
        icon: Bookmark,
    },
    {
        href: '/profile',
        label: 'Profile',
        icon: User,
    },
    {
        href: '/settings',
        label: 'Settings',
        icon: Settings,
    },
];
