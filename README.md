# Blossom Clean

This website code is for cleaning business. It is built using static site generator - Gatsby.js 

[Live Demo](https://blossomclean.com.au/)

<br />
<br />

## Input Form Validation

### We have taken care of input form validation in this application, below are the validation rules.

1. Required
2. Max Length
3. Email
4. Phone

> Validation rules has been defined inside constant file :- config/validations.js

### How to Use

- We have implemented a custom hook for form validation **useForm**
- **useForm** export validation errors, set data, onChange handler and submit handler
- You need to import **useForm** inside FormCompoent and use error, data and handler to implement validation in any other form
- We have used [npm validator](https://www.npmjs.com/package/validator) for validations

<br />
<br />

## Google ReCaptcha V3

- First thing to use Google ReCaptcha, your domain need to be register on [Google Recaptcha site](https://developers.google.com/recaptcha/docs/v3)
- After registration, you will get Public Site Key and Secret Key, these key will be used in configuration of Recaptcha.
- After that you can follow this [Link](https://alphonso-javier.medium.com/how-to-use-recaptcha-v3-with-gatsbyjs-and-express-2e963575db60) for configuration at client and server side.

### we have added Google recaptcha on form submission to protects our site from spam and Bots

### Google places API on address field
https://openbase.com/js/react-google-autocomplete

## Theme features

- Multi-page theme (not just a blog) that uses Markdown for multiple content-types/templates. It uses `gatsby-transformer-remark` and has several examples of querying and filtering `allMarkdownRemark`
- Includes a graphql query in `gatsby-node.js` that creates pages and templates by content type based on the folder `src/pages/services`, `src/pages/join`,
- Services (Markdown)
- Join (Markdown)
- Testimonials (Markdown)
- Features (Data)
- SCSS using `gatsby-plugin-sass`
- Responsive design
- Bootstrap 4 grid and media queries only
- Responsive menu
- Robust example content included
- Royalty free illustrations included
- SEO Titles & Meta using `gatsby-plugin-react-helmet`
- ESLint (google config)
- Prettier code styling

## Deployment

Gatsby and Node SCSS requires node v10 or higher

```
npm install
```

```
npm run start
```

OR if you have Gatsby installed globally you can run:

```
gatsby develop
```
