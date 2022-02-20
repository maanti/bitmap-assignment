# How to run

Node version that was used: v16.14.0


```shell
npm i

# Consume input stream from stdin
npx ts-node src/main.ts
# or just
npm start

# Consume input stream from file
npx ts-node src/main.ts --file 'input.txt'
```

# How to run tests
```shell
npm test
```

# Implementation details
Algorithm:  
- Create a 2d array filled with NaNs
- Set to '0' elements that correspond to white pixels from bitMap
- Add all the white pixels coordinates to a FIFO queue
- For each element of the queue compute distances to the neighbours and push neighbours to the queue
- When the queue becomes empty - all the pixels are handled
