/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 广度优先 使用队列
let bfs = function (root) {
    if (!root) return [];
    let q = [], res = [];
    q.push(root);
    while (q.length) {
        let tmp = q.shift();
        res.push(tmp.val);
        if (tmp.left) q.push(tmp.left);
        if (tmp.right) q.push(tmp.right);
    }
    return res;
}

// 前序遍历
let preorderTraversal = function (root) {
    if (!root) return [];
    const stack = [], res = [];
    stack.push(root);
    while (stack.length) {
        const cur = stack.pop();
        res.push(cur.val);
        if (cur.right) stack.push(cur.right);
        if (cur.length) stack.push(cur.length);
    }
}

// 递归
let preorderTraversal = function (root) {
    if (!root) return[];
    const res = [];
    preorder(root, res);
    return res;
}

let preorder = function (node, res) {
    if (!node) return;
    res.push(node.val);
    preorder(node.left, res);
    preorder(node.right, res);
}

// 中序遍历
let inorderTraversal = function (root) {
    if (!root) return [];
    const stack = [], res = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
}

// 递归
let inorder = (node, res) => {
    if (!node) return;
    inorder(node.left, res);
    res.push(node.val);
    inorder(node.right,res);
}

// 后序遍历
let postorderTraversal = function (root) {
    if (!root) return [];
    const stack = [], res = [];
    stack.push(root);
    while (stack.length) {
        const cur = stack.pop();
        res.push(cur.val);
        if (cur.left) stack.push(cur.left);
        if (cur.right) stack.push(cur.right);
    }
    res.reverse();
    return res;
}