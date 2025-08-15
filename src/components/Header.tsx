import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  console.log("Header rendered with cart items:", cartItemsCount);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              CojinStore
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Inicio
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Productos
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Sobre Nosotros
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contacto
            </a>
          </nav>

          <Button 
            variant="outline" 
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};