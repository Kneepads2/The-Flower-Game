/*
Based on this thing I saw in Destiny 2:
"These are the rules of a game. Let it be played upon an infinite two-dimensional grid of flowers.
Rule One. A living flower with less than two living neighbors is cut off. It dies.
Rule Two. A living flower with two or three living neighbors is connected. It lives.
Rule Three. A living flower with more than three living neighbors is starved and overcrowded. It dies.
Rule Four. A dead flower with exactly three living neighbors is reborn. It springs back to life.
The only play permitted in the game is the arrangement of the initial flowers."
*/

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const startButton = document.getElementById('start-button');
    const gridSize = 64; // 64x64 grid for 1280px wide if each cell is 20px with 1px gap
    const cells = [];
    let gameInterval;


    // Create the grid
    for (let row = 0; row < gridSize; row++) {
        cells[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => {
                cell.classList.toggle('alive');
            });
            gridContainer.appendChild(cell);
            cells[row][col] = cell;
        }
    }

    // Start the game
    startButton.addEventListener('click', () => {
        if (gameInterval) {
            clearInterval(gameInterval);
            startButton.textContent = 'Start Game';
        } else {
            gameInterval = setInterval(() => {
                updateGrid();
            }, 100);
            startButton.textContent = 'Stop Game';
        }
    });

    function updateGrid() {
        const newCellsState = cells.map(row => row.map(cell => cell.classList.contains('alive')));

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const aliveNeighbors = countAliveNeighbors(row, col);

                if (newCellsState[row][col]) {
                    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                        cells[row][col].classList.remove('alive');
                    }
                } else {
                    if (aliveNeighbors === 3) {
                        cells[row][col].classList.add('alive');
                    }
                }
            }
        }
    }

    function countAliveNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                    if (cells[newRow][newCol].classList.contains('alive')) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
});
