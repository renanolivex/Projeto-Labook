# Labecommerce

Trabalho realizado com fins acadêmicos. A proposta do projeto é criar endPoints com intenção de cadastrar usuarios, fazer login, criar posts e modifica-los.
O projeto foi um requisito do curso de desenvolvimento full-stack da Labenu.

# Documentação no Postman
https://documenter.getpostman.com/view/26594293/2s9Y5YSha7

# Súmario

- <a>PATHS</a>
- <a>EXEMPLOS</a>
- <a>TECNOLOGIAS</a>
- <a>DESENVOLVEDOR</a>

# Paths 
Requisições de Posts
- /posts

Requisições de Usuarios
- /users

# Exemplos
## Get all Posts 
- Retorna todos os posts cadastrados e suas informações
``` bash
[
  {
    "id": "ab274192-9a1b-49f4-9043-eb246f1a3f42",
    "content": "Testando post",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2023-08-27T16:18:38.372Z",
    "updatedAt": "2023-08-27T16:30:29.638Z",
    "creator": {
      "id": "3ea3ee49-62e1-446a-8300-ab2dbbc896c5",
      "name": "Renan2"
    }
  },
  {
    "id": "ac75c777-59d6-417b-ba72-99f8059f7b4a",
    "content": "Outro post criado!",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2023-08-27T16:21:55.375Z",
    "updatedAt": "2023-08-27T16:21:55.375Z",
    "creator": {
      "id": "3ea3ee49-62e1-446a-8300-ab2dbbc896c5",
      "name": "Renan2"
    }
  }
]
```
## Login
- Entra na conta cadastrada e retorna um token de
`````` bash
curl --location 'http://localhost:3003/users/login' \
--data-raw '{
    "email": "renan2@hotmail.com",
    "password" : "12345"
}
'
``````
- Resposta
``````bash
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4N2U1OTkyLTU5YmUtNGIyZS04ZGE3LTM0Nzg1YmNjZjU5YSIsIm5hbWUiOiJNZXV0ZXN0ZTAxIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5MzEzODcyMn0.FrOetjTPKeJ7HxOSVkQZyZpQGEzA5AT5C5H_hrhzGX0"
}
``````

## CreatePost
- Cria um Post novo através do token de login. É necessário um token.
``````bash
curl --location 'http://localhost:3003/posts' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlYTNlZTQ5LTYyZTEtNDQ2YS04MzAwLWFiMmRiYmM4OTZjNSIsIm5hbWUiOiJSZW5hbjIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkzMTUzMDYxfQ.j2UJ6zTuk6OgyNbOKHi5yWouOe6PfOr_hi6Tm_lIvS0' \
--data '{"content":"Novo post"}'
``````

- Resposta
``````

Post criado com sucesso

``````


## Edit Post
- Edita posts já cadastrados. Apenas o usuário que o criou consegue edita-lo. É necessário um token.
``````bash
curl --location --request PUT 'http://localhost:3003/posts/ab274192-9a1b-49f4-9043-eb246f1a3f42' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlYTNlZTQ5LTYyZTEtNDQ2YS04MzAwLWFiMmRiYmM4OTZjNSIsIm5hbWUiOiJSZW5hbjIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkzMTUzMjEwfQ.xBu7tDif-v8xu4eQNOaShOA3U1vJxLWAbQOeOLmaTaE' \
--data '{"content":"Testando post"}'
``````
- Resposta
```
Post editado com sucesso!
```
## DeletePost
- Deleta um post criado. Apenas o usuário que o criou e um ADMIN conseguem deleta-lo. É necessário um token.

````bash
curl --location --request DELETE 'http://localhost:3003/posts/bb2dc0d9-733e-4d08-b261-3b8823175ccf' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlYTNlZTQ5LTYyZTEtNDQ2YS04MzAwLWFiMmRiYmM4OTZjNSIsIm5hbWUiOiJSZW5hbjIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkzMTUzNDQxfQ.Py51w1LSlhlLtcCRtiVPAn-04svLiBWBHDjtIRUOOgw'
````

- Resposta
```bash
Post deletado com sucesso!
```

## LIKE
- Adiciona um like ou dislike para um post.

``` bash
curl --location --request PUT 'http://localhost:3003/posts/ab274192-9a1b-49f4-9043-eb246f1a3f42/like' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4N2U1OTkyLTU5YmUtNGIyZS04ZGE3LTM0Nzg1YmNjZjU5YSIsIm5hbWUiOiJNZXV0ZXN0ZTAxIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5MzEzODcyMn0.FrOetjTPKeJ7HxOSVkQZyZpQGEzA5AT5C5H_hrhzGX0' \
--data '{"like": true}'
```

- Resposta
```
Reação alterada com sucesso!
```


# Tecnologias 
Para a criação do projeto foram utilizadas as ferramentas:
- Node.js
- SQLite
- Express
- Knex
- Typescript
- UUID 
- HASH

# Desenvolvedor

![DESENVOLVEDOR](./src/assets/Desenvolvedor.jpg) 
<p>Renan N. de Oliveira



