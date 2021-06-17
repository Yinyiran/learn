const MemoryCache = {
  data: {},
  set(key, value, maxAage) {
    this.data[key] = {
      maxAage: maxAage || 0,
      value,
      now: Date.now(),
    };
  },
  get(key) {
    const cacheItem = this.data[key];
    if (!cacheItem) return null;
    const isExpired = Date.now() - cacheItem.now > cacheItem.maxAage;
    if (isExpired) this.delete(key);
    return isExpired ? null : cacheItem;
  },
  delete(key) {
    return delete this.data[key];
  },
  clear() {
    this.data = {};
  },
};
