/**
 * TypeScript definitions for terminal.js
 * A VT100/xterm-compliant terminal emulator library
 */

declare module "terminal.js" {
  /**
   * Configuration options for Terminal constructor
   */
  export interface TerminalOptions {
    columns?: number;
    rows?: number;
  }

  /**
   * Represents a single cell in the terminal buffer
   */
  export interface TermCell {
    char?: string;
    code?: number;
    fg?: number;
    bg?: number;
    attr?: number;
  }

  /**
   * Represents the current state of the terminal
   */
  export interface TermState {
    /**
     * Two-dimensional array representing the terminal buffer
     */
    screen: TermCell[][];
    /**
     * Current cursor column position
     */
    cursorX: number;
    /**
     * Current cursor row position
     */
    cursorY: number;
    /**
     * Number of columns
     */
    columns: number;
    /**
     * Number of rows
     */
    rows: number;
    /**
     * Whether the cursor is visible
     */
    cursorHidden: boolean;
    /**
     * Scrollback buffer for scrolled-away content
     */
    scrollback: TermCell[][];
  }

  /**
   * Main Terminal class for VT100/xterm emulation
   */
  export class Terminal {
    constructor(options?: TerminalOptions);

    /**
     * Write data to the terminal
     * @param data String or Buffer containing terminal data (may include escape sequences)
     */
    write(data: string | Buffer): void;

    /**
     * Get the current terminal state
     */
    getState(): TermState;

    /**
     * Reset the terminal to initial state
     */
    reset(): void;

    /**
     * Resize the terminal
     * @param columns Number of columns
     * @param rows Number of rows
     */
    resize(columns: number, rows: number): void;

    /**
     * Get the terminal output in a specific format
     */
    toString(format?: "ansi" | "plain"): string;

    /**
     * Set the cursor position
     */
    setCursor(row: number, col: number): void;

    /**
     * Get the cursor position
     */
    getCursor(): { row: number; col: number };

    /**
     * Bell (system alert)
     */
    bell(): void;
  }

  export default Terminal;
}
