export const saveCartToLocalStorage = (items: { [key: string]: number }) => {
  localStorage.setItem("cart_items", JSON.stringify(items));
};

export const loadCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart_items");
  return data ? JSON.parse(data) : {};
};


