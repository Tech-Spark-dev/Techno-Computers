import React, { lazy, Suspense } from 'react';

const Products = lazy(() => import('./Products'));

function LazyProducts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}

export default LazyProducts;
