# Recipe Finder 

## Overview
Recipe Finder is an elegant application that helps users discover delicious recipes from around the world. With its warm, earthy color scheme and cursive typography, the app provides a cozy cooking experience while leveraging TheMealDB API to deliver comprehensive recipe information.

## Features
- **Recipe Search**: Find recipes by name or ingredient
- **Dark/Light Mode**: Toggle between color schemes for comfortable viewing
- **Recipe Details**: View complete instructions, ingredients, and YouTube tutorials
- **Responsive Design**: Works on all device sizes
- **Elegant Typography**: Beautiful cursive fonts for headings and titles

## Color Scheme
- Primary: `#7a5f3d` (Rich Brown)
- Secondary: `#5a6d4a` (Sage Green)
- Accent: `#9a7439` (Gold)
- Light: `#f0e6d2` (Warm Ivory)
- Dark: `#222222` (Deep Charcoal)

## Typography
- **Body**: Cormorant Garamond (serif with cursive flair)
- **Headings**: Playfair Display Italic (elegant serif)
- **Recipe Titles**: Alex Brush (true cursive)
- **Buttons/Footer**: Cormorant Garamond Italic

## Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: TheMealDB (no authentication required)
- **Fonts**: Google Fonts (Lora, Playfair Display, Alex Brush, Cormorant Garamond)
- **Icons**: Font Awesome

## Installation
No installation required! Simply open `index.html` in any modern web browser.

## Usage
1. Enter a meal name in the search box or filter by ingredient
2. Click on recipe cards to view detailed instructions
3. Toggle dark/light mode using the theme button
4. Watch YouTube tutorials when available

## Project Structure
```
recipe-finder/
├── index.html        # Main application file
├── styles.css        # All styling
├── index.js          # Application logic
└── README.md         # This documentation
```

## API Documentation
The app uses [TheMealDB API](https://www.themealdb.com/api.php) for:
- Searching recipes by name (`search.php?s={query}`)
- Filtering by ingredient (`filter.php?i={ingredient}`)
- Fetching recipe details (`lookup.php?i={id}`)

## Future Improvements
- Save favorite recipes (localStorage implementation)
- Meal planning functionality
- Print recipe option
- Nutrition information integration

## Credits
- Recipe data provided by [TheMealDB](https://www.themealdb.com/)
- Fonts provided by [Google Fonts](https://fonts.google.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
