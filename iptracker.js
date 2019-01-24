class IpInstance {
  constructor(timestamp, prev = null, next = null) {
    this.address = address;
    this.timestamp = timestamp;
    this.prev = prev;
    this.next = next;
  }
}

class IpBucketlist {
  constructor(address, date, maxLength, timespan, parent = null, length = 0, leftChild = null, rightChild = null, root = null, tail = null) {
    this.address = address;
    this.date = date;
    this.maxLength = maxLength;
    this.timespan = timespan;
    this.parent = parent;
    this.length = length;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.root = root;
    this.tail = tail;
  }

  removeOldRoot(time) {
    let instance = this.root;
    if (this.root && instance.timestamp < time) {
      this.root = this.root.next;
      this.length --;
      if (this.root !== null) {
        this.root.prev = null
      } else {
        this.tail = null;
      }
      return removeOldRoot(time);
    } else {
      return this.length
    }
  }
}

class IpTracker {
  constructor(maxDepth, maxRequests, timespan, root = null) {
    this.maxDepth = maxDepth;
    this.root = root;
    this.maxRequests = maxRequests;
    this.timespan = timespan;
  }
}
