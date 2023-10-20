// MyComponent.js
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './skelton.module.css'; // Import your custom styles

const SkeletonLoading = () => {
  return (
    <div>
      <h2>
        <Skeleton width={200} height={20} />
      </h2>
      <p>
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default SkeletonLoading;
