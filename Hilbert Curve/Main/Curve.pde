class Curve {
    int[][] grid;
    int[][] gridNext;

    int size = 1;

    Curve() {
        grid = new int[size][size];
        grid[0][0] = 1;
    }

    void copy(int iOff, int jOff, int valTimes){
        int len = size * size;
        int offset = ( valTimes - 1 ) * len;

        for (int i = 0 ; i < size ; i++){
            for (int j = 0 ; j < size ; j++){
                gridNext[i + iOff][j + jOff] = grid[i][j] + offset;
            }
        }
    }

    void flip(int iOff, int jOff, int axis){
        if ( axis == 0 ){
            for (int i = 0 ; i < size - 1 ; i++){
                for (int j = i + 1 ; j < size ; j++){
                    int aux = gridNext[i + iOff][j + jOff];
                    gridNext[i + iOff][j + jOff] = gridNext[j + jOff][i + iOff];
                    gridNext[j + jOff][i + iOff] = aux;
                }
            }
            return;
        }
        for (int i = 0 ; i < size - 1 ; i++){
            for (int j = 0 ; j < size - i - 1 ; j++){
                int aux = gridNext[i + iOff][j + jOff];
                gridNext[i + iOff][j + jOff] = gridNext[size - j - 1 + iOff][size - i - 1 + jOff];
                gridNext[size - j - 1 + iOff][size - i - 1 + jOff] = aux;
            }
        }
    }

    void iterate() {
        gridNext = new int[size * 2][size * 2];

        copy(0   , 0   , 2);
        copy(0   , size, 3);
        copy(size, 0   , 1);
        copy(size, size, 4);

        flip(size, 0   , 1);
        flip(size, size, 0);

        grid = gridNext;
        size *= 2;
    }

    void display() {
        float sideLen = width / (float)size;
        float deltaColor = 255.0 / (size * size - 1);

        noStroke();

        for (int i = 0 ; i < size ; i++){
            for (int j = 0 ; j < size ; j++){
                fill(255 - deltaColor * (grid[i][j] - 1));
                rect(j * sideLen, i * sideLen, sideLen, sideLen);
            }
        }
    }
}