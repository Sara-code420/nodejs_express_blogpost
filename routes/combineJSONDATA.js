
const fs = require('fs').promises;
const path = require('path');

const folderPath = './routes/allPosts'; 

// ... existing code ...

const combineJSONDATA = async () => {
    try {
        const fileNames = await fs.readdir(folderPath);
        const posts = [];

        // Iterate through each file in the folder
        for (const fileName of fileNames) {
            const filePath = path.join(folderPath, fileName);

            // Read the content of each file
            const fileContent = await fs.readFile(filePath, 'utf-8');

            // Parse the content as JSON
            const jsonData = JSON.parse(fileContent);

            // Add the data to the posts array
            posts.push(jsonData);
        }

        // Log or use the posts array as needed
        console.log(posts);
        return posts; // Return the posts array
    } catch (error) {
        console.error('Error combining JSON files:', error);
        throw error; // Throw the error to handle it on the client side
    }
};

module.exports = { combineJSONDATA };
// Explicitly export the combineJSONDATA function

