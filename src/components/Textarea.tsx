import { css } from '@emotion/css';
import { h } from 'preact';

const className = css`
  background-color: #1d1f21;
  border: none;
  color: #c5c8c6;
  font-family: "Source Code Pro", Consolas, "Ubuntu Mono", Menlo, "DejaVu Sans Mono", monospace;
  font-size: 0.875em;
  min-height: 9.5em;
  resize: vertical;
  width: 100%;
`;

type Props = {
  onKeyUp?: (e: Event) => unknown,
  value?: string
};

const Textarea = ({ onKeyUp, value }: Props) =>
  <textarea className={className} onKeyUp={onKeyUp} value={value}>
  </textarea>;

export default Textarea;
