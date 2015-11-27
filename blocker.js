var AntiSpamVK = {
  _checkRegexp: new RegExp(
    '(' + (
      [
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
        'разместить данный пост',
        'случай[а-я]{1,} подписчи',
        'дела[а-я]{1,} репост'
      ].join(')|(')
    ) + ')',
    'ig'
  ),
  check: function check(text) {
    return text.toLowerCase().match(this._checkRegexp);
  },
  block: function block(element) {
    var deleteBtn,
        deleteBtnCandidates = element.getElementsByClassName('post_delete_button');
    if (deleteBtnCandidates.length) deleteBtn = deleteBtnCandidates[0];
    if (deleteBtn) deleteBtn.click();
  },
  run: function run() {
    var CLASS_CHECKED = 'antispamvk-checked',
        CLASS_BLOCKED = 'antispamvk-blocked';
    var posts = document.getElementsByClassName('post');
    for (var i=0; i<posts.length; i++) {
      var post = posts[i];
      if (post.className.indexOf(CLASS_CHECKED) > -1) continue;
      var text = '';
      var textParts = [];
      Array.prototype.push.apply(
        textParts,
        post.getElementsByClassName('wall_post_text')
      );
      Array.prototype.push.apply(
        textParts,
        post.getElementsByClassName('wall_text')
      );
      if (textParts.length) {
        text += textParts.map(function(part) { return part.innerHTML || ''; });
      }
      if (this.check(text)) {
        this.block(post);
        post.className = post.className + ' ' + CLASS_BLOCKED;
      }
      post.className = post.className + ' ' + CLASS_CHECKED;
    }
  }
};

AntiSpamVK.run();

setTimeout(function() {
  AntiSpamVK.run();
}, 200);
setTimeout(function() {
  AntiSpamVK.run();
}, 500);
setTimeout(function() {
  AntiSpamVK.run();
  setInterval(function() {
    AntiSpamVK.run();
  }, 1000);
}, 1000);



