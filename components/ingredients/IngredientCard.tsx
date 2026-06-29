import React from 'react';
import Link from 'next/link';
import { CartItem, Ingredient } from '@/lib/interfaces';

interface IngredientCardProps {
  ingredient: Ingredient;
  insteadImage: string;
  existingItem: CartItem | undefined
  isCurrentLoading: boolean;
  updatingItem: {
    id: number;
    loading: boolean;
  }; 
  removingFromCart: {
    id: number ;
    loading: boolean;
  }; 
  handleAddToCart: (e: React.MouseEvent, ingredient: any) => void;
  handleIncreaseQuantity: (e: React.MouseEvent, existingItem: any) => void;
  setIsOpen: (open: boolean) => void;
  setItem: (item: any) => void
}

const IngredientCard = ({
  ingredient,
  insteadImage,
  existingItem,
  isCurrentLoading,
  updatingItem,
  removingFromCart,
  handleAddToCart,
  handleIncreaseQuantity,
  setIsOpen,
  setItem,
}: IngredientCardProps) => {
  return (
    <div className="bg-card rounded-[2rem] border border-sky-500/5 shadow-xs hover:shadow-md hover:border-sky-500/10 transition-all duration-300 flex flex-col overflow-hidden group transform hover:-translate-y-1">
      {/* Image Box */}
      <div className="relative h-56 w-full bg-sky-500/[0.01] overflow-hidden border-b border-sky-500/5">
        <img
          src={ingredient.imageUrl || insteadImage}
          alt={ingredient.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = insteadImage;
          }}
        />

        {/* Badges */}
        <div className="absolute inset-x-4 top-4 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md text-foreground/80 font-mono text-xs font-bold shadow-xs border border-sky-500/5">
            #{ingredient.id}
          </span>
          {existingItem && (
            <span className="px-3 py-1.5 rounded-xl bg-sky-500 text-white text-[10px] uppercase font-black tracking-wider shadow-sm flex items-center gap-1 animate-scale-up">
              <span className="w-1 h-1 rounded-full bg-white animate-ping" />
              In Cart
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-6">
        <div>
          <h2 className="font-black text-xl text-foreground/90 group-hover:text-sky-500 transition-colors duration-200 line-clamp-1 tracking-tight">
            {ingredient.name}
          </h2>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">
              Price:
            </span>
            <span className="text-3xl font-black text-foreground/90 tracking-tight font-mono">
              ${ingredient.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quantity Selector Counter Container */}
        <div className="flex gap-3 pt-4 border-t border-sky-500/5 items-center">
          {existingItem ? (
            <div className="flex-[2] flex items-center justify-between bg-sky-500/[0.01] border border-sky-500/10 p-1 rounded-2xl h-[48px] animate-scale-up">
              <button
                disabled={removingFromCart.id === ingredient.id && removingFromCart.loading}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                  setItem(existingItem);
                }}
                className="w-10 h-10 rounded-xl cursor-pointer bg-card disabled:cursor-not-allowed hover:bg-rose-500/5 border border-sky-500/5 text-rose-500 flex items-center justify-center transition-colors shadow-xs active:scale-90"
                title="Remove from Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>

              <span className="font-mono font-black text-sm text-foreground/80 select-none bg-card px-3 py-1 rounded-lg border border-sky-500/5 shadow-xs">
                Qty:{existingItem.quantity}
              </span>

              <button
                disabled={updatingItem.id === ingredient.id && updatingItem.loading}
                onClick={(e) => handleIncreaseQuantity(e, existingItem)}
                className="w-10 h-10 rounded-xl cursor-pointer disabled:cursor-not-allowed text-muted-foreground flex items-center justify-center bg-card hover:bg-sky-500/5 border border-sky-500/5 hover:text-sky-500 transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              disabled={isCurrentLoading}
              onClick={(e) => handleAddToCart(e, ingredient)}
              className="flex-[2] relative overflow-hidden bg-sky-500 hover:bg-sky-600 text-white font-bold h-[48px] px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-sky-500/10 active:scale-[0.98] disabled:scale-100 disabled:bg-sky-500/40 disabled:cursor-not-allowed transition-all duration-200 text-sm cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                {isCurrentLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></circle>
                    <path
                      className="opacity-100"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                )}
                <span className="tracking-wide">
                  {isCurrentLoading ? 'Adding...' : 'Add to Cart'}
                </span>
              </div>
            </button>
          )}

          {/* Allergen Link */}
          <Link
            href={`/alleries?id=${ingredient.id}&name=${ingredient.name}`}
            className="h-[48px] w-[48px] bg-sky-500/[0.01] hover:bg-rose-500/5 text-muted-foreground hover:text-rose-500 border border-sky-500/5 rounded-2xl transition-all duration-200 flex items-center justify-center active:scale-95 flex-shrink-0"
            title="Mark as Allergen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;