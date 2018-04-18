'use strict';
javascript: {
  (function() {
    var newDoc = open().document;
    /** @type {string} */
    newDoc.title = "Selection";
    if (window.getSelection) {
      var sel = getSelection();
      /** @type {number} */
      i = 0;
      for (; i < sel.rangeCount; i) {
        var a;
        var rng = sel.getRangeAt(i);
        if (!rng.collapsed) {
          /** @type {!Element} */
          var newNode = document.createElement("div");
          newNode.appendChild(rng.cloneContents());
          if (newDoc.importNode) {
            newNode = newDoc.importNode(newNode, true);
          }
          newDoc.body.appendChild(newNode);
        }
      }
    } else {
      newDoc.body.innerHTML = document.selection.createRange().htmlText;
    }
  })();
};
