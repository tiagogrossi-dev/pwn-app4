curl --request GET \
 --url http://localhost:3000/api/produto/1

curl --request GET \
 --url http://localhost:3000/api/produto

curl --request POST \
 --url http://localhost:3000/api/produto \
 --header 'Content-Type: application/json' \
 --data ' {  
 "descricao": "inserir teste",
"valor": "35",
"marca": "Jojo"
}'

curl --request DELETE \
 --url http://localhost:3000/api/produto/2

curl --request PUT \
 --url http://localhost:3000/api/produto/2 \
 --header 'Content-Type: application/json' \
 --data ' {  
 "descricao": "inserir teste",
"valor": "45",
"marca": "Live"
}'

# METODOS

- GET - buscar
- POST - inserir
- PUT - alterar
- PATCH - alterar um campo especifico
- DELETE - deletar

# PARAMETROS

- Route params - indentificar um recurso
- Query params - paginação, filtro
- Body params - objetos inserção/alterção

https://pwn-tgs-app3.herokuapp.com/api/produto

criar: npx knex migrate:make nome_migration
rodar: npx knex migrate:latest
deletar: npx knex migrate:down

criar: npx knex seed:make 01_users
rodar: npx knex seed:run