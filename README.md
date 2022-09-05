# Hugo's News API

## Initial instructions
First of all, you must create two .env* files and populate them with the database names. These files should be named as .env.development and .env.test.

For .env.development, you should write PGDATABASE=nc_news. And for .env.test you should write PGDATABASE=nc_news_test. 

Both .env* files should be created in the root of the project in order to have access to the necessary environment variables and successfully connect to the two databases locally. Also, do not forget to add them to the .gitignore file to prevent to push them to GitHub.


