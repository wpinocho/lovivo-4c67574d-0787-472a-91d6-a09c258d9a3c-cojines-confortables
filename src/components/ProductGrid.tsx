import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/pages/Index";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  onAddToCart: (product: Product, selectedColor: string) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cojín Velvet Luxury",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Cojín de terciopelo premium con relleno de plumas naturales",
    category: "luxury",
    colors: ["#8B4513", "#2F4F4F", "#800080", "#008B8B"],
    size: "45x45 cm"
  },
  {
    id: 2,
    name: "Cojín Boho Chic",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Diseño bohemio con bordados artesanales y flecos",
    category: "boho",
    colors: ["#DEB887", "#CD853F", "#F4A460", "#D2691E"],
    size: "40x40 cm"
  },
  {
    id: 3,
    name: "Cojín Minimalista",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    description: "Diseño limpio y moderno para espacios contemporáneos",
    category: "modern",
    colors: ["#F5F5F5", "#D3D3D3", "#696969", "#000000"],
    size: "50x50 cm"
  },
  {
    id: 4,
    name: "Cojín Tropical",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop",
    description: "Estampado tropical vibrante, perfecto para verano",
    category: "tropical",
    colors: ["#228B22", "#FF6347", "#FFD700", "#FF69B4"],
    size: "45x45 cm"
  },
  {
    id: 5,
    name: "Cojín Geométrico",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Patrones geométricos modernos en colores neutros",
    category: "geometric",
    colors: ["#708090", "#2F4F4F", "#B0C4DE", "#4682B4"],
    size: "40x60 cm"
  },
  {
    id: 6,
    name: "Cojín Vintage",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Estilo vintage con texturas envejecidas",
    category: "vintage",
    colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887"],
    size: "45x45 cm"
  }
];

export const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  console.log("ProductGrid rendered with category:", selectedCategory);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "luxury", name: "Lujo" },
    { id: "boho", name: "Bohemio" },
    { id: "modern", name: "Moderno" },
    { id: "tropical", name: "Tropical" },
    { id: "geometric", name: "Geométrico" },
    { id: "vintage", name: "Vintage" }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      {/* Filtros de categoría */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron productos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
};