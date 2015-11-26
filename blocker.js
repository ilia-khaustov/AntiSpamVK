var AntiSpamVK_MARKERS = [
  'победителя определ',
  'победителей определ',
  'распродажа',
  'акция',
  'выбиратель',
  'выбератель',
  'розыгрыш',
  'розыгриш',
  'розыгрышь',
  'розигрыш',
  'получит бесплатно',
  'получет бесплатно',
  'получат бесплатно',
  'случай[а-я]{1,} подписчи',
  'делать репост',
  'делай репост'
];

var AntiSpamVK = {
  clean: function clean() {
    var posts = document.getElementsByClassName('post');
    for (var i=0; i<posts.length; i++) {
      var post = posts[i];
      if (post.className.indexOf('antispamvk-checked')) > -1) continue;
      var test = '(' + AntiSpamVK_MARKERS.join(')|(') + ')';
      if (post.innerText.toLowerCase().match(new RegExp(test,'ig'))) {
        if (post.getElementsByClassName('post_delete_button').length === 0) {
          return;
        }
        var deleteBtn = post.getElementsByClassName('post_delete_button')[0];
        if (!deleteBtn) {
          return;
        }
        deleteBtn.click()
      }
      post.className = post.className + ' ' + ('antispamvk-checked');
    }
  }
}

AntiSpamVK.clean();

setTimeout(function() {
  AntiSpamVK.clean();
}, 200);
setTimeout(function() {
  AntiSpamVK.clean();
}, 500);
setTimeout(function() {
  AntiSpamVK.clean();
}, 1000);

setInterval(function() {
  AntiSpamVK.clean();
}, 1000);

