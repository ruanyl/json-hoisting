## Format deep nested json data

#### Input deep nested json data
```
  data = {
    user: {
      name: 'user1',
      properties: {
        age: 10,
        relations: [
          {
            type: 'father',
            properties: {
              name: 'user2',
              properties: {
                age: 30
              }
            }
          }, {
            type: 'mother',
            properties: {
              name: 'user3',
              properties: {
                age: 32
              }
            }
          }
        ]
      }
    }
  }
```

### Define the template
```
  const schema = {
    name: 'user.name',
    age: 'user.properties.age',
    parents: ['user.properties.relations', {
      name: 'properties.name',
      age: 'properties.properties.age'
    }]
  }
```

#### Get the expected result
```
  const expected = {
    name: 'user1',
    age: 10,
    parents: [
      {name: 'user2', age: 30},
      {name: 'user3', age: 32}
    ]
  }
  expect(jsonHoisting(data, schema)).toEqual(expected)
```
