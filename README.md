# Adoe

## Important Links
- https://trello.com/b/dmZVAxTM/adoe

# API Reference 

Below are the live server specifications for accessing our "Adoe" internal API. 

### `POST` Register User
`url: https://polar-sands-99108.herokuapp.com/api/users/register`

-input 
```javascript{
 "name": String *Required
 "email": String *Required
 "password": String *Required
 "phoneNumber": String
 "streetAddress": String
 "city": String
 "ustate": String
 "zipCode": String
 "country": String
}
```

-output 
`` javascript
{
"success:true
}
```
