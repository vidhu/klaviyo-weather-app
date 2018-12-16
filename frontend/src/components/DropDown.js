import React from 'react';
import { Input } from 'reactstrap';
import onClickOutside from 'react-onclickoutside';
import Fuse from 'fuse.js';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: '',
      suggestions: []
    };
    this.fuse = new Fuse(this.props.suggestions, {
      threshold: 0.4,
      distance: 10
    });
  }

  handleClickOutside = e => {
    this.setState({
      visible: false
    });
  };

  onValueChange = e => {
    const suggestions = this.fuse.search(e.target.value).map(idx => this.props.suggestions[idx]);
    this.setState({ value: e.target.value, suggestions });
  };

  getVisibleClass = () => (this.state.visible ? 'visible' : 'invisible');

  showSuggestions = () => {
    this.setState({
      visible: true
    });
  };

  onSuggestionSelect = value => {
    this.setState({ value, visible: false });
    if (this.props.onChange) this.props.onChange(value);
  };

  render() {
    const { name, id, placeholder } = this.props;
    return (
      <div>
        <Input
          {...{ name, id, placeholder }}
          onFocus={this.showSuggestions}
          value={this.state.value}
          onChange={this.onValueChange}
          autoComplete="off"
        />
        <ul className={`dropdown menu paper ${this.getVisibleClass()}`}>
          {this.state.suggestions.map(city => (
            <li key={city} onClick={() => this.onSuggestionSelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default onClickOutside(DropDown);
