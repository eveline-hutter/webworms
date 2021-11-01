export default class RefreshHelper {
    makeRefreshList(): boolean[][] {
        const refreshKeys: boolean[][] = []

        for(let row = 0; row < 12; row++) {
            refreshKeys[row] = [];
            for(let column = 0; column < 12; column++) {
                refreshKeys[row][column] = true;
            }
        }
        return refreshKeys;
    }
}