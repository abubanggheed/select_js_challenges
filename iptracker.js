/*
This file provides a framework for an anti ddos defense system. The basic structure is
each ip address has a bucket in a tree that tracks and manages instances of requests.
Then if, that bucket is of a certain size, a value is returned to indicate that they
should be blocked. The buckets are storred on a splay tree so that active users will
cluster toward the top of the tree, and so will be easier to lookup. The tree will cutof
at a certain depth.
*/

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
      this.length--;
      if (this.root !== null) {
        this.root.prev = null
      } else {
        this.tail = null;
      }
      return this.removeOldRoot(timeThreshold);
    } else {
      return this.length
    }
  }

  appendToTail() {
    let currentTime = Date.now();
    let instance = new IpInstance(currentTime);
    this.length++;
    if (this.tail) {
      this.tail.next = instance;
      instance.prev = this.tail;
      let timeThreshold = currentTime - this.timespan;
      this.tail = instance;
      return this.removeOldRoot(timeThreshold) > this.maxLength;
    } else {
      this.tail = instance;
      this.root = instance;
      return false;
    }
  }
}

class IpTracker {
  constructor(maxDepth, maxRequests, maxBucketLength, timespan, root = null) {
    this.maxDepth = maxDepth;
    this.root = root;
    this.maxRequests = maxRequests;
    this.maxBucketLength = maxBucketLength;
    this.timespan = timespan;
  }

  rightRotationAt(node) {
    let toPromote = node.leftChild;
    let newLeft = toPromote.rightChild;
    if (node.parent) {
      if (node.parent.leftChild === node) {
        node.parent.leftChild = toPromote
      } else {
        node.parent.rightChild = toPromote
      }
    } else {
      this.root = toPromote;
    }
    node.leftChild = newLeft;
    toPromote.rightChild = node;
  }

  leftRotationAt(node) {
    let toPromote = node.rightChild;
    let newRight = toPromote.rightChild;
    if (node.parent) {
      if (node.parent.rightChild === node) {
        node.parent.rightChild = toPromote
      } else {
        node.parent.leftChild = toPromote
      }
    } else {
      this.root = toPromote;
    }
    node.rightChild = newRight;
    toPromote.leftChild = node;
  }

  promote(node) {
    while (node !== this.root) {
      let p = node.parent;
      if (p) {
        let gp = node.parent.parent;
        if (gp.leftChild === p) {
          if (p.leftChild === node) {
            this.rightRotationAt(gp);
            this.rightRotationAt(p);
          } else {
            this.leftRotationAt(p);
            this.rightRotationAt(gp);
          }
        } else {
          if (p.leftChild === node) {
            this.rightRotationAt(p);
            this.leftRotationAt(gp);
          } else {
            this.leftRotationAt(gp);
            this.leftRotationAt(p);
          }
        }
      } else {
        if (p.leftChild === node) {
          this.rightRotationAt(p);
        } else {
          this.leftRotationAt(p);
        }
      }
    }
  }

  process(ipAddress) {
    let ipArray = ipAddress.split('.').map(strnum => Number(strnum));
    let diagnosis = this.lookup(ipArray, null, this.root);
    if (diagnosis.depth >= this.maxDepth - 1) {
      diagnosis.bucket.leftChild = null;
      diagnosis.bucket.rightChild = null;
    }
    this.promote(diagnosis.bucket)
    if (diagnosis.evaluation) {
      let today = new Date();
      let created = diagnosis.bucket.date;
      if (today.getDay !== created.getDay || today.getMonth !== created.getMonth || today.getFullYear !== created.getFullYear) {
        diagnosis.bucket.length = 0;
        diagnosis.bucket.root = 0;
        diagnosis.bucket.tail = 0;
        return true;
      } else {
        return false
      }
    } else {
      return true;
    }
  }

  lookup(ipArray, previous, current, depth = 0) {
    if (current) {
      switch (this.greaterThanIp(ipArray, current.address)) {
        case '=':
          return { evaluation: current.appendToTail(), depth: depth, bucket: current }
        //evaluation will result in true or false, true means the number or requests exceeded the max
        case true:
          return lookup(ipArray, current, current.rightChild, depth + 1);
        case false:
          return lookup(ipArray, current, current.leftChild, depth + 1);
        default:
          break;
      }
    } else {
      let newBucket = new IpBucketlist(ipArray, new Date(), this.maxRequests, this.timespan, previous)
      if (previous) {
        if (this.greaterThanIp(newBucket.address, previous.address)) {
          previous.rightChild = newBucket;
        } else {
          previous.leftChild = newBucket;
        }
      }
      return { evaluation: newBucket.appendToTail(), depth: depth, bucket: newBucket }
    }
  }

  greaterThanIp(ip1, ip2, index) {
    return (ip1[index] !== null) ?
      (ip1[index] === ip2[index]) ?
        this.greaterThanIp(ip1, ip2, index + 1)
        : ip1[index] > ip2[index]
      : '=';
  }
}
