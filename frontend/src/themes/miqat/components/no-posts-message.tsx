import React from 'react';
import NoPostsIllustration from './no-posts';

const NoPostsMessage: React.FC<{}> = ({ }) => {

  return (
    <div className="flex flex-col items-center min-h-screen-50 justify-center gap-2">
      <NoPostsIllustration width={400} color='#e5d3a5' />
      <p className="text-center text-3xl text-slate-500">لا توجد عناصر</p>
    </div>
  )
}

export default NoPostsMessage;