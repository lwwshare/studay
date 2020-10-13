let node1 = {
    val: 1,
    next: node2
};
node2 = {
    val: 2,
    next: null
}
function reverseLlink(link) {
    let node = link,
    next = null,
    pre;
    while (node) {
        next = node.next;
        node.next = pre;
        pre = node;
        node = next;
    }
    return pre;
}