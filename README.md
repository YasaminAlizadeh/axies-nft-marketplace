# Axies - NFT Marketplace Website 👾

Axies is a responsive NFT marketplace website built with **vanilla HTML, CSS, and JavaScript**. This project is a front-end implementation of a modern NFT platform design, focusing on dynamic content rendering, client-side filtering and sorting, and interactive UI elements.

![image](https://user-images.githubusercontent.com/68509830/232149454-16b142c9-4785-4066-b7c8-255ddaec7a3b.png)

![image](https://user-images.githubusercontent.com/68509830/232148607-19d2dcfd-633a-48eb-a218-c6704f1a9f01.png)

![image](https://user-images.githubusercontent.com/68509830/232148943-813ff243-487b-40de-8d08-7db3f11dbaea.png)

![image](https://user-images.githubusercontent.com/68509830/232148719-aaa3c21d-348c-4a21-a46d-229eeb055407.png)

## ✨ What is This?

This project is a complete, multi-page website based on a Themeforest template for an NFT marketplace called "Axies." The primary goal was to build a visually appealing and interactive user experience using only core web technologies—no frameworks or libraries like React.

Everything from the animated hero character to the live auction countdowns and dynamic filtering is handled with vanilla JavaScript, manipulating the DOM directly. The site features a home page, a detailed item page, a login page, and a user profile page.

### Core Features

* **👾 Interactive Hero Section:** The landing page features a unique, animated "Monster" character in the headline that reacts on hover.
* **⏳ Live Auction Cards:** NFT cards display a live countdown timer for auctions, dynamically updated every second with JavaScript's `setInterval`.
* **🔼 Client-Side Sorting & Filtering:** The "Today's Picks" section allows users to sort items by date, name, price, and popularity. All sorting logic is handled on the client-side.
* **🖱️ Dynamic Content Loading:** All NFT items, collections, and seller information are generated dynamically from local JavaScript data files (`itemsData.js`, etc.), mimicking how data would be fetched from an API.
* **🌓 Dark/Light Theme Toggle:** A theme switcher that toggles between dark and light modes by adding/removing classes on the `<body>` element. The user's preference is saved to `localStorage`.
* **📱 Fully Responsive Design:** The entire website is responsive, with a mobile-first approach, including a collapsible navigation menu for smaller screens.
* **🎨 CSS Animations:** The site uses pure CSS for various animations, including the hero character's movements, blob backgrounds, and the loading spinner.

---

## 🔧 Tech Stack & Architecture

This project was built from the ground up using fundamental web technologies to demonstrate strong core skills without reliance on modern frameworks.

* **Core Technologies:**
    * **HTML5**
    * **CSS3** (including Flexbox, Grid, Custom Properties/Variables)
    * **Vanilla JavaScript (ES6+)**
* **Icons:** Font Awesome & Ionicons

### Architectural Highlights

1.  **DOM Manipulation via JavaScript Modules**
    The application is broken down into several JavaScript "modules" (`auctions.js`, `collections.js`, `sellers.js`, etc.), each responsible for a specific section of the page. These scripts dynamically generate HTML content from data arrays and inject it into the DOM, creating a modular structure without a formal framework.

2.  **Client-Side Data Management**
    All application data (for NFTs, collections, sellers) is stored in local JavaScript files. Scripts import this data and use it to render content. Functions like `likeFunction` and sorting logic directly manipulate these in-memory arrays to update the UI state.

3.  **Dynamic Countdown Timers**
    Each auction card features a live countdown. This is achieved by iterating through the rendered cards, grabbing their associated data object, and using a unique `setInterval` for each card to decrement its `remaining_time` and update the DOM every second.

4.  **CSS Custom Properties for Theming**
    The dark/light mode toggle is powered by CSS custom properties (variables). The `theme.js` script simply toggles a class on the `<body>` element (`theme--dark` or `theme--light`), and the stylesheet uses these classes to apply a different set of variable values for colors and backgrounds.

---

## 🏃‍♂️ How to Run

Since this is a static website built with vanilla HTML, CSS, and JavaScript, you can run it directly in your browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YasaminAlizadeh/axies-nft-marketplace.git
    ```

2.  **Open `index.html`:**
    * Navigate to the project folder and open the `index.html` file in your web browser.
    * For the best experience (to avoid potential CORS issues with local file paths), it's recommended to use a simple live server. If you have VS Code, the "Live Server" extension is a great option.
