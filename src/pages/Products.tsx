import { memo } from "react";
import { GridList, Heading } from "@components/Common";
import { Product } from "@components/Ecommerce";
import Loading from "@components/feedback";
import type { TProduct } from "@types";
import useProducts from "@hooks/useProducts";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";
import { Container } from "react-bootstrap";

const Products = memo(() => {
  const { loading, productsFullInfo, error, productPrefix } = useProducts();
  const skeletonCount =
    productsFullInfo.length > 0 ? productsFullInfo.length : 4;
  return (
    <>
    <div className="mt-5 bg-all">
      <Container>
         <Heading title={`${productPrefix?.charAt(0).toUpperCase()}${productPrefix?.slice(1)}  Products`} />
      <Loading
        status={loading}
        error={error}
        pendingComponent={<ProductSkeleton max={skeletonCount} />}
      >
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="There are no products"
        />

        
      </Loading>
      </Container>
      
    </div>
     
    </>
  );
});

export default Products;
