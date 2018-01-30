const Input = novi.ui.input;
const Icons = novi.ui.icons;
const RadioGroup = novi.ui.radioGroup;
const Select = novi.ui.select;
const React = novi.react.React;
const Component = novi.react.Component;
const Language = novi.language;

export default class Header extends Component {
    constructor(props) {
        super();

        let href = novi.element.getAttribute(props.element, 'href');
        this.pages = this._getPages(novi.utils.getProjectPages());
        this.favoriteLinks = this._getLinks(novi.plugins.settings.get("novi-plugin-link").favoriteLinks);
        let type = this._getLinkTypeFromValue(href);

        this.state = {
            type,
            element: props.element,
            value: href,
            href
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleRadioButtonClick = this._handleRadioButtonClick.bind(this);
        this._renderSettingsData = this._renderSettingsData.bind(this);
        this._handleSelectChange = this._handleSelectChange.bind(this);
        this.messages = Language.getDataByKey("novi-plugin-link");
    }

    render() {
        return (
            <div className="novi-link-plugin-wrap" style={{
                "padding": "0 12px",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "height": "100%",
                "color": "#6E778A"
            }}>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    {this.messages.editor.body.linkType}
                </p>
                <RadioGroup options={["Pages", "Favorites", "Custom"]} value={this.state.type}
                            onChange={this._handleRadioButtonClick}/>
                {this._renderSettingsData()}
            </div>
        )
    }

    _getPages(projectPages) {
        return projectPages.filter((item)=>{
            return item.path && item.title
        }).map((item) => {
            return {
                label: item.title,
                value: item.path
            }
        })
    }

    _getLinks(links) {
        return links.filter((item)=>{
            return item.title && item.value && item.value !== "index.html"
        }).map((item) => {
            return {
                label: item.title,
                value: item.value
            }
        })
    }

    _handleRadioButtonClick(value) {
        this.setState({type: value})
    }

    _renderSettingsData() {
        switch (this.state.type) {
            case "Custom":
                return this._renderCustomInput();
            case "Favorites":
                return this._renderFavoriteLinks();
            default:
                return this._renderPagesSelect();
        }
    }

    _renderPagesSelect() {
        return (
            <div className="novi-link-plugin-body" style={{"marginTop": "20px"}}>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    {this.messages.editor.body.pagesLabel}
                </p>
                <Select
                    searchable={true}
                    clearable={false}
                    options={this.pages} onChange={this._handleSelectChange}
                    value={this.state.value}
                />
            </div>
        )
    }

    _renderFavoriteLinks() {
        return (
            <div className="novi-link-plugin-body" style={{"marginTop": "20px"}}>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    {this.messages.editor.body.linksLabel}
                </p>
                <Select
                    searchable={true}
                    clearable={false}
                    options={this.favoriteLinks} onChange={this._handleSelectChange}
                    value={this.state.value}
                />
            </div>
        )
    }


    _renderCustomInput() {
        return (
            <div>
                <p className="novi-label" style={{marginTop: 20}}>
                    {this.messages.editor.body.inputLabel}
                </p>
                <Input onChange={this._handleChange} value={this.state.value}/>
            </div>
        )
    }

    _handleSelectChange(item) {
        this.setState({value: item.value})
    }

    _handleChange(e){
        let value = e.target.value;
        this.setState({value})
    }

    _getLinkTypeFromValue(value){
        let i;
        for (i=0; i < this.pages.length; i++){
            if (this.pages[i].value === value) return "Pages";
        }
        for (i=0; i < this.favoriteLinks.length; i++){
            if (this.favoriteLinks[i].value === value) return "Favorites";
        }
        return "Custom"
    }
}