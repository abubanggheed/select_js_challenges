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

  removeOldRoot(timeThreshold) {
    let instance = this.root;
    if (this.root && instance.timestamp < time) {
      this.root = this.root.next;
      this.length --;
      if (this.root !== null) {
        this.root.prev = null
      } else {
        this.tail = null;
      }
      return removeOldRoot(timeThreshold);
    } else {
      return this.length
    }
  }

  appendToTail() {
    let currentTime = Date.now();
    let instance = new IpInstance(currentTime);
    if (this.tail) {
      this.tail.next = instance;
      instance.prev = this.tail;
      let timeThreshold = currentTime - timespan;
      this.tail = instance;
      if (this.removeOldRoot(timeThreshold) > this.maxLength) {
        return true;
      }
    } else {
      this.tail = instance;
      this.root = instance;
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
