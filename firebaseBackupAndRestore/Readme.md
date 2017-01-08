# Backing up the firebase data for events

Taking backup of the firebase data to elastic search. Run the `backup` script.

```sh
$ cd webapp-main/backupAndRestore
$ node backup.js
```

This command will copy all the "/events" data from firebase to elastic search.

## Restoring the backup from elasticsearch to firebase

- Run the `restore` script.

```sh
$ cd webapp-main/backupAndRestore/restore
$ node restore.js
```
This command will restore the backup data from elastic search to firebase "/events" path.
