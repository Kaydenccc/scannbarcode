'use client';
import React from 'react';

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Dashboard from '@/components/DashboardSis';

function Profile() {
  return <div>profile</div>;
}
function Setting() {
  return <div>Settings</div>;
}

export default function TabsWithIcon() {
  const data = [
    {
      label: 'Dashboard',
      value: 'dashboard',
      icon: Square3Stack3DIcon,
      desc: <Dashboard />,
    },
    {
      label: 'Profile',
      value: 'profile',
      icon: UserCircleIcon,
      desc: <Profile />,
    },
    {
      label: 'Settings',
      value: 'settings',
      icon: Cog6ToothIcon,
      desc: <Setting />,
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Tabs value="dashboard" className="w-full">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </main>
  );
}
