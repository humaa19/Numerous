/**
 * @class Class to help coordinate the levels of the addition games
 */
var AdditionGameHelper = new Class ( /** @lends AdditionGameHelper.prototype */ {

	/**
	 * Generates a question based on a difficulty. The difficulty directly corresponds to a 
	 * level in the addition game (between 0 and 16).
	 * @param {integer} difficulty corresponds to levels in the addition game (between 0 and 16).
	 * @returns {integer} q.left the left integer to add
	 * @returns {integer} q.right the right integer to add
	 * @returns {integer} q.answer the sum of the left and right integers
	 */
	generateQuestion: function(difficulty) {
		var q = {};
		switch (difficulty) {
			case 0:
				// ? + ? = ?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9 - q.left);
			break;
			case 1:
				// ? + ? = 1?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
			break;
			case 2:
				// 1? + ? = 1?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 10;
			break;
			case 3:
				// 1? + ? = 2?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 10;
			break;
			case 4:
				// 1? + 1? = 2?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 10;
				q.right += 10;
			break;
			case 5:
				// 1? + 1? = 3?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 10;
				q.right += 10;
			break;
			case 6:
				// 2? + 2? = 4?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 20;
				q.right += 20;
			break;
			case 7:
				// 2? + 2? = 5?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 20;
				q.right += 20;
			break;
			case 8:
				// 2? + 3? = 5?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 20;
				q.right += 30;
			break;
			case 9:
				// 2? + 3? = 6?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 20;
				q.right += 30;
			break;
			case 10:
				// ?0 + ?0 = ?0
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left *= 10;
				q.right *= 10;
			break;
			case 11:
				// 9? + ? = 9?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 90;
			break;
			case 12:
				// 9? + ? = 10?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 90;
			break;
			case 13:
				// ?0 + ?0 = ??0
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left *= 10;
				q.right *= 10;
			break;
			case 14:
				// 9? + 3? = 12?
				q.left = mathUtil.random(1,8);
				q.right = mathUtil.random(1, 9-q.left);
				q.left += 90;
				q.right += 30;
			break;
			case 15:
				// 8? + 4? = 13?
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				q.left += 80;
				q.right += 40;
			break;
			case 16:
				// ?? + ?? = 1??
				var tempLeft = mathUtil.random(1,9);
				var tempRight = mathUtil.random(10-tempLeft ,9);
				
				q.left = mathUtil.random(1,9);
				q.right = mathUtil.random(10-q.left ,9);
				
				q.left += tempLeft * 10;
				q.right += tempRight * 10;
			break;
		}
		q.answer = q.left + q.right;
		return q;
	},
	
});

