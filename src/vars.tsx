export enum KeyCode {
    left = 37,
    up = 38,
    right = 39,
    down = 40,
    backspace = 8,
    delete = 46
}

export const ARROW_KEY_CODES: number[] = [KeyCode.left, KeyCode.right, KeyCode.up, KeyCode.down];
export const REMOVE_KEY_CODES: number[] = [KeyCode.backspace, KeyCode.delete];

export enum NotificationType {
    SUCCESS,
    ERROR
}
