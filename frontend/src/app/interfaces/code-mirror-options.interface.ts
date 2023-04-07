import { CodeMirrorDirectionEnum, WebCodeContentEnum } from '../enums';

export interface CodeMirrorGutters {
  className: string,
  style?: string;
}

export interface CodeMirrorOptions {
  foldGutter?: boolean;
  autoCloseBrackets?: boolean;
  matchBrackets?: boolean;
  lint?: boolean;
  value?: string;
  mode?: string | object;
  lineSeparator?: string | null;
  theme?: string;
  indentUnit?: number;
  smartIndent?: boolean;
  tabSize?: number;
  indentWithTabs?: boolean;
  electricChars?: boolean;
  specialChars?: RegExp;
  direction?: CodeMirrorDirectionEnum,
  rtlMoveVisually?: boolean;
  keyMap?: string;
  extraKeys?: object;
  lineWrapping?: boolean;
  lineNumbers?: boolean;
  firstLineNumber?: number;
  lineNumberFormatter?: (line: number) => string;
  gutters?: string[] | CodeMirrorGutters;
  fixedGutter?: boolean;
  scrollbarStyle?: string;
  coverGutterNextToScrollbar?: boolean;
  inputStyle?: string;
  readOnly?: boolean | string;
  screenReaderLabel?: string;
  showCursorWhenSelecting?: boolean;
  lineWiseCopyCut?: boolean;
  pasteLinesPerSelection?: boolean;
  selectionsMayTouch?: boolean;
  undoDepth?: number;
  historyEventDelay?: number;
  tabindex?: number;
  autofocus?: boolean;
  phrases?: object;
  dragDrop?: boolean;
  allowDropFileTypes?: string[];
  cursorBlinkRate?: number;
  cursorScrollMargin?: number;
  cursorHeight?: number;
  singleCursorHeightPerLine?: boolean;
  resetSelectionOnContextMenu?: boolean;
  workTime?: number;
  workDelay?: number;
  pollInterval?: number;
  flattenSpans?: boolean;
  addModeClass?: boolean;
  maxHighlightLength?: number;
  viewportMargin?: number;
  spellcheck?: boolean;
  autocorrect?: boolean;
  autocapitalize?: boolean;
}

export interface CodeMirrorEmiterData {
  content: string;
  languageName: WebCodeContentEnum;
  isEmpty?: boolean;
}