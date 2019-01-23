class IpInstance {
  constructor(timestamp, parent=null, child=null) {
    this.address = address;
    this.timestamp = timestamp;
    this.parent = parent;
    this.child = child;
  }
}

class IpBucketlist {
  constructor(address, date, maxLength, timespan, parent=null, length=0, leftChild=null, rightChild=null, root=null, tail=null) {
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
}

class IpTracker {
  constructor(maxDepth, root=null) {
    this.maxDepth = maxDepth;
    this.root = root;
  }
}
