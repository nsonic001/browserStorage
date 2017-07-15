## browserStorage
Module to store data in localStorage with expiry

# SET API
key : key of the bucket to store, mandatory
value : value for that key, mandatory
expiry_days : not mandatory, if don't want to set expiry, default is 1 day.

browserStorage.set(key, value, expiry_days) 

# GET API
key : key of the bucket

browserStorage.get(key)



