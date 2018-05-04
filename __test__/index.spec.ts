import {jsonHoisting} from '../src'

describe('jsonHoisting', () => {
  let data;
  beforeEach(() => {
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
  });

  it('should return the expected json structure', () => {
    const schema = {
      name: 'user.name',
      age: 'user.properties.age',
      parents: ['user.properties.relations', {
        name: 'properties.name',
        age: 'properties.properties.age'
      }]
    }
    const expected = {
      name: 'user1',
      age: 10,
      parents: [
        {name: 'user2', age: 30},
        {name: 'user3', age: 32}
      ]
    }
    expect(jsonHoisting(data, schema)).toEqual(expected)
  });
});
