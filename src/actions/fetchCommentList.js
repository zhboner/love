import axios from 'axios';
import config from '../config';

export const REQUEST_COMMENTS_LIST = 'REQUEST_COMMENTS_LIST';
export const RECEIVE_COMMENTS_LIST = 'RECEIVE_COMMENTS_LIST';

const requestCommentsList = (postID) => {
    return {
        type: REQUEST_COMMENTS_LIST,
        postID: postID
    }
};

const receiveCommentsList = (commentsObj, postID, CommentsAmount, supDict) => {
    return {
        type: RECEIVE_COMMENTS_LIST,
        data: commentsObj,
        postID: postID,
        CommentsAmount: CommentsAmount,
        supDict: supDict
    }
};


export const fetchCommentList = (postID, page = 1) => {
    let url = config.prefix + 'comments?order=asc&post=' + postID + '&page=' + page;
    return (dispatch, getState) => {
        dispatch(requestCommentsList(postID));
        axios.get(url)
            .then((response) => {
                const commentList = response.data;
                let commentObj = changeListToObj(commentList);

                let queryIDs = {};
                let queryPromises = [];
                commentList.map(comment => {
                    if (comment.parent !== 0 && !commentObj[comment.parent]) {
                        queryIDs[comment.parent] = 0;
                    }
                });
                Object.keys(queryIDs).map(id => {
                    queryPromises.push(getCommentUser(id))
                });

                Promise.all(queryPromises).then(resList => {
                    let supDict = {};
                    resList.map(res => {
                        supDict[res.data.id] = res.data;
                    });

                    dispatch(receiveCommentsList(commentList, postID, parseInt(response.headers['x-wp-total'], 10), supDict));
                });

            })
    }
};

const getCommentUser = (id) => {
    const url = config.prefix + 'comments/' + id;
    return axios.get(url);
};

// Change comment list to comment object.
const changeListToObj = (commentList) => {
    let commentObj = {0: null};
    commentList.map(comment => {
        commentObj[comment.id] = comment;
    });
    return commentObj;
};

// Reorder the comment list by thread
const reorderComment = (comments) => {
    class Node {
        constructor(value, parent = 0) {
            this.prev = parent;
            this.value = value;
            this.children = [];
        }
    }

    const buildCommentTree = () => {
        let dict = {};      // Map id to node
        let root = [];      // The array of root id
        let commentDict = {};

        for (let i = 0; i < comments.length; i++) {
            const id = parseInt(comments[i].comment_ID);
            const parentID = parseInt(comments[i].comment_parent);

            commentDict[id] = comments[i];

            // Get the node and set its parent
            let node = null;
            if (dict[id]) {                         // If this node can be found in the dict, pick out and set its parent
                node = dict[id];
                node.prev = parentID;
            } else {                                // Else, create a new one
                node = new Node(id, parentID);
                dict[id] = node;
            }

            // Set parent node's children
            if (parentID !== 0) {
                let parentNode = null;
                if (dict[parentID]) {
                    parentNode = dict[parentID];
                } else {
                    parentNode = new Node(id);
                    dict[parentID] = parentNode;
                }
                parentNode.children.push(id)
            } else {
                root.push(id);
            }
        }
        return {dict, root, commentDict};
    };

    // Sort the comment list
    const generateCommentsList = (dict, root, commentDict) => {
        let result = [];

        for (let i = 0; i < root.length; i++) {
            let line = [];
            let node = commentDict[root[i]];
            line.push(node);

            const children = dict[root[i]].children;
            let queue = children;
            while (queue.length !== 0) {
                let tmp = queue.pop();
                line.push(commentDict[tmp]);
                queue.concat(dict[tmp].children)
            }

            line = line.sort((x, y) => {
                const dateX = new Date(x.comment_date),
                    dateY = new Date(y.comment_date);
                if (dateX < dateY) {
                    return -1;
                } else if (dateX === dateY) {
                    return 0;
                } else {
                    return 1;
                }
            });
            result = result.concat(line);
        }
        return result;
    };

    let tree = buildCommentTree();
    return generateCommentsList(tree.dict, tree.root, tree.commentDict);

};