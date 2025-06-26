import { GridList, Heading } from "@components/Common";
import { Product } from "@components/Ecommerce";
import Loading from "@components/feedback";
import type { TProduct } from "@types";
import useWishlist from "@hooks/useWishlist";
import WishlistSkeleton from "@components/feedback/skeletons/WishlistSkeleton/WishlistSkeleton";
import { Container } from "react-bootstrap";

const Wishlist = () => {
  const { records, loading, error } = useWishlist();
  const skeletonCount = records.length > 0 ? records.length : 4;

  return (
    <>
    <div className="bg-all ">
      <Container className="mt-5 pe-5 mb-5">
      <Heading title="Your Wishlist" />
      <Loading
        status={loading}
        error={error}
        pendingComponent={<WishlistSkeleton max={skeletonCount} />}
      >
        <GridList<TProduct>
          
          emptyMessage="Your wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
    </div>
    
      
    </>
  );
};

export default Wishlist;
