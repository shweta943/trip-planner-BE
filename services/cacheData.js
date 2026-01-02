import NodeCache from "node-cache";

/**
 * A simple in-memory caching service using NodeCache.
 * Cache items expire after 7 days.
 */
export const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 7 });