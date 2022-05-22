- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
const one = new Promise((resolve, reject) => {
  setTimeout(() => resolve(Math.random() * 10), 1000);
});
const two = new Promise((resolve, reject) => {
  setTimeout(() => resolve(Math.random() * 10), 2000);
});
const three = new Promise((resolve, reject) => {
  setTimeout(() => resolve(Math.random() * 10), 3000);
});
const four = new Promise((resolve, reject) => {
  setTimeout(() => resolve(Math.random() * 10), 4000);
});
Promise.all([one, two, three, four]).then((value) => console.log(value));
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
let users = ["getify", "gaearon", "piranha", "AArnott", "sophiebits"];
Promise.all(
  users.map((user) =>
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((value) => {
        let obj = {};
        obj[value.login] = value.followers;
        return obj;
      })
  )
).then((value) => console.log(value));
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
const urls = ["https://random.dog/woof.json", "https://aws.random.cat/meow"];
Promise.race(urls.map((url) => fetch(url).then((res) => res.json()))).then(
  (value) => console.log(value)
);
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);
Promise.allSettled([one, two, three]).then((value) => console.log(value));
Promise.all([one, two, three]).then((value) => console.log(value));
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Arya"), 1000);
  }),
  "Sam",
  { name: "John" },
]).then(console.log);
// output
// ['Aray', 'Sam', 'John']
```
