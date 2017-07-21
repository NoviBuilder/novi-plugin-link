const Icon = novi.ui.icon;
const Input = novi.ui.input;
const Icons = novi.ui.icons;
const React = novi.react.React;
const Component = novi.react.Component;

export default class Header extends Component {
    constructor(props) {
        super();

        let href = novi.element.getAttribute(props.element, 'href');

        this.state = {
            element: props.element,
            href
        };

        this._handleLinkChange = this._handleLinkChange.bind(this);
    }

    render() {
        return (
            <div className="novi-link-tool">
                <Icon>{Icons.ICON_LINK}</Icon>
                <div className="link-tool-input-warp" style={{width: 195}}>
                    <Input onChange={this._handleLinkChange} value={this.state.href}/>
                </div>
            </div>
        )
    }

    _handleLinkChange(e) {
        let value = e.target.value;
        this.setState({
            href: value
        });
    }
}