import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/pages/Index";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isLiked, setIsLiked] = useState(false);

  console.log("ProductCard rendered for:", product.name);

  const handleAddToCart = () => {
    console.log("Adding product to cart:", product.name, "Color:", selectedColor);
    onAddToCart(product, selectedColor);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <Badge className="absolute top-2 left-2 bg-white text-gray-900">
          {product.size}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Selector de colores */}
        <div className="mb-3">
          <p className="text-sm font-medium mb-2">Color:</p>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color 
                    ? 'border-gray-900 scale-110' 
                    : 'border-gray-300'
                } transition-all duration-200`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={`Color ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            €{product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};