(function () {
	console.log("running");
	
	// GLOBALS
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, gridHeight, gridWidth);
	
	var gridHeight = 200;
	var gridWidth = 200;
	
	var grid = createArray(gridHeight, gridWidth);
	
	console.log(grid);

	//run main methods
	setup();	
	populate();
	run();
	
	
	// FUNCTIONS
	function setup() {
		for (x = 0; x < gridHeight; x++) {
			for (y = 0; y < gridWidth; y++) {
				grid[x][y] = (Math.random() > 0.9 ? 1 : 0);
			}
		}
	}
	
	//Matthew Crumley
	//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
	function createArray(length) {
		var arr = new Array(length || 0),
			i = length;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}

		return arr;
	}
	
	//draw the grid
	function populate() {
		var x;
		var y;
	
		for (x = 0; x < gridHeight; x++) {
			for (y = 0; y < gridWidth; y++) {
				drawCell(x, y);
			}
		}
	};
	
	function update() {
		console.log("updating");
		for (x = 1; x < gridHeight - 1; x++) {
			for (y = 1; y < gridWidth - 1; y++) {
				//drawCell(x, y, "alive");
				var cellTotal = 0;
				
				//total neighbours
				cellTotal += grid[x - 1][y - 1]; //TL
				cellTotal += grid[x - 1][y]; //TC
				cellTotal += grid[x - 1][y + 1]; //TR
				cellTotal += grid[x][y - 1]; //ML
				cellTotal += grid[x][y + 1]; //MR
				cellTotal += grid[x + 1][y - 1]; //BL
				cellTotal += grid[x + 1][y]; //BC
				cellTotal += grid[x + 1][y + 1]; //BR
				
				//rules
				if (grid[x][y] == 0) {
					//dead cell rules
					switch(cellTotal) {
						case 3:
							grid[x][y] = 1; //cell is dead but has 3 neighbours
							break;

						default:
							grid[x][y] = 0; //still dead
							break;
					}
				} else if (grid[x][y] == 1) {
					//living cell rules
					switch(cellTotal) {
						case 0:
						case 1:
							grid[x][y] = 0; //die of lonelines
						break;

						case 2:
						case 3:
							grid[x][y] = 1; //carry on living
						break;

						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
							grid[x][y] = 0; //die of overcrowding
						break;

						default:
							grid[x][y] = 0; //cell dies
					}
				}
			}
		}
	};

	function drawCell(x, y) {
		if (grid[x][y] == 1) {
			context.fillStyle = "black";
			context.fillRect(x,y,1,1)
		}
	};
	
	function run() {
		context.clearRect(0, 0, gridHeight, gridWidth);
		update();
		populate();
		requestAnimationFrame(run);
	}
})();

