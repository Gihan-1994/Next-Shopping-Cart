# Next.js Shopping Cart

# Explanation

A simple shopping cart application built with Next.js, Zustand for state management, and Tailwind CSS for styling. This project demonstrates how to manage a shopping cart, add/remove items, and calculate totals dynamically.

## Features

- **Product Listing**: Display a grid of products with details like name, price, and description.
- **Add to Cart**: Add products to the cart with a single click.
- **Cart Management**: View, update, and remove items from the cart.
- **Search Functionality**: Search for products by name using Fuse.js.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **State Management**: Zustand is used to manage the cart state globally.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Zustand**: A lightweight state management library for React.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs.
- **Fuse.js**: A lightweight fuzzy-search library for searching products.
- **TypeScript**: Adds static typing to JavaScript for better developer experience.

## Project Structure

├── [README.md](http://README.md)

├── eslint.config.mjs

├── next-env.d.ts

├── next.config.ts

├── package-lock.json

├── package.json

├── postcss.config.mjs

├─

├── src

│   ├── app

│   │   ├── cart

│   │   │   └── page.tsx

│   │   ├── favicon.ico

│   │   ├── globals.css

│   │   ├── layout.tsx

│   │   └── page.tsx

│   ├── components

│   │   ├── CartIcon.tsx

│   │   ├── CartItem.tsx

│   │   ├── Header.tsx

│   │   ├── ProductCard.tsx

│   │   ├── ProductGrid.tsx

│   │   └── SearchItem.tsx

│   ├── data

│   │   └── products.ts

│   ├── store

│   │   └── cartStore.ts

│   └── types

│       └── index.ts

└── tsconfig.json

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
    
    ```bash
    git clone <https://github.com/your-username/next-shopping-cart.git>
    cd next-shopping-cart
    ```
    
2. **Install dependencies**:

```bash
npm install
or
yarn install
```

1. **Run the development server**

```bash
npm run dev
or
yarn dev

```

1. **Open your browser**:

Visit `http://localhost:3000` to view the application.

# **Key Components**

## `src/app`

### `layout.tsx`

- **Purpose**: Defines the root layout of the application.
- **Functionality**:
    - Sets up the HTML structure and applies global styles.
    - Includes the `Header` component, which is displayed on all pages.
    - Uses the `Geist` and `Geist_Mono` fonts for typography.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiasing`}>
        <Header />
        {children}
      </body>
    </html>);
}
```

---

## `page.tsx`

- **Purpose**: The home page of the application.
- **Functionality**:
    - Displays a grid of products using the `ProductGrid` component.
    - Applies a gradient background and centers the content.

```tsx
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-10 sm:p-10 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-blue-300 to-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ProductGrid products={products} />
      </main>
    </div>);
}
```

---

## `cart/page.tsx`

- **Purpose**: The cart page where users can view and manage their cart items.
- **Functionality**:
    - Displays all items in the cart using the `CartItem` component.
    - Shows the total number of items and the total amount.
    - Provides buttons to clear the cart or proceed to checkout (not implemented).

```tsx
export default function CartPage() {
  const { clearCart, items, totalAmount, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-blue-300 to-white">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Link href="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Continue Shopping
        </Link>
      </div>);
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 to-white">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-b from-black to-blue-600 text-transparent bg-clip-text">
        Check Your Cart
      </h1>
      {/* Cart items and summary */}
    </div>);
}
```

---

## `src/components`

### `CartIcon.tsx`

- **Purpose**: Displays a cart icon with a badge showing the number of items in the cart.
- **Functionality**:
    - Links to the cart page.
    - Dynamically updates the badge count using the `totalItems` function from the cart store.

```tsx
const CartIcon: React.FC = () => {
  const { totalItems } = useCartStore();
  return (
    <Link href="/cart" className="relative">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* SVG path */}
        </svg>
        {totalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xl rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems()}
          </span>)}
      </div>
    </Link>);
};
```

---

### `CartItem.tsx`

- **Purpose**: Displays an individual cart item with controls to update quantity or remove the item.
- **Functionality**:
    - Shows the product image, name, price, and total cost for the item.
    - Provides buttons to increase, decrease, or remove the item from the cart.

```tsx
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const itemTotal = item.quantity * item.product.price;

  return (
    <div className="flex items-center py-4 border-b">
      {/* Product image and details */}
      <div className="w-20 h-20 relative flex-shrink-0">
        <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'cover' }} className="rounded" />
      </div>
      {/* Quantity controls and remove button */}
    </div>);
};
```

---

### `Header.tsx`

- **Purpose**: Displays the header with navigation links and the cart icon.
- **Functionality**:
    - Includes a link to the home page and a CartIcon.

```tsx
const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-b from-black to-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Next Shop
        </Link>
        <nav className="flex items-center space-x-8">
          <Link href="/" className="hover:text-blue-500">
            Products
          </Link>
          <CartIcon />
        </nav>
      </div>
    </header>);
};
```

---

### `ProductCard.tsx`

- **Purpose**: Displays a product card with details and an "Add to Cart" button.
- **Functionality**:
    - Shows the product image, name, price, and description.
    - Allows users to add the product to the cart.

```tsx
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const isAdded = useCartStore((state) => state.isAddedToCart(product.id));

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="relative h-58 w-100vw h-100vh">
        <Image src={product.image} alt={product.name} fill priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product)} className={`mt-4 w-full text-white py-2 rounded transition ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {`${isAdded ? 'Added to cart ✔' : 'Add to cart'}`}
        </button>
      </div>
    </div>);
};
```

---

### `ProductGrid.tsx`

- **Purpose**: Displays a grid of products using the `ProductCard` component.
- **Functionality**:
    - Renders a search bar and a grid of products.

```tsx
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div>
      <SearchItem productProps={products} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />))}
      </div>
    </div>);
};
```

---

### `SearchItem.tsx`

- **Purpose**: Provides a search bar to filter products by name.
- **Functionality**:
    - Uses Fuse.js for fuzzy search functionality.
    - Displays search results dynamically

```tsx
const SearchItem: React.FC<SearchItemProps> = ({ productProps }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);

  const fuse = useMemo(() => new Fuse(productProps, { keys: ["name"], threshold: 0.3 }), [productProps]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const handler = setTimeout(() => {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, fuse]);

  return (
    <div className="w-[300px] mx-auto my-5 text-center relative">
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-900 bg-amber-100" />
      {/* Display search results */}
    </div>);
};
```

---

## `src/data`

### `products.ts`

- **Purpose**: Contains mock data for products.
- **Functionality**:
    - Exports an array of product objects with details like `id`, `name`, `price`, `image`, and `description`

```tsx
export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  // More products...
];
```

---

## `src/store`

### `cartStore.ts`

- **Purpose**: Manages the state of the shopping cart using Zustand.
- **Functionality**:
    - Provides functions to add, remove, and update items in the cart.
    - Calculates the total number of items and the total amount.

```tsx
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isAddedToCart: (productId: number) => {
    const existingItem = get().items.find(item => item.product.id === productId);
    return existingItem !== undefined || false;
  },
  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  totalAmount: () => get().items.reduce((total, item) => total + item.quantity * item.product.price, 0),
  addToCart: (product: Product) => set((state) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    if (existingItem) {
      return { items: state.items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    } else {
      return { items: [...state.items, { product, quantity: 1 }] };
    }
  }),
  // Other actions...
}));
```

---

## `src/types`

### `index.ts`

- **Purpose**: Defines TypeScript interfaces for `Product` and `CartItem`.
- **Functionality**:
    - Ensures type safety across the application.

```tsx
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
```

# Configuration Files

## `next.config.ts`

- **Purpose**: Configures Next.js-specific settings for the application.
- **Functionality**:
    - Defines custom configurations for the Next.js project.
    - In this project, it configures the `images` domain to allow loading images from external sources like `media.wired.com`, `images.unsplash.com`, and `media.istockphoto.com`.
    
    ```tsx
    import type { NextConfig } from "next";
    
    const nextConfig: NextConfig = {
      images: {
        domains: ['media.wired.com', 'images.unsplash.com', 'media.istockphoto.com'],
      },
    };
    
    export default nextConfig;
    ```
    
- **Key Settings**:
    - `images.domains`: Specifies the domains from which images can be loaded. This is necessary for using the `next/image` component with external images.
    
    ## `package.json`
    
    - **Purpose**: Manages project dependencies, scripts, and metadata.
    - **Functionality**:
        - Lists all dependencies and devDependencies required for the project.
        - Defines scripts for running, building, and linting the application.
    
    ```tsx
    {
      "name": "shopping-cart",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "next dev --turbopack",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      },
      "dependencies": {
        "fuse.js": "^7.1.0",
        "next": "15.2.3",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "zustand": "^5.0.3"
      },
      "devDependencies": {
        "@eslint/eslintrc": "^3",
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "eslint": "^9",
        "eslint-config-next": "15.2.3",
        "tailwindcss": "^4",
        "typescript": "^5"
      }
    }
    ```
    
    - **Key Sections**:
        - **`scripts`**:
            - `dev`: Starts the development server using Turbopack for faster builds.
            - `build`: Builds the project for production.
            - `start`: Starts the production server.
            - `lint`: Runs ESLint to check for code issues.
        - **`dependencies`**:
            - Core libraries like `next`, `react`, `react-dom`, and `zustand`.
            - `fuse.js` for fuzzy search functionality.
        - **`devDependencies`**:
            - Development tools like `eslint`, `tailwindcss`, and `typescript`.
            - TypeScript type definitions for `node`, `react`, and `react-dom`.
    
    ---
    
    ## `tsconfig.json`
    
    - **Purpose**: Configures TypeScript settings for the project.
    - **Functionality**:
        - Defines compiler options and file inclusion/exclusion rules.
        - Ensures type safety and modern JavaScript features.
    
    ```tsx
    {
      "compilerOptions": {
        "target": "ES2017",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
          {
            "name": "next"
          }
        ],
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```
    
    - **Key Settings**:
        - **`compilerOptions`**:
            - `target`: Specifies the ECMAScript target version (`ES2017`).
            - `lib`: Includes DOM and ESNext libraries for browser and modern JavaScript features.
            - `strict`: Enables strict type-checking options.
            - `module`: Uses ES modules for better tree-shaking and modern JavaScript features.
            - `paths`: Maps the `@/*` alias to the `src/*` directory for easier imports.
        - **`include`**:
            - Specifies the files and directories to include in the TypeScript compilation.
        - **`exclude`**:
            - Excludes the `node_modules` directory from TypeScript compilation.

# Customization

- **Add More Products**: Modify the `src/data/products.ts` file to add or remove products.
- **Change Styling**: Update the Tailwind CSS classes in the components to customize the UI.
- **Extend Functionality**: Add new features like user authentication, payment integration, or product categories.

# Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.

# Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

# License

This project is open-source and available under the [MIT License](https://license/).

---

**Happy Shopping!** 🛒

# **Deployment**

This project is deployed on **Vercel** and is publicly accessible. You can visit the live site using the following URL:

🔗 [https://next-shopping-cart-9ilobvcz1-prabuddha-ngs-projects.vercel.app](https://next-shopping-cart-9ilobvcz1-prabuddha-ngs-projects.vercel.app/)

---

Feel free to adjust the wording as needed! Let me know if you'd like to add more details. 😊
