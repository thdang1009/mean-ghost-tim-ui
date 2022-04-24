export const ExampleCode = `function longestSlideDown(pyramid) {
    let max = -Infinity;
    for (let i = pyramid.length - 2; i >= 0; --i) {
      for (let j = 0, length = pyramid[i].length; j < length; j++) {
        const maxLeft = pyramid[i][j] + pyramid[i + 1][j];
        const maxRight = pyramid[i][j] + pyramid[i + 1][j + 1];
        max = Math.max(maxLeft, maxRight);
        pyramid[i][j] = max;
      }
    }
    return max;
  }
  const result = longestSlideDown(
    [[3],
    [7, 4],
    [2, 4, 6],
    [8, 5, 9, 3]]);
  console.log(result);`;
export const ExampleJSON = `{ "products": [{ "name": "car", "product": [{ "name": "honda", "model": [{ "id": "civic", "name": "civic" }, { "id": "accord", "name": "accord" }, { "id": "crv", "name": "crv" }, { "id": "pilot", "name": "pilot" }, { "id": "odyssey", "name": "odyssey" }] }] }] }`