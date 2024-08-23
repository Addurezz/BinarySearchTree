class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    _cleanup(arr) {
        //sorting the array
        arr.sort();

        //removing any duplicates
        let hashset = {};
        for(let i=0;i<arr.length;i++) {
            if(hashset[arr[i]]) {
                arr.splice(i,1);
                i--;
            }

            hashset[arr[i]] = true;
        };

        return arr;
    }

    
    
    _sortedArrayToBST(arr,start,end) {
        //base case
        if(start>end) {
            return null;
        }

        var mid = Math.floor((start+end)/2);
        var node = new Node(arr[mid]);

        //set root of tree
        if(!this.root) {
            this.root = node;
        }

        //recursively get left and right node
        node.left = this._sortedArrayToBST(arr,start,mid-1);
        node.right = this._sortedArrayToBST(arr,mid+1,end);

        return node;
    }

    buildTree(array) {
        const arr = this._cleanup(array);
        const start = 0;
        const end = arr.length-1;

        this._sortedArrayToBST(arr,start,end);
        return this.root;
    }

    find(value) {
        let current = this.root;
         
        //traverse the tree from the root 
        while(current) {
            //return if node with data is found
            if(current.data === value) {
                return current;
            }

            //traverse to left
            if(value < current.data) {
                current = current.left;
            }

            //traverse to right
            if(value > current.data) {
                current = current.right;
            }
        }

        //if data is not found in Tree
        return -1;
    }

    insert(value) {
        const newNode = new Node(value);

        //if tree is empty
        if(!this.root) {
            this.root = newNode;
        }

        //traverse tree to find spot
        let current = this.root;
        
        while(true) {
            if(value<current.data) {
                if(!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            }

            if(value>current.data) {
                if(!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right
            }

            else {
                break;
            }
        }
    }

    delete(value) {
        if(!this.find(value)) {
            return -1;
        }
        this.root = this._deleteNode(this.root,value);
    };

    _deleteNode(root,value) {
        if(root === null) {
            return root;
        }

        else if(root.data > value) {
            root.left = this._deleteNode(root.left,value)
        }

        else if(root.data < value) {
            root.right = this._deleteNode(root.right,value);
        }

        else {
            if(!root.left && !root.right) {
                return null;
            }

            if(!root.left) {
                return root.right;
            }

            if(!root.right) {
                return root.left;
            }
            const minNode = this._findMin(root.right);
            root.data = minNode.data;
            root.right = this._deleteNode(root.right, minNode.data);
        }
        
        return root;
    }

    _findMin(node) {
        let current = node;

        while(current.left !== null) {
            current = current.left;
        }

        return current;
    }

    levelOrder() {
        if(this.root===null) {
            return null;
        }

        let result = [];
        let queue = [this.root];

        while(queue.length>0) {
            const level = [];

            for(let i=0; i<queue.length;i++) {
                const node = queue.shift();

                level.push(callback(node.data));

                if(node.left) {
                    queue.push(node.left);
                }

                if(node.right) {
                    queue.push(node.right);
                }

            }

            result.push(level);
        }
        return result
    }

    preOrder(root=this.root) {
        if(!root) {
            return [];
        }
        let result = [root.data];

        result.push(...this.preOrder(root.left));
        result.push(...this.preOrder(root.right));

        return result;
    }

    inOrder(root=this.root) {
        if(!root) {
            return [];
        }

        let result = [...this.inOrder(root.left),root.data,...this.inOrder(root.right)];

        return result;
    }

    postOrder(root=this.root) {
        if(!root) {
            return [];
        }

        let result = [...this.postOrder(root.left),...this.postOrder(root.right), root.data];

        return result;
    }

    height(node) {
        if(!node) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight,rightHeight) + 1;
    }

    depth(node) {
        if(!node) {
            return -1;
        }

        let current = this.root;
        let depth = 0;

        while(current) {
            if(current.data===node.data) {
                return depth
            }

            if(node.data < current.data) {
                current = current.left;
            }

            if(node.data > current.data) {
                current = current.right;
            }

            depth++;
        }

        return -1;
    }

    isBalanced(node) {
        if(!node) {
            return {height: -1, balanced: true};
        }

        const left = this.isBalanced(node.left);
        const right = this.isBalanced(node.right);
        
        const height = Math.max(left,right) + 1;

        if(Math.abs(left.height - right.height) > 1 && left.balanced && right.balanced) {
            return false;
        }

        return {height, balanced};
    }

    balance() {
        const arr = this.inOrder();
        return this.buildTree(arr);
    }
}

const tree = new BinaryTree();
const arr = [1,2,2,3,3,4,5,6,7,8];
// const arr = [];
tree.buildTree(arr);
