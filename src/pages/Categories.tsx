
import { Category } from "@components/Ecommerce";
import { GridList, Heading } from "@components/Common";
import  Loading  from "@components/feedback";
import  type { TCategory } from "@types";
import useCategories from "@hooks/useCategories";
import CategorySkeleton from "@components/feedback/skeletons/CategorySkeleton/CategorySkeleton";
import { Container } from "react-bootstrap";
const Categories = () => {
  const {loading ,error ,records} = useCategories()
  return (
    <>
    <div className="bg-all">
      <Container className="mt-5 min-vh-100 ">
      <Heading title='Categories'/>
      <Loading status={loading} error={error} pendingComponent={<CategorySkeleton />}>
        <GridList<TCategory>
          emptyMessage="There are no categories"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
    </div>
    
      
    </>
  );
};

export default Categories;