const { favicons } = require('favicons');
const fs = require('fs');

const source = `
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#FF0000"/>
</svg>`;

// Write the SVG to a temporary file
fs.writeFileSync('temp-icon.svg', source);

const configuration = {
    path: "/",
    appName: null,
    icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        windows: false,
        yandex: false
    }
};

(async () => {
    try {
        const response = await favicons('temp-icon.svg', configuration);
        
        // Save favicon.ico
        response.images.forEach(image => {
            if (image.name === 'favicon.ico') {
                fs.writeFileSync('public/favicon.ico', image.contents);
            }
        });
        
        // Clean up
        fs.unlinkSync('temp-icon.svg');
        
        console.log('Favicon generated successfully!');
    } catch (error) {
        console.error('Error generating favicon:', error);
    }
})();
