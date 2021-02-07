# innovify
CRUD ops with nodejs and redis

## Installation
1. Install dependencies in the root folder using command 
```sh
npm install
```
2. Start the local server using command 
```
npm run dev
```

3. Server should start at 
``` 127.0.0.1:3000 ```
Make sure the port is free or else go to config files and change the port variable. Enter above url in browser. The home page should show a welcome message

I created a free redis cloud account. included it here so you can do fast testing instead of running a server in your local

## Usage
1. To get list of users GET ```127.0.0.1:3000/user```
2. To get a particular user GET ```127.0.0.1:3000/user/Id```
3. To add a new user POST ```127.0.0.1:3000/user```
4. To delete a user DELETE ```127.0.0.1:3000/user/Id```
5. To update a user PUT ```127.0.0.1:3000/user/Id```

Check out postman collection.

## Test 
Included few automated test cases in test/test.js using mocha and chai
Please run npm run build first to generate dist folder

```
npm run build
```
This generates dist folder which will contain server.js which will be used to run test cases 

Now run below command to run test cases

```
npm run test
```

