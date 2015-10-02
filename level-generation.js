
drawLevel = function(context,seed) {
  var canvas = $("#bird-canvas");
  var level = getLevel(1000,seed);
  var block_width = 40;
  var block_space_multiplier = 3;
  var block_space = block_width * block_space_multiplier;
  var block_period = block_space + block_width;

  var pos_x = 150;

  level.forEach(function(level) {

    var pos_x = pos_x + block_period;

    context.fillStyle = "#000000";
    context.fillRect(
      (level.x * block_period),
      level.y1,
      block_width,
      level.y2 - level.y1
    );
  })
}

getLevel = function(height,block_seed) {
  var blocks = [];
  for (i = 2; i < 254; i++) {
    block_seed = md5(block_seed)
    var hex = "0x";
    blocks.push(block_pos(height,parseInt(hex.concat(block_seed.substr(1,2))),i));
  }

  return blocks;
}

var block_pos = function(height,seed,difficulty) {
  var difficulty_factor = 1;
  var apature = 300;
  var pos = (seed/255)*height;
  var modifier = (apature - (difficulty * difficulty_factor));
  return {
    'x':i,
    // 'y1':Math.random() * 10,
    // 'y2':Math.random() * 250
    'y1': pos - (modifier/2),
    'y2': pos + (modifier/2),
  };
}
