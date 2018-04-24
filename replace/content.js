chrome.runtime.onMessage.addListener(function() {
  var t = '';
  $('p').each(function(){
    console.log($(this).text());
    var t = $(this).text().replace('news', 'real fake NEWS');
    $(this).text(t);
  });

  var src = chrome.extension.getURL('news.jpg');
  $('img').attr('src', src);
});
