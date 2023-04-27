import { FC } from "react";


interface CartProps {
  itemCount: number
}

const Cart: FC<CartProps> = ({ itemCount }) => {
  return (
    <div
      className={`bg-green-500 text-white px-4 py-2 absolute right-0 top-0 mt-2 mr-2 rounded-full cart-icon `}
    >
      {itemCount}
    </div>
  );
}

export default Cart