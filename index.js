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

        var mid = Math.ceil((start+end)/2);
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
            console.log(current.data)

            //return if node with data is found
            if(current.data === value) {
                return current;
            }

            //traverse to left
            if(value < current.data) {
                current = current.left;
            }

            //traverse to right
            else if(value > current.data) {
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

            else if(value>current.data) {
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
}

const tree = new BinaryTree();
const arr = [1,2,2,3,3,4,5,6,7,8];
// const arr = [];
tree.buildTree(arr);
