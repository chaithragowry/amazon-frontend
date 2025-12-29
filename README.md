## Amazon Clone - Frontend

React-based e-commerce application with shopping functionality.


# Features

* Authentication

- Email/Password sign-up and sign-in

- Google OAuth sign-in (Firebase)

- Two-step sign-in flow (email → password)

- Form validation with real-time feedback

- JWT token-based sessions



* Product Browsing

- Hero carousel with auto-slide

- Category cards

- Horizontal scrolling product sections

- Product detail pages with reviews

- Category pages with functional filters (price, rating, discount)

- Related products recommendations



* Shopping Cart

- Global cart state (Context API)

- Add/remove items

- Update quantities

- Real-time cart count in navbar

- Product recommendations in cart


* Checkout & Orders

- Shipping address management

- Payment method selection (Tabby, COD)

- Order confirmation page

- "Buy Again" functionality


* UI Components

- Responsive navbar with account menu

- Side navigation menu

- Personalized recommendations section

- Footer with links

- Loading states and error handling


# Tech Stack

* React 19 with Vite

* React Router v7 for navigation

* Tailwind CSS for styling

* Firebase for Google OAuth

* Axios for API calls

* Context API for state management

* React Icons for icons



# Prerequisites

* Node.js (v14+)

* Backend API running (see backend README)

* Firebase project for Google sign-in


# Installation

1. Navigate to client folder

- cd client
- npm install

2. Configure Firebase

- Update src/firebase.js with YOUR Firebase credentials:


const firebaseConfig = {
     apiKey: "your_api_key",
     authDomain: "your_project.firebaseapp.com",
     projectId: "your_project_id",
     // ... rest of config
   };


3. Start development server

- npm run dev

-  App runs at http://localhost:5173



# Project Structure


client/src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx           # Main navigation
│   │   ├── AccountMenu.jsx      # Account & Lists dropdown
│   │   └── AllSideMenu.jsx      # Side navigation
│   ├── HeroCarousel.jsx         # Homepage carousel
│   ├── CategoryCard.jsx         # 4-image category cards
│   ├── ProductCard.jsx          # Product display card
│   ├── RelatedProductCard.jsx   # Horizontal scroll card
│   ├── PersonalizedRecommendations.jsx
│   └── Footer.jsx
├── pages/
│   ├── SignIn.jsx               # Login page
│   ├── SignUp.jsx               # Registration page
│   ├── Home.jsx                 # Homepage
│   ├── CategoryPage.jsx         # Category with filters
│   ├── ProductDetail.jsx        # Product details
│   ├── Cart.jsx                 # Shopping cart
│   ├── Checkout.jsx             # Checkout flow
│   ├── OrderConfirmation.jsx    # Order success
│   └── Orders.jsx               # Order history
├── contexts/
│   └── CartContext.jsx          # Global cart state
├── firebase.js                  # Firebase config
├── App.jsx                      # Main app with routes
└── main.jsx                     # Entry point



# Key Features Explained


* Cart Context

Global state management for shopping cart with:

- ADD_ITEM - Add or increase quantity

- REMOVE_ITEM - Delete from cart

- UPDATE_QUANTITY - Change item quantity

- CLEAR_CART - Empty entire cart


Cart syncs to localStorage automatically.


* Authentication Flow

1. User enters email on Sign In page

2. Email validation → Continue button

3. Password screen with "Change email" option

4. Google sign-in available on both steps

5. JWT token stored in localStorage

6. Protected routes check authentication



* Search Functionality

- Search bar in navbar with category filter

- Searches product names and descriptions

- Results shown on category page with query highlighted

- Search preserves category context



* Filter System (Category Page)


- Price ranges:** Under ₹1000, ₹1000-5000, ₹5000-10000, ₹10000-20000, All

- Rating filters:** 4★ & up, 3★ & up, 2★ & up All ratings

- Discount filters:** (10%, 25%, 50% off or more, All)

- Real-time filtering without reload


* Responsive Design


# Available Scripts

- npm run dev      # Start development server


# Deployment

* Vercel (Recommended)

- Push code to GitHub

- Import project in Vercel

- Add Firebase environment variables

- Deploy automatically


# Environment Setup

Update API URL in components from:

http://localhost:5000/api/...

To: 

http://localhost:5000/api/...



# Testing Checklist

- Sign up with email

- Sign in with email

- Google sign-in

- Browse products

- Use category filters

- View product details

- Add to cart

- Update cart quantities

- Remove from cart

- Checkout flow

- Place order

- View order history

- Logout