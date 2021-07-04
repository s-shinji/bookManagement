/**
 * ReduxFormバリデーション用のバリデーションメソッド集
 * 各メソッドは、先頭の引数で入力データを受け取り、undefinedかエラーメッセージを戻す
 */

// 入力必須
export const required = (value, msg) => !value ? msg : undefined;

// 数値
// export const number = (value, msg) => value && isNaN(value) ? msg : undefined;

// 最大文字数
export const maxLength = (value, max, msg) => value && value.length > max ? msg : undefined;

// 最小文字数
// export const minLength = (value, min, msg) => value && value.length < min ? msg : undefined;

// 最大値
// export const maxNum = (value, max, msg) => value && value > max ? msg : undefined;

// 最小値
// export const minNum = (value, min, msg) => value && value < min ? msg : undefined;

// フォーマット
export const format = (value, reg, msg) => value && !value.match(reg) ? msg : undefined;

// メールアドレス
export const email = (value, msg) => format(value, /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i, msg);