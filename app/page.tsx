/* eslint-disable @next/next/no-img-element */
"use client"
import Cart from '@/components/Cart';
import Product from '@/components/Product';
import { useState } from 'react';


export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(x: number, y: number, image: string) {
    setCartCount(cartCount + 1);

    const cart: any = document.querySelector('.cart-icon') || {};
    const productImage = document.createElement("div");

    // Create a clone of the product image
    const clonedProductImage: any = productImage?.cloneNode();
    clonedProductImage.style.position = 'absolute';
    clonedProductImage.style.width = `100px`;
    clonedProductImage.style.height = "100px";
    clonedProductImage.style.backgroundImage = `url(${image})`

    // Add the cloned product image to the DOM
    document.body.appendChild(clonedProductImage);

    // Animate the cloned product image to the cart
    const animation = clonedProductImage.animate(
      [
        { left: `${x}px`, top: `${y}px`, transform: "scale(1.0)", opacity: 0.6 },
        { left: `${cart.offsetLeft + 120}px`, top: `${cart.offsetTop}px`, transform: "scale(0.7)", opacity: 0 },
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
    <div className="container mx-auto p-4 relative">
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
