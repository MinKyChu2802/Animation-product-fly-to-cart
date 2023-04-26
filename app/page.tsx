/* eslint-disable @next/next/no-img-element */
"use client"
import { FC, useState } from 'react';

interface ProductProps {
  name: string,
  price: number | string,
  image: string,
  onAddToCart: (clientX: number, clientY: number) => void,
}

const Product: FC<ProductProps> = ({ name, price, image, onAddToCart }) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  function handleClick(event: any) {

    const toaDo = event.target.getBoundingClientRect();

    console.log(toaDo)
    setIsAddedToCart(true);
    onAddToCart(toaDo?.left, toaDo?.top);
    setTimeout(() => setIsAddedToCart(false), 1000); // Reset after 1 second
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto relative product-image">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isAddedToCart ? 'Added to cart!' : 'Add to cart'}
        </button>
      </div>
      {isAddedToCart && (
        <img
          className="absolute h-10 w-10"
          src="/images/cart.png"
          alt="Cart"
          style={{

            transform: 'translate(-50%, -50%)',
            animation: 'flyToCart 1s',
          }}
        />
      )}
    </div>
  );
}

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

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(x: number, y: number) {
    setCartCount(cartCount + 1);

    const cart: any = document.querySelector('.cart-icon') || {};
    const productImage = document.createElement("div");

    // Get the coordinates of the product image relative to the viewport
    const productImageRect: any = productImage?.getBoundingClientRect();
    // const productImageX = productImageRect?.left;
    // const productImageY = productImageRect?.top;

    // Create a clone of the product image
    const clonedProductImage: any = productImage?.cloneNode();
    clonedProductImage.style.position = 'absolute';
    // clonedProductImage.style.top = `${x}px`;
    // clonedProductImage.style.left = `${y}px`;
    clonedProductImage.style.width = `100px`;
    clonedProductImage.style.height = "100px";
    clonedProductImage.style.background = "black"

    // Add the cloned product image to the DOM
    document.body.appendChild(clonedProductImage);

    // Animate the cloned product image to the cart
    const animation = clonedProductImage.animate(
      [
        { left: `${x}px`, top: `${y}px`, transform: "scale(1.0)", opacity:0.6 },
        { left: `${cart.offsetLeft-50}px`, top: `${cart.offsetTop}px`, transform: "scale(0.7)", opacity:0 },
      ],
      {
        duration: 1200,
        easing: 'ease',
        fill: 'forwards',
      }
    );

    // Remove the cloned product image from the DOM after the animation is done
    animation.onfinish = () => {
      clonedProductImage.remove();
    };
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
      <Cart itemCount={cartCount} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Product
          name="Product 1"
          price="19.99"
          image="https://via.placeholder.com/350x150"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 2"
          price="24.99"
          image="https://via.placeholder.com/350x150"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 3"
          price="14.99"
          image="https://via.placeholder.com/350x150"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 4"
          price="29.99"
          image="https://via.placeholder.com/350x150"
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
