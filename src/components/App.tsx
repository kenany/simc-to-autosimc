import { css } from 'emotion';
import { Component, h } from 'preact';

import Textarea from './Textarea';
import convert from '../convert';

const centerClassName = css`
  text-align: center;
`;

type Props = {};
type State = {
  simcInput: string
};

class App extends Component<Props, State> {
  public state: State = {
    simcInput: ''
  };

  private onSimcInputChange(event: Event) {
    if (!event.currentTarget) {
      return;
    }

    this.setState({
      simcInput: (event.currentTarget as HTMLTextAreaElement).value
    })
  }

  public render({}: Props, { simcInput }: State) {
    return (
      <div>
        <h1 className={centerClassName}>simc to autosimc</h1>
        <h2>simc input</h2>
        <Textarea onKeyUp={this.onSimcInputChange.bind(this)} value={simcInput} />
        <h2>autosimc input</h2>
        <Textarea value={convert(simcInput)} />
      </div>
    );
  }
}

export default App;
