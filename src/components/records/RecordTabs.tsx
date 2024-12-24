import React from 'react';
import { Tab } from '@headlessui/react';

interface RecordTabsProps {
  children: React.ReactNode;
  tabs: string[];
}

export function RecordTabs({ children, tabs }: RecordTabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-indigo-700 shadow'
                : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {React.Children.map(children, (child) => (
          <Tab.Panel>{child}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}