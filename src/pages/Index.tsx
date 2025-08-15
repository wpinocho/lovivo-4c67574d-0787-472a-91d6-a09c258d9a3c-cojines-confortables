import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  colors: string[];
  size: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log("Index component rendered, cart items:", cartItems.length);

  const addToCart = (product: Product, selectedColor: string) => {
    console.log("Adding to cart:", product.name, "Color:", selectedColor);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, selectedColor }];
      }
    });
  };

  const removeFromCart = (id: number, selectedColor: string) => {
    console.log("Removing from cart:", id, "Color:", selectedColor);
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.selectedColor === selectedColor))
    );
  };

  const updateQuantity = (id: number, selectedColor: string, quantity: number) => {
    console.log("Updating quantity:", id, "Color:", selectedColor, "Quantity:", quantity);
    if (quantity <= 0) {
      removeFromCart(id, selectedColor);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cojines de Lujo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de cojines premium para transformar tu hogar
          </p>
        </div>

        <ProductGrid onAddToCart={addToCart} />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;