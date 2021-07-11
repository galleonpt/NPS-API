# 🚀 **NPS API**

## 👨‍💻 Description

**NPS** api (Net Promoter Score), with a simple login system, survey registration, NPS calculation and sending email.

## ⚙ Main techs

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
- [Nodemailer](https://nodemailer.com/about/)

**Other dependencies were used**, but these are the main ones.

## 🤝 Contributing

Contributions are always welcome!

If you want to contribute you **must**:

- Clone the project
- Create a branch and code what you want
- Commit your modification
- Push it
- Create a pull request.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
On `.env.sample` you have all environment variables used so you must fill all of them.

### Atention

- If you don't fill `PORT`, by default it is 3333.
- You have to configure your database connection. On `.ormconfig.sample.json` you have an example of how to configure. All fields that are empty must be filled. When you have it conclude rename the file to `ormconfig.json`

## 🏃 Run Locally

- Clone the project

```bash
  git clone https://github.com/galleonpt/NLW-Valoriza.git <folder_name>
```

- Go to the project directory

```bash
  cd <folder_name>
```

- Install dependencies

```bash
  yarn
```

- Start the server

```bash
  yarn start
```
