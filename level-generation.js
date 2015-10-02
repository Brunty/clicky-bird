// This is a comment - KG
getLevel = function(height,block_seed) {
  var blocks = [];
  for (i = 0; i < 256; i++) {
    block_seed = md5(block_seed)
    var hex = "0x";
    blocks.push(block_pos(height,parseInt(hex.concat(block_seed.substr(1,2)))),i);
  }

  return blocks;
}

var block_pos = function(height,seed,difficulty) {
  var difficulty_factor = 1;
  var apature = 300;
  var pos = (seed/255)*height;
  return {
    'y1':pos - parseInt((apature - (difficulty * difficulty_factor))/2),
    'y2':pos + parseInt((apature - (difficulty * difficulty_factor))/2)
  };
}
