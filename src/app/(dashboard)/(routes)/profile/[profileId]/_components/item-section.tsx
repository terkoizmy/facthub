"use client";

import { useState } from 'react';
import BarItem from './bar-item';
import UpvotedContent from './upvoted-content';
import RepliesContent from './activity-content';
import PostContent from './posts-content';
import BookmarkContent from './bookmark-content';
import { api } from '@/../convex/_generated/api';
import { Doc } from '@/../convex/_generated/dataModel';

const tabs = [
  { name: 'Posts'},
  { name: 'Activity' },
  { name: 'Bookmark'},
];

interface ItemSectionProps {
  userId: string,
}


export default function ItemSection({ userId } : ItemSectionProps) {
  const [activeTab, setActiveTab] = useState("Posts");

  const onClick = (name: string) => {
    setActiveTab(name)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Posts":
        return <PostContent userId={userId} />;
      case "Activity":
        return <RepliesContent/>;
      case "Bookmark":
        return <BookmarkContent/>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col w-full">
      <div className='flex justify-evenly flex-row border-b-2'>
        {tabs.map((route, index)=>(
          <div key={index} className='flex my-1'>
            <BarItem name={route.name} isActive={activeTab} onClick={onClick} />
          </div>
        )) }
      </div>
      <div className="p-4">
          {renderContent()}
        </div>
    </div>
  )
}
