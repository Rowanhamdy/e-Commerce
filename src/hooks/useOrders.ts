import type { TProduct } from "@types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
export const useOrders = () => {

    const dispatch = useAppDispatch();
      const { loading, error, orderList } = useAppSelector(
        (state) =>
          state.orders || {
            loading: false,
            error: null,
            orderList: [],
          }
      );
    
      const [showModal, setShowModal] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
    
      const viewDetailsHandler = (id:number) =>{
        const productDetails = orderList.find((order) => order.id === id);
        const newItems = productDetails?.items ?? [] ;
        // console.log(productDetails);
        setShowModal(true);
        setSelectedProduct(prev => [...prev , ...newItems])
        
      }
    
      const closeModalHandler = () =>{
        setShowModal(false)
        setSelectedProduct([])
      }
      useEffect(() => {
        const promise = dispatch(actGetOrders());
        return () => {
          promise.abort();
          dispatch(resetOrderStatus())
        };
      }, [dispatch]);
  return {closeModalHandler , orderList,viewDetailsHandler , showModal , selectedProduct , loading , error }
}
