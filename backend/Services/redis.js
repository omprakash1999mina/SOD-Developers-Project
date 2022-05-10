import Redis from "ioredis"
import { REDIS_URL } from "../config";

const redis = new Redis(REDIS_URL);

const RedisService = {
  get(key) {
    // Or ioredis returns a promise if the last argument isn't a function
    redis.get(key).then((result) => {
      // console.log(result);
      return result; // Prints "value"
    });
    return false;
  },
  set(key, value, ttl) {
    redis.set(key, value, "EX", ttl).then(()=>{
      // console.log(result); 
      return true;
    })
    return false;
  }
}

export default RedisService;
