var starsEffect = function() {
  var defaults = {
    spread: 1000,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['F8FF00', '42FF00', 'F372BF', 'F0FF3F', '3A36FF']
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }
  
  setTimeout(shoot, 1000);
  setTimeout(shoot, 1500);
  setTimeout(shoot, 2000);
};