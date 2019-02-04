#Simple Api Solution

#Build Instruction:
    Have Docker installed on your machine and run following commands from root of project:
    \$ docker build -t <YOUR DOCKER ID>/simpleapi .
    \$ docker run -p 8088:8088 -d <YOUR DOCKER ID>/simpleapi

    To Stop Application from running:
    \$ docker stop okarimdev/simpleapi

#Notes:
    -Image uses node alpine version for node js runtime
    -If docker is not installed in your machine you can simply run the following from root:
    \$ npm install
    \$ npm run start



#Api Endpoints Analysis:
#Note: All Endpoints take in the same request object as in the instructions.md file
#Data:
    -Data is loaded into memory exactly once and is converted to JSON in the dataReader.js file to
    make it easier to work with.
    -Space Complexity of reading in the data is O(n) as I created a new JSON array to hold all the data in memory.
    -Time Complexity of reading the data was O(n) was each line of the file had to be read in.
#Autocomplete:
    endpoint: http://localhost:8088/api/products/autocomplete
    analysis:
        Time:O(n+m)
            Filterd the autocomple terms by prefix for n terms in data set, remove duplicates of filtered results.
        Space:O(m)
            Created filtered array for m matches for auto complete

#Search:
    endpoint: http://localhost:8088/api/products/search 
    analysis: 
        Time:O(n)
            Had to go through all the terms in the data once.
            Created an object that holds all the search criteria and match each entry for those objects
        Space:O(m)
            created results object to store m search results.
#Keywords:
    endpoint: http://localhost:8088/api/products/keywords
    analysis:
        Looped through each entry in data set to find the title - O(n);
        Looped through each title to find match in to keyword - O(s) *s=length of  title
        Time:O(n*s)
        Space:O(k) *array of length k for k keywords and their frequencies.
    approach:
        -Only a direct match for the word resulted in a hit for the key word.
        -Created a word map of all words and frequencies so further analysis can be done.
        -Returned only the frequencies passed in with request
        -Response object as given in instructions.md has a different format
            -Used String interpolation to format to specification.    

#Feedback:
#Things I would do better:
    -Better Directory Structure
    -Inversion of Control/Dependency Injection using InversifyJS to manage dependencies better
    -GraphQL endpoint for more efficient querying and reducing bandwidth
    -Unit Tests to test core functionality
    -Use a red black tree for the searching and storing of keywords, would be more efficient            