/**
 * The matrix helper is used to work with matricies.
 * @module Helper / Matrix Helper
 */

/**
 * A matrix defines as an array of arrays. The dimensions supported here are 3 x 3 matricies.
 */
type MatrixObject = number[][];

/**
 * Helper interface to work with matricies.
 */
interface Matrix {
    /**
     * Generate the identity matrix which will map to itself.
     * @returns A 2D identity matrix.
     */
    createMatrixIdentity(): MatrixObject;
    /**
     * Generate a 2D transformation matrix with the given scale factor and translation.
     * @param scaleX The horizontal scale factor.
     * @param scaleY The vertical scale factor.
     * @param posX The horizontal translation.
     * @param posY The vertical translation.
     * @returns A 2D transformation matrix.
     */
    createMatrix(scaleX: number, scaleY: number, posX: number, posY: number): MatrixObject;
    /**
     * Perform a matrix multiplication.
     * @param matrix1 The first matrix to multiply.
     * @param matrix2 The second matrix to multiply.
     * @returns The result of the matrix multiplication.
     */
    matrixMultiply(matrix1: MatrixObject, matrix2: MatrixObject): MatrixObject;
    /**
     * Checks if all members of the matrix are finite aka a valid number.
     * @param matrix The matrix to check.
     * @returns True if all members of the matrix are finite.
     */
    matrixIsFinite(matrix: MatrixObject): boolean;
}

/**
 * The matrix helper is used to work with matricies.
 */
declare const Matrix: Matrix;