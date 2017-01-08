# Indexing firebase data

Indexing the firebase data to elastic search.
  - Set up elasticsearch in the system. Follow [Installation steps](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-14-04).
  - Set the authentication for elasticsearch in elasticsearch.yml file
  - Set the `index.mapper.dynamic: false` for elasticsearch in elasticsearch.yml file since we are providing custom mappings.
  - Start the indexer.

```sh
$ cd webapp-main/search
$ node app.js
```

This command will index all the data from firebase to elastic search:
  - You can now query from elastic search directly at http://localhost:9200

## Starting elastic search api for handling queries

- Start the search API.

```sh
$ cd webapp-main/search/query
$ node elasticSearchApi.js
```


### Query format

   - All the elasticsearch query format is acceptable in a POST method.
   - Wherein GET and OPTIONS method work in a query parameter format.
eg: `http://localhost:5001/v1/pages?fields=group_teaser&limit=12&subtype=page_university,page_institution&offset=0&type=page&query=collegename&location=delhi,bangalore`
