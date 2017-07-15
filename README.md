# browserStorage

A Module to store data in localStorage with expiry

# GET API
browserStorage.get(key)
  - key: key of the bucket, you set while storing

# SET API
browserStorage.set(key, value, expiry_days) 
   - key: key of the bucket to store, mandatory
   - value: value to store correspond to that key, mandatory
   - expiry_days: not mandatory, if don't want to set expiry, default is 1 day.
