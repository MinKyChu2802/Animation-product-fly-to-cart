/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

type ClickHandler = (event: React.MouseEvent<HTMLDivElement>, image: string) => void;

interface ProductProps {
  name: string,
  price: number | string,
  image: string,
  onAddToCart: (clientX: number, clientY: number, image: string) => void,
}

const Product: FC<ProductProps> = ({ name, price, image, onAddToCart }) => {

  const handleClick: ClickHandler = (event, image) => {
    const coordinates = event.currentTarget.getBoundingClientRect();
    onAddToCart(coordinates?.left, coordinates?.top, image);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto relative">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={(e: any) => handleClick(e, image)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add to cart
        </button>
      </div>

    </div>
  );
}

export default Product