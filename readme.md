## IIDX DATA SCRAPER
This is TypeScript code for a web scraper that parses information from the beatmania iidx page of the e-amusement gate. The code exports a User class with methods for fetching and retrieving data, as well as helper functions for parsing the scraped data.
<br/>
<br/>
The parseInfo function retrieves the user's profile information, including their DJ name, IIDX ID, region, class, and radar data for both single and double play. The radar data is parsed using a regular expression to match numbers in the website's HTML.
<br/>
<br/>
The parseAllSp function retrieves the user's scores for all levels of single play and returns an array of musicData objects. The scoreParser function is a helper function that parses the score data for a given level and mode (single or double play).
<br/>
<br/>
The clearTypeStringParser function is a helper function that parses the user's clear type (i.e., whether they have failed the song, cleared it, or achieved a higher level of clearance) based on an icon in the website's HTML.
<br/>
<br/>
The fetchInfo and fetchScoreData methods of the User class call the parseInfo and parseAllSp functions, respectively, and store the retrieved data in private variables. The getInfo and getScoreData methods return the stored data.
<br/>
<br/>
Note that the code uses the cheerio library for parsing HTML and the axios library for making HTTP requests.
