export function getLinesToRemove(xBall, yBall, color, matrix) {
  console.log('getlinestoremove');
  console.log('x=', xBall);
  console.log('у=', yBall);
  console.log('color=', color);
  
  let diagonal1 = [];
  let diagonal2 = [];
  let horizontal = [];
  let vertical = [];

  // diagonal1
  if(xBall >= yBall) {
    let currPos;
    let y = 0;
    let x = xBall - yBall;
    while(x < matrix.length && y < matrix.length) {
      if(matrix[x][y].isBall && matrix[x][y].color === color) {
        diagonal1.push( {x:x, y:y});
      } else if (diagonal1.length < 5) {
        diagonal1 = [];
      }
      x += 1;
      y += 1;
    } 
  } else {
    let x = 0;
    let y = yBall - xBall
    while(x < matrix.length && y < matrix.length) { 
      if(matrix[x][y].isBall && matrix[x][y].color === color) {
        diagonal1.push({x:x, y:y});
      } else if (diagonal1.length < 5) {
        diagonal1 = [];
      }
      x += 1;
      y += 1;
    } 
  }
  console.log('diagonal1', diagonal1);

  // diagonal2
  if((xBall + yBall) < matrix.length) {
    let y = 0;
    let x = xBall + yBall;
    while(x >= 0 && y < matrix.length) {
      if((matrix[x][y].isBall && matrix[x][y].color === color)) {
        diagonal2.push({x:x, y:y});
      } else if (diagonal2.length < 5) {
        diagonal2 = [];
      }
      x -= 1;
      y += 1;
    } 
  } else {

    let x = matrix.length - 1;
    let y = yBall - (matrix.length - 1 - xBall);
    while(x > 0 && y < matrix.length) {

  
      if(matrix[x][y].isBall && matrix[x][y].color === color) {
        diagonal2.push({x:x, y:y});
      } else if (diagonal2.length < 5) {
        diagonal2 = [];
      }
      x -= 1;
      y += 1;
    } 
  }
  console.log('diagonal1', diagonal2);

  // horizontal
  for (let x = 0; x < matrix.length; x++) {


    if(matrix[x][yBall].isBall && matrix[x][yBall].color === color) {
      horizontal.push({x:x, y:yBall});
    } else if (horizontal.length < 5) {
      horizontal = [];
    }
  }

  // vertical
  for (let y = 0; y < matrix.length; y++) {
    
    if(matrix[xBall][y].isBall && matrix[xBall][y].color === color) {
      vertical.push({x:xBall, y:y});
    } else if (vertical.length < 5) {
      vertical = [];
    }
  }

  const arrOfActiveBoxes = [horizontal, vertical, diagonal1, diagonal2];
  return arrOfActiveBoxes;
}
 