# e-commerce
A full-stack e-commerce platform offering seamless shopping, secure payment processing, and efficient store management.
feat: Implement product review component and associated hooks
🧩 New Components & Features
ReviewItem: Displays individual product reviews.

UI Enhancements:

Avatar

Scroll Area

Tabs for navigation

🪝 Custom Hooks Introduced
useReviews: Manage review data and interactions.

useProducts: Fetch and manage paginated/sorted product data.

useCart: Manage shopping cart state.

useLoading: Track and display loading states.

usePagination: Handle pagination logic.

useProductFilters: Apply and manage product filters.

useUser: Handle user auth and registration.

🛠️ API & State Management
API client now supports:

Error handling

Token-based authenticated requests

Added types for:

API responses

Product

Review

User

🔧 Dev & State Tools
QueryProvider:

Wraps app with React Query provider

Integrated with React Query Devtools for debugging