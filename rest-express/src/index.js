const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('./generated/prisma-client')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(bodyParser.json())

app.post(`/user`, async (req, res) => {
  const result = await prisma.createUser({
    ...req.body,
  })
  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.createPost({
    title: title,
    content: content,
    author: { connect: { email: authorEmail } },
  })
  res.json(result)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.updatePost({
    where: { id },
    data: { published: true },
  })
  res.json(post)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.deletePost({ id })
  res.json(post)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post({ id })
  res.json(post)
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.posts({ where: { published: true } })
  res.json(posts)
})

app.get('/filterPosts', async (req, res) => {
  const { searchString } = req.query
  const draftPosts = await prisma.posts({
    where: {
      OR: [
        {
          title_contains: searchString,
        },
        {
          content_contains: searchString,
        },
      ],
    },
  })
  res.json(draftPosts)
})

//----- Product

app.post(`/product`, async (req, res) => {
  const { price, name, category } = req.body
  const result = await prisma.createProduct({
    price,
    name,
    category,
  })
  res.json(result)
})

app.put('/productUpdate/:id', async (req, res) => {
  const { id } = req.params
  const product = await prisma.updateProduct({
    where: { id },
    data: req.body,
  })
  res.json(product)
})

app.get('/recupAllProduct', async (req, res) => {
  const product = await prisma.products()
  res.json(product)
})

app.get(`/recupProduct/:id`, async (req, res) => {
  const { id } = req.params
  const product = await prisma.product({ id })
  res.json(product)
})

app.delete('/productDelete/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.deleteProduct({ id });
  if (product !== "") {
    res.json({"state": 1})
  } else {
    res.json({"state": 0})
  }
});

app.listen(4000, () =>
  console.log('Server is running on http://localhost:4000'),
)
