function updateBubble(refDiv, html){
  'use strict';
  var containerRect = document.getElementById("form-views").getBoundingClientRect();
  var divRect = refDiv.getBoundingClientRect();
  var offset = divRect.top - containerRect.top;

  var div = document.getElementById('bubble');
  if(div.style.display=="none"){
    div.style.display="";
  }
  div.style.marginTop = offset + 'px';
  div.innerHTML = html;
}

function resetBubble(){
  'use strict';
  document.getElementById('bubble').style.display="none";
}
