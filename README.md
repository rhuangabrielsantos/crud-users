![crud-users](https://socialify.git.ci/rhuangabrielsantos/crud-users/image?description=1&forks=1&issues=1&language=1&logo=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F13810373%3Fv%3D4&owner=1&pulls=1&stargazers=1&theme=Dark)

## Run project

AdonisJS is a Node.js framework and hence it requires Node.js to be installed on your computer. 
To be precise, we require Node.js >= 14.15.4, along with npm >= 6.0.0.

- Clone repository using

```
git clone https://github.com/rhuangabrielsantos/crud-users.git
```

- Install dependences using:

```
yarn install
```

- Setup .env using:
```
cp .env.example .env
```

- Setup database using

```
node ace migration:run
```

- Run application using:
```
yarn dev
```

## Run tests

This project use [japa](https://github.com/thetutlage/japa) for tests, to run tests use:

```
yarn test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
